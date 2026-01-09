import type { FezanDay, FezanDayInfo, FezanStatus } from './types';

/**
 * Définition des 9 jours du cycle Fezan
 * Le cycle recommence à chaque nouvelle lune
 */
const FEZAN_DAYS: readonly FezanDayInfo[] = [
  {
    name: 'Mêdjo',
    dayNumber: 1,
    status: 'favorable',
    description: 'Jour de la naissance, point de départ de la vie',
    recommendation: 'Excellent pour entreprendre quelque chose d\'important, surtout un jeudi',
  },
  {
    name: 'Mêkou',
    dayNumber: 2,
    status: 'unfavorable',
    description: 'Jour de la mort, jour de malheur',
    recommendation: 'Éviter les événements importants. Adapté pour les enterrements ou sacrifices aux défunts',
  },
  {
    name: 'Vodoun',
    dayNumber: 3,
    status: 'favorable',
    description: 'Jour du sacré, jour vaudou',
    recommendation: 'Recommandé pour les cérémonies cultuelles, surtout un dimanche',
  },
  {
    name: 'Azon',
    dayNumber: 4,
    status: 'unfavorable',
    description: 'Jour de la maladie',
    recommendation: 'Mauvais jour, éviter les décisions importantes',
  },
  {
    name: 'Vo',
    dayNumber: 5,
    status: 'favorable',
    description: 'Jour du sacrifice',
    recommendation: 'Favorable pour conjurer le mauvais sort ou rompre un maléfice',
  },
  {
    name: 'Akoue',
    dayNumber: 6,
    status: 'unfavorable',
    description: 'Jour du jugement',
    recommendation: 'Risque de disputes, conflits et menaces. À éviter',
  },
  {
    name: 'Bô',
    dayNumber: 7,
    status: 'favorable',
    description: 'Jour du sort (bon ou mauvais)',
    recommendation: 'Propice pour jeter des sorts ou maléfices, surtout un mardi',
  },
  {
    name: 'Hin',
    dayNumber: 8,
    status: 'unfavorable',
    description: 'Jour de la misère',
    recommendation: 'Déconseillé d\'entreprendre quelque chose d\'important',
  },
  {
    name: 'Fâ',
    dayNumber: 9,
    status: 'favorable',
    description: 'Jour de l\'oracle',
    recommendation: 'Jour parfait pour consulter l\'oracle et comprendre les malheurs',
  },
] as const;

/**
 * Calcule le jour Fezan pour un jour donné du mois lunaire
 * @param lunarDayOfMonth - Jour du mois lunaire (1-30)
 * @returns Informations sur le jour Fezan
 */
export function getFezanDay(lunarDayOfMonth: number): FezanDayInfo {
  // Le cycle Fezan est de 9 jours, on utilise modulo
  // Jour 1 = Mêdjo (index 0), Jour 9 = Fâ (index 8), Jour 10 = Mêdjo (index 0)
  const index = ((lunarDayOfMonth - 1) % 9);
  return { ...FEZAN_DAYS[index] };
}

/**
 * Vérifie si un jour Fezan est favorable
 */
export function isFavorable(fezan: FezanDayInfo): boolean {
  return fezan.status === 'favorable';
}

/**
 * Retourne tous les jours Fezan
 */
export function getAllFezanDays(): readonly FezanDayInfo[] {
  return FEZAN_DAYS;
}

/**
 * Retourne le nom du jour Fezan par son numéro
 */
export function getFezanName(dayNumber: number): FezanDay {
  const index = ((dayNumber - 1) % 9);
  return FEZAN_DAYS[index].name;
}

/**
 * Retourne le statut du jour Fezan par son numéro
 */
export function getFezanStatus(dayNumber: number): FezanStatus {
  const index = ((dayNumber - 1) % 9);
  return FEZAN_DAYS[index].status;
}
