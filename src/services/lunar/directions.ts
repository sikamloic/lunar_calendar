import type { CardinalDirection } from './types';

/**
 * Les directions cardinales selon le cycle lunaire traditionnel Fezan
 * Basé sur le calendrier de référence manuscrit (Décembre 2025 - Janvier 2026)
 * 
 * Le cycle complet est de 30 jours (un mois lunaire)
 * Le jour 7 n'a pas de direction (jour de transition/repos)
 */
const DIRECTIONS_30_DAYS: readonly (CardinalDirection | null)[] = [
  'Sud',        // Jour 1
  'Nord-Ouest', // Jour 2
  'Est',        // Jour 3
  'Nord',       // Jour 4
  'Nord-Est',   // Jour 5
  'Est',        // Jour 6
  null,         // Jour 7 (pas de direction - jour de repos)
  'Ouest',      // Jour 8
  'Sud',        // Jour 9
  'Nord-Ouest', // Jour 10
  'Ouest',      // Jour 11
  'Nord',       // Jour 12
  'Nord',       // Jour 13
  'Sud-Est',    // Jour 14
  'Nord-Est',   // Jour 15
  'Sud',        // Jour 16
  'Nord-Ouest', // Jour 17
  'Sud-Ouest',  // Jour 18
  'Ouest',      // Jour 19
  'Nord',       // Jour 20
  'Est',        // Jour 21
  'Sud-Est',    // Jour 22
  'Nord-Est',   // Jour 23
  'Sud',        // Jour 24
  'Ouest',      // Jour 25
  'Sud-Ouest',  // Jour 26
  'Nord-Ouest', // Jour 27
  'Est',        // Jour 28
  'Sud-Est',    // Jour 29
  'Nord-Est',   // Jour 30
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
