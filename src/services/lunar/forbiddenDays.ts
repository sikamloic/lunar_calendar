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
 * Liste des 45 jours interdits fixes de l'année (tradition Fezan)
 * Ces dates sont considérées comme défavorables pour entreprendre des actions importantes,
 * même si le jour Fezan correspondant est favorable.
 * 
 * Source: Tradition Fezan du Bénin
 */
const FORBIDDEN_DAYS: readonly ForbiddenDayRule[] = [
  // Janvier (6 jours)
  { month: 1, day: 1, reason: 'Mauvais jour de janvier' },
  { month: 1, day: 2, reason: 'Mauvais jour de janvier' },
  { month: 1, day: 6, reason: 'Mauvais jour de janvier' },
  { month: 1, day: 11, reason: 'Mauvais jour de janvier' },
  { month: 1, day: 17, reason: 'Mauvais jour de janvier' },
  { month: 1, day: 18, reason: 'Mauvais jour de janvier' },
  // Février (3 jours)
  { month: 2, day: 8, reason: 'Mauvais jour de février' },
  { month: 2, day: 16, reason: 'Mauvais jour de février' },
  { month: 2, day: 17, reason: 'Mauvais jour de février' },
  // Mars (4 jours)
  { month: 3, day: 2, reason: 'Mauvais jour de mars' },
  { month: 3, day: 12, reason: 'Mauvais jour de mars' },
  { month: 3, day: 13, reason: 'Mauvais jour de mars' },
  { month: 3, day: 15, reason: 'Mauvais jour de mars' },
  // Avril (5 jours)
  { month: 4, day: 1, reason: 'Mauvais jour d\'avril' },
  { month: 4, day: 3, reason: 'Mauvais jour d\'avril' },
  { month: 4, day: 15, reason: 'Mauvais jour d\'avril' },
  { month: 4, day: 17, reason: 'Mauvais jour d\'avril' },
  { month: 4, day: 18, reason: 'Mauvais jour d\'avril' },
  // Mai (4 jours)
  { month: 5, day: 8, reason: 'Mauvais jour de mai' },
  { month: 5, day: 10, reason: 'Mauvais jour de mai' },
  { month: 5, day: 17, reason: 'Mauvais jour de mai' },
  { month: 5, day: 30, reason: 'Mauvais jour de mai' },
  // Juin (3 jours)
  { month: 6, day: 1, reason: 'Mauvais jour de juin' },
  { month: 6, day: 7, reason: 'Mauvais jour de juin' },
  { month: 6, day: 10, reason: 'Mauvais jour de juin' },
  // Juillet (3 jours)
  { month: 7, day: 1, reason: 'Mauvais jour de juillet' },
  { month: 7, day: 5, reason: 'Mauvais jour de juillet' },
  { month: 7, day: 6, reason: 'Mauvais jour de juillet' },
  // Août (4 jours)
  { month: 8, day: 1, reason: 'Mauvais jour d\'août' },
  { month: 8, day: 3, reason: 'Mauvais jour d\'août' },
  { month: 8, day: 18, reason: 'Mauvais jour d\'août' },
  { month: 8, day: 30, reason: 'Mauvais jour d\'août' },
  // Septembre (5 jours)
  { month: 9, day: 1, reason: 'Mauvais jour de septembre' },
  { month: 9, day: 2, reason: 'Mauvais jour de septembre' },
  { month: 9, day: 15, reason: 'Mauvais jour de septembre' },
  { month: 9, day: 18, reason: 'Mauvais jour de septembre' },
  { month: 9, day: 30, reason: 'Mauvais jour de septembre' },
  // Octobre (2 jours)
  { month: 10, day: 15, reason: 'Mauvais jour d\'octobre' },
  { month: 10, day: 17, reason: 'Mauvais jour d\'octobre' },
  // Novembre (3 jours)
  { month: 11, day: 1, reason: 'Mauvais jour de novembre' },
  { month: 11, day: 7, reason: 'Mauvais jour de novembre' },
  { month: 11, day: 11, reason: 'Mauvais jour de novembre' },
  // Décembre (3 jours)
  { month: 12, day: 1, reason: 'Mauvais jour de décembre' },
  { month: 12, day: 7, reason: 'Mauvais jour de décembre' },
  { month: 12, day: 11, reason: 'Mauvais jour de décembre' },
] as const;

/**
 * Optimized Set for O(1) lookup of forbidden days
 */
const FORBIDDEN_DAYS_SET = new Set<string>(
  FORBIDDEN_DAYS.map(rule => `${rule.month}-${rule.day}`)
);

/**
 * Vérifie si une date est un jour interdit
 * @param date - La date à vérifier
 * @returns true si c'est un jour interdit
 */
export function isForbiddenDay(date: Date): boolean {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const key = `${month}-${day}`;
  
  return FORBIDDEN_DAYS_SET.has(key);
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
