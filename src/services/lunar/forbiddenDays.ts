/**
 * Jours interdits de l'année
 * Ces jours sont considérés comme néfastes, même si le Fezan est favorable
 * 
 * Note: Cette liste est basée sur les traditions et peut varier selon les sources.
 * Elle peut être étendue ou modifiée selon les besoins.
 */

interface ForbiddenDayRule {
  month: number; // 1-12
  day: number;
  reason?: string;
}

/**
 * Liste des jours interdits fixes de l'année
 * Ces dates sont considérées comme défavorables pour entreprendre des actions importantes
 */
const FORBIDDEN_DAYS: readonly ForbiddenDayRule[] = [
  // Ces jours sont des exemples basés sur les traditions
  // La liste exacte peut varier selon les sources et les régions
  { month: 1, day: 1, reason: 'Premier jour de l\'année' },
  { month: 1, day: 13, reason: 'Jour de malchance traditionnelle' },
  { month: 2, day: 29, reason: 'Jour bissextile' },
  { month: 3, day: 13, reason: 'Jour de malchance traditionnelle' },
  { month: 4, day: 13, reason: 'Jour de malchance traditionnelle' },
  { month: 5, day: 13, reason: 'Jour de malchance traditionnelle' },
  { month: 6, day: 13, reason: 'Jour de malchance traditionnelle' },
  { month: 7, day: 13, reason: 'Jour de malchance traditionnelle' },
  { month: 8, day: 13, reason: 'Jour de malchance traditionnelle' },
  { month: 9, day: 13, reason: 'Jour de malchance traditionnelle' },
  { month: 10, day: 13, reason: 'Jour de malchance traditionnelle' },
  { month: 11, day: 13, reason: 'Jour de malchance traditionnelle' },
  { month: 12, day: 13, reason: 'Jour de malchance traditionnelle' },
  { month: 12, day: 31, reason: 'Dernier jour de l\'année' },
] as const;

/**
 * Vérifie si une date est un jour interdit
 * @param date - La date à vérifier
 * @returns true si c'est un jour interdit
 */
export function isForbiddenDay(date: Date): boolean {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return FORBIDDEN_DAYS.some(
    (rule) => rule.month === month && rule.day === day
  );
}

/**
 * Retourne la raison pour laquelle un jour est interdit
 * @param date - La date à vérifier
 * @returns La raison ou undefined si ce n'est pas un jour interdit
 */
export function getForbiddenDayReason(date: Date): string | undefined {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const rule = FORBIDDEN_DAYS.find(
    (r) => r.month === month && r.day === day
  );
  
  return rule?.reason;
}

/**
 * Retourne tous les jours interdits
 */
export function getAllForbiddenDays(): readonly ForbiddenDayRule[] {
  return FORBIDDEN_DAYS;
}

/**
 * Ajoute des jours interdits personnalisés (pour extension future)
 * Note: Cette fonction retourne une nouvelle liste, elle ne modifie pas l'originale
 */
export function addCustomForbiddenDays(
  customDays: ForbiddenDayRule[]
): ForbiddenDayRule[] {
  return [...FORBIDDEN_DAYS, ...customDays];
}
