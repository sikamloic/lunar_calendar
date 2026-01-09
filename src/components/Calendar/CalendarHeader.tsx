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
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      {/* Navigation */}
      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start">
        <button
          onClick={onPreviousMonth}
          className="p-3 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-surface-elevated)] 
                     active:scale-95 transition-all touch-manipulation"
          aria-label="Mois précédent"
        >
          <ChevronLeft size={20} className="text-[var(--color-text-primary)]" />
        </button>
        
        <h2 className="text-lg sm:text-2xl font-bold text-[var(--color-text-primary)] min-w-[180px] sm:min-w-[220px] text-center">
          {MONTH_NAMES[month - 1]} {year}
        </h2>
        
        <button
          onClick={onNextMonth}
          className="p-3 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-surface-elevated)] 
                     active:scale-95 transition-all touch-manipulation"
          aria-label="Mois suivant"
        >
          <ChevronRight size={20} className="text-[var(--color-text-primary)]" />
        </button>
      </div>

      {/* Bouton Aujourd'hui */}
      <button
        onClick={onToday}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl 
                   bg-[var(--color-accent-primary)] text-[var(--color-background)] 
                   font-medium hover:opacity-90 active:scale-95 
                   transition-all touch-manipulation w-full sm:w-auto justify-center"
      >
        <CalendarDays size={18} />
        <span>Aujourd'hui</span>
      </button>
    </div>
  );
}
