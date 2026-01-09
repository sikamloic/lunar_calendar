import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export function CalendarHeader({
  year,
  month,
  onPreviousMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) {
  const monthName = MONTH_NAMES[month - 1];

  return (
    <div className="flex items-center justify-between gap-2 mb-3 py-2">
      {/* Navigation gauche */}
      <button
        onClick={onPreviousMonth}
        className="p-2 rounded-full hover:bg-[var(--color-surface)] transition-colors"
        aria-label="Mois précédent"
      >
        <ChevronLeft size={20} className="text-[var(--color-text-secondary)]" />
      </button>

      {/* Titre du mois */}
      <h2 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)]">
        {monthName} {year}
      </h2>

      {/* Navigation droite + Aujourd'hui */}
      <div className="flex items-center gap-1">
        <button
          onClick={onToday}
          className="p-2 rounded-full hover:bg-[var(--color-surface)] transition-colors"
          aria-label="Aujourd'hui"
        >
          <CalendarDays size={18} className="text-[var(--color-accent-primary)]" />
        </button>
        <button
          onClick={onNextMonth}
          className="p-2 rounded-full hover:bg-[var(--color-surface)] transition-colors"
          aria-label="Mois suivant"
        >
          <ChevronRight size={20} className="text-[var(--color-text-secondary)]" />
        </button>
      </div>
    </div>
  );
}
