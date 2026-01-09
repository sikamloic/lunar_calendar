import SunCalc from 'suncalc';
import type { MoonPhase, LunarDayInfo } from './types';
import { getFezanDay } from './fezan';
import { getDirection } from './directions';
import { isForbiddenDay } from './forbiddenDays';

/**
 * Jours de la semaine en français
 */
const DAYS_OF_WEEK = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
] as const;

/**
 * Trouve la nouvelle lune la plus proche avant ou égale à une date donnée
 */
export function findPreviousNewMoon(date: Date): Date {
  let searchDate = new Date(date);
  
  // Reculer jusqu'à 35 jours pour trouver la nouvelle lune précédente
  for (let i = 0; i < 35; i++) {
    const illumination = SunCalc.getMoonIllumination(searchDate);
    
    // Nouvelle lune quand phase ≈ 0 (ou très proche de 1, car c'est cyclique)
    if (illumination.phase < 0.02 || illumination.phase > 0.98) {
      // Affiner la recherche pour trouver le moment exact
      return refineNewMoonTime(searchDate);
    }
    
    searchDate.setDate(searchDate.getDate() - 1);
  }
  
  // Fallback: retourner la date de recherche
  return searchDate;
}

/**
 * Affine le moment exact de la nouvelle lune
 */
function refineNewMoonTime(approximateDate: Date): Date {
  let bestDate = new Date(approximateDate);
  let minPhase = 1;
  
  // Chercher heure par heure sur 48h autour de la date approximative
  const startTime = approximateDate.getTime() - 24 * 60 * 60 * 1000;
  
  for (let h = 0; h < 48; h++) {
    const checkDate = new Date(startTime + h * 60 * 60 * 1000);
    const illumination = SunCalc.getMoonIllumination(checkDate);
    
    // La phase est entre 0 et 1, nouvelle lune à 0
    const phaseDistance = Math.min(illumination.phase, 1 - illumination.phase);
    
    if (phaseDistance < minPhase) {
      minPhase = phaseDistance;
      bestDate = checkDate;
    }
  }
  
  return bestDate;
}

/**
 * Calcule le jour du mois lunaire (1-30) pour une date donnée
 * 
 * Selon le calendrier Fezan traditionnel :
 * - Le jour de la nouvelle lune astronomique = jour lunaire 30 (fin du cycle)
 * - Le lendemain de la nouvelle lune = jour lunaire 1 (début du nouveau cycle)
 */
export function getLunarDayOfMonth(date: Date): number {
  const newMoon = findPreviousNewMoon(date);
  
  // Normaliser les dates à minuit pour comparer les jours
  const dateNormalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const newMoonNormalized = new Date(newMoon.getFullYear(), newMoon.getMonth(), newMoon.getDate());
  
  const diffTime = dateNormalized.getTime() - newMoonNormalized.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  // Si on est le jour de la nouvelle lune, c'est le jour 30 (fin du cycle précédent)
  if (diffDays === 0) {
    return 30;
  }
  
  // Le lendemain de la nouvelle lune = jour 1
  // diffDays jours après la nouvelle lune = jour diffDays
  return diffDays;
}

/**
 * Détermine la phase lunaire à partir de l'illumination
 */
export function getMoonPhase(date: Date): MoonPhase {
  const illumination = SunCalc.getMoonIllumination(date);
  const phase = illumination.phase;
  
  // Phase va de 0 à 1:
  // 0 = nouvelle lune
  // 0.25 = premier quartier
  // 0.5 = pleine lune
  // 0.75 = dernier quartier
  
  if (phase < 0.025 || phase >= 0.975) return 'new';
  if (phase < 0.225) return 'waxing-crescent';
  if (phase < 0.275) return 'first-quarter';
  if (phase < 0.475) return 'waxing-gibbous';
  if (phase < 0.525) return 'full';
  if (phase < 0.725) return 'waning-gibbous';
  if (phase < 0.775) return 'last-quarter';
  return 'waning-crescent';
}

/**
 * Vérifie si c'est une nouvelle lune
 */
export function isNewMoon(date: Date): boolean {
  const illumination = SunCalc.getMoonIllumination(date);
  return illumination.phase < 0.02 || illumination.phase > 0.98;
}

/**
 * Vérifie si c'est une pleine lune
 */
export function isFullMoon(date: Date): boolean {
  const illumination = SunCalc.getMoonIllumination(date);
  return illumination.phase > 0.48 && illumination.phase < 0.52;
}

/**
 * Formate l'heure d'une date
 */
function formatTime(date: Date): string {
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Calcule toutes les informations lunaires pour une date donnée
 */
export function getLunarDayInfo(date: Date): LunarDayInfo {
  const lunarDay = getLunarDayOfMonth(date);
  const fezan = getFezanDay(lunarDay);
  const direction = getDirection(lunarDay);
  const moonPhase = getMoonPhase(date);
  const newMoonCheck = isNewMoon(date);
  const fullMoonCheck = isFullMoon(date);
  
  let newMoonTime: string | undefined;
  if (newMoonCheck) {
    const exactNewMoon = findPreviousNewMoon(date);
    newMoonTime = formatTime(exactNewMoon);
  }
  
  return {
    date: new Date(date),
    gregorianDay: date.getDate(),
    gregorianMonth: date.getMonth() + 1,
    gregorianYear: date.getFullYear(),
    dayOfWeek: DAYS_OF_WEEK[date.getDay()],
    lunarDay,
    fezan,
    direction,
    moonPhase,
    isNewMoon: newMoonCheck,
    isFullMoon: fullMoonCheck,
    isForbiddenDay: isForbiddenDay(date),
    newMoonTime,
  };
}

/**
 * Génère les informations lunaires pour un mois entier
 */
export function getMonthLunarInfo(year: number, month: number): LunarDayInfo[] {
  const result: LunarDayInfo[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day, 12, 0, 0);
    result.push(getLunarDayInfo(date));
  }
  
  return result;
}

/**
 * Génère les informations lunaires pour une année entière
 */
export function getYearLunarInfo(year: number): LunarDayInfo[][] {
  const result: LunarDayInfo[][] = [];
  
  for (let month = 1; month <= 12; month++) {
    result.push(getMonthLunarInfo(year, month));
  }
  
  return result;
}
