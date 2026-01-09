/**
 * Types pour le calendrier lunaire Fezan
 */

/** Les 9 jours du cycle Fezan */
export type FezanDay =
  | 'Mêdjo'
  | 'Mêkou'
  | 'Vodoun'
  | 'Azon'
  | 'Vo'
  | 'Akoue'
  | 'Bô'
  | 'Hin'
  | 'Fâ';

/** Statut d'un jour Fezan */
export type FezanStatus = 'favorable' | 'unfavorable';

/** Les 8 directions cardinales */
export type CardinalDirection =
  | 'Nord'
  | 'Nord-Est'
  | 'Est'
  | 'Sud-Est'
  | 'Sud'
  | 'Sud-Ouest'
  | 'Ouest'
  | 'Nord-Ouest';

/** Phase lunaire */
export type MoonPhase =
  | 'new'
  | 'waxing-crescent'
  | 'first-quarter'
  | 'waxing-gibbous'
  | 'full'
  | 'waning-gibbous'
  | 'last-quarter'
  | 'waning-crescent';

/** Informations complètes d'un jour Fezan */
export interface FezanDayInfo {
  name: FezanDay;
  dayNumber: number; // 1-9
  status: FezanStatus;
  description: string;
  recommendation: string;
}

/** Informations complètes d'un jour lunaire */
export interface LunarDayInfo {
  date: Date;
  gregorianDay: number;
  gregorianMonth: number;
  gregorianYear: number;
  dayOfWeek: string;
  lunarDay: number; // 1-30 (jour dans le mois lunaire)
  fezan: FezanDayInfo;
  direction: CardinalDirection | null; // null pour les jours sans direction
  moonPhase: MoonPhase;
  isNewMoon: boolean;
  isFullMoon: boolean;
  isForbiddenDay: boolean;
  newMoonTime?: string; // Heure de la nouvelle lune si applicable
}

/** Configuration du calendrier */
export interface CalendarConfig {
  locale: string;
  timezone: string;
}
