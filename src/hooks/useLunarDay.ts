import { useMemo } from 'react';
import { getLunarDayInfo, getMonthLunarInfo, type LunarDayInfo } from '../services/lunar';

/**
 * Hook pour obtenir les informations lunaires d'une date spécifique
 */
export function useLunarDay(date: Date): LunarDayInfo {
  return useMemo(() => getLunarDayInfo(date), [date.getTime()]);
}

/**
 * Hook pour obtenir les informations lunaires du jour actuel
 */
export function useTodayLunarDay(): LunarDayInfo {
  return useMemo(() => getLunarDayInfo(new Date()), []);
}

/**
 * Hook pour obtenir les informations lunaires d'un mois entier
 */
export function useMonthLunarInfo(year: number, month: number): LunarDayInfo[] {
  return useMemo(
    () => getMonthLunarInfo(year, month),
    [year, month]
  );
}

/**
 * Hook pour la navigation entre les mois
 */
export function useCalendarNavigation(initialYear?: number, initialMonth?: number) {
  const now = new Date();
  const defaultYear = initialYear ?? now.getFullYear();
  const defaultMonth = initialMonth ?? (now.getMonth() + 1);

  return {
    defaultYear,
    defaultMonth,
    getNextMonth: (year: number, month: number) => {
      if (month === 12) {
        return { year: year + 1, month: 1 };
      }
      return { year, month: month + 1 };
    },
    getPreviousMonth: (year: number, month: number) => {
      if (month === 1) {
        return { year: year - 1, month: 12 };
      }
      return { year, month: month - 1 };
    },
  };
}
