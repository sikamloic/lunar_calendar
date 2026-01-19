import type { CardinalDirection } from './types';

/**
 * Les directions cardinales selon le cycle lunaire traditionnel Fezan
 * Basé sur le calendrier de référence manuscrit (Décembre 2024 - Janvier 2025)
 * 
 * Le cycle complet est de 30 jours (un mois lunaire)
 * Le jour 7 n'a pas de direction (jour de transition/repos)
 * 
 * Référence: Document manuscrit Fezan traditionnel du Bénin
 */
const DIRECTIONS_30_DAYS: readonly (CardinalDirection | null)[] = [
  'Sud',        // Jour 1  - Référence: 20 déc = Sud
  'Nord-Ouest', // Jour 2  - Référence: 21 déc = Nord-ouest
  'Est',        // Jour 3  - Référence: 22 déc = Est
  'Nord',       // Jour 4  - Référence: 23 déc = Nord
  'Nord-Est',   // Jour 5  - Référence: 24 déc = Nord-est
  'Est',        // Jour 6  - Référence: 25 déc = Est
  null,         // Jour 7  - Référence: 26 déc = (rien) - jour de repos
  'Ouest',      // Jour 8  - Référence: 27 déc = Ouest
  'Sud',        // Jour 9  - Référence: 28 déc = Sud
  'Nord-Ouest', // Jour 10 - Référence: 29 déc = Nord-ouest
  'Ouest',      // Jour 11 - Référence: 30 déc = Ouest
  'Nord',       // Jour 12 - Référence: 31 déc = Nord
  'Nord',       // Jour 13 - Référence: 1 jan = Nord
  'Sud-Est',    // Jour 14 - Référence: 2 jan = Sud-est
  'Nord-Est',   // Jour 15 - Référence: 3 jan = Nord-est
  'Sud',        // Jour 16 - Référence: 4 jan = Sud
  'Nord-Ouest', // Jour 17 - Référence: 5 jan = Nord-ouest
  'Sud-Ouest',  // Jour 18 - Référence: 6 jan = Sud-ouest
  'Ouest',      // Jour 19 - Référence: 7 jan = Ouest
  'Nord',       // Jour 20 - Référence: 8 jan = Nord
  'Est',        // Jour 21 - Référence: 9 jan = Est
  'Sud-Est',    // Jour 22 - Référence: 10 jan = Sud-est
  'Nord-Est',   // Jour 23 - Référence: 11 jan = Nord-est
  'Sud',        // Jour 24 - Référence: 12 jan = Sud
  'Ouest',      // Jour 25 - Référence: 13 jan = Ouest
  'Sud-Ouest',  // Jour 26 - Référence: 14 jan = Sud-ouest
  'Nord-Ouest', // Jour 27 - Référence: 15 jan = Nord-ouest
  'Est',        // Jour 28 - Référence: 16 jan = Est
  'Sud-Est',    // Jour 29 - Référence: 17 jan = Sud-est
  'Nord-Est',   // Jour 30 - Référence: 18 jan = Nord-est (nouvelle lune 19h43)
] as const;

/**
 * Mapping des directions vers leurs clés CSS
 */
export const DIRECTION_CSS_KEYS: Record<CardinalDirection, string> = {
  'Nord': 'north',
  'Nord-Est': 'north-east',
  'Est': 'east',
  'Sud-Est': 'south-east',
  'Sud': 'south',
  'Sud-Ouest': 'south-west',
  'Ouest': 'west',
  'Nord-Ouest': 'north-west',
};

/**
 * Abréviations des directions
 */
export const DIRECTION_ABBREVIATIONS: Record<CardinalDirection, string> = {
  'Nord': 'N',
  'Nord-Est': 'NE',
  'Est': 'E',
  'Sud-Est': 'SE',
  'Sud': 'S',
  'Sud-Ouest': 'SO',
  'Ouest': 'O',
  'Nord-Ouest': 'NO',
};

/**
 * Calcule la direction pour un jour donné du mois lunaire
 * @param lunarDayOfMonth - Jour du mois lunaire (1-30)
 * @returns La direction cardinale du jour, ou null si pas de direction ce jour
 */
export function getDirection(lunarDayOfMonth: number): CardinalDirection | null {
  // Utiliser le cycle de 30 jours
  const index = ((lunarDayOfMonth - 1) % 30);
  return DIRECTIONS_30_DAYS[index];
}

/**
 * Retourne la clé CSS pour une direction
 */
export function getDirectionCssKey(direction: CardinalDirection | null): string {
  if (!direction) return 'neutral';
  return DIRECTION_CSS_KEYS[direction];
}

/**
 * Retourne l'abréviation d'une direction
 */
export function getDirectionAbbreviation(direction: CardinalDirection | null): string {
  if (!direction) return '-';
  return DIRECTION_ABBREVIATIONS[direction];
}

/**
 * Retourne toutes les directions uniques
 */
export function getAllDirections(): readonly CardinalDirection[] {
  return [
    'Nord',
    'Nord-Est',
    'Est',
    'Sud-Est',
    'Sud',
    'Sud-Ouest',
    'Ouest',
    'Nord-Ouest',
  ];
}
