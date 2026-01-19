/**
 * Jours "Ne rien" (Ne rien entreprendre) du calendrier Fezan
 * 
 * Ces jours sont des jours lunaires fixes (1-30) où il est déconseillé
 * d'entreprendre des actions importantes, même si le jour Fezan est favorable.
 * 
 * Source: Document manuscrit Fezan traditionnel du Bénin (Déc 2025 - Jan 2026)
 * Confirmé sur 2 cycles lunaires consécutifs.
 */

/**
 * Liste des jours lunaires (1-30) où il ne faut "rien entreprendre"
 * Ces jours se répètent à chaque cycle lunaire de 30 jours.
 */
const NO_ACTION_LUNAR_DAYS: ReadonlySet<number> = new Set([
  3,   // Vodoun - jour du sacré
  5,   // Vo - jour du sacrifice
  6,   // Akoue - jour du jugement
  13,  // 
  21,  // 
  24,  // 
  25,  // 
]);

/**
 * Vérifie si un jour lunaire est un jour "Ne rien" (ne rien entreprendre)
 * @param lunarDay - Le jour lunaire (1-30)
 * @returns true si c'est un jour où il ne faut rien entreprendre
 */
export function isNoActionDay(lunarDay: number): boolean {
  return NO_ACTION_LUNAR_DAYS.has(lunarDay);
}

/**
 * Retourne la liste des jours lunaires "Ne rien"
 */
export function getNoActionLunarDays(): readonly number[] {
  return Array.from(NO_ACTION_LUNAR_DAYS).sort((a, b) => a - b);
}

/**
 * Retourne le nombre total de jours "Ne rien" par cycle lunaire
 */
export function getNoActionDaysCount(): number {
  return NO_ACTION_LUNAR_DAYS.size;
}
