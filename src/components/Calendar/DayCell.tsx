import { AlertTriangle } from 'lucide-react';
import type { LunarDayInfo } from '../../services/lunar';
import { getDirectionCssKey, getDirectionAbbreviation } from '../../services/lunar';

interface DayCellProps {
  dayInfo: LunarDayInfo;
  isToday?: boolean;
  onSelect?: (dayInfo: LunarDayInfo) => void;
}

export function DayCell({ dayInfo, isToday = false, onSelect }: DayCellProps) {
  const directionKey = getDirectionCssKey(dayInfo.direction);
  const isFavorable = dayInfo.fezan.status === 'favorable';
  const directionAbbr = getDirectionAbbreviation(dayInfo.direction);
  
  return (
    <button
      onClick={() => onSelect?.(dayInfo)}
      className={`
        relative w-full aspect-square p-1.5 sm:p-2 rounded-lg sm:rounded-xl 
        transition-all duration-150 ease-out
        bg-[var(--color-surface)] 
        hover:bg-[var(--color-surface-elevated)] hover:shadow-md
        active:scale-[0.97]
        focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]/50
        ${isToday ? 'ring-2 ring-[var(--color-accent-primary)]' : ''}
        ${dayInfo.isForbiddenDay ? 'opacity-60' : ''}
      `}
      aria-label={`${dayInfo.gregorianDay} ${dayInfo.dayOfWeek}, Jour lunaire ${dayInfo.lunarDay}, ${dayInfo.fezan.name}`}
    >
      {/* Indicateur favorable/défavorable - coin supérieur droit */}
      <div className={`
        absolute top-1 right-1 w-2 h-2 rounded-full
        ${isFavorable ? 'bg-[var(--color-favorable)]' : 'bg-[var(--color-unfavorable)]'}
      `} />

      {/* Jour grégorien - grand et centré */}
      <div className={`
        text-xl sm:text-2xl font-bold leading-none
        ${isToday ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-primary)]'}
      `}>
        {dayInfo.gregorianDay}
      </div>

      {/* Jour lunaire - petit, coloré selon direction */}
      <div 
        className="text-xs sm:text-sm font-mono font-bold mt-0.5"
        style={{ color: `var(--color-dir-${directionKey})` }}
      >
        {dayInfo.lunarDay}
      </div>

      {/* Nom Fezan - très petit */}
      <div className="text-[8px] sm:text-[10px] text-[var(--color-text-secondary)] truncate mt-0.5">
        {dayInfo.fezan.name}
      </div>

      {/* Direction abrégée */}
      <div 
        className="text-[8px] sm:text-[10px] font-medium"
        style={{ color: `var(--color-dir-${directionKey})` }}
      >
        {directionAbbr}
      </div>

      {/* Badges spéciaux */}
      {dayInfo.isForbiddenDay && (
        <div className="absolute bottom-1 right-1">
          <AlertTriangle size={10} className="text-[var(--color-unfavorable)]" />
        </div>
      )}

      {(dayInfo.isNewMoon || dayInfo.isFullMoon) && (
        <div className="absolute top-1 left-1">
          <div className={`
            w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center
            text-[6px] sm:text-[8px] font-bold
            ${dayInfo.isNewMoon 
              ? 'bg-[var(--color-text-secondary)]/20 text-[var(--color-text-secondary)]' 
              : 'bg-[var(--color-accent-primary)] text-[var(--color-background)]'
            }
          `}>
            {dayInfo.isNewMoon ? 'N' : 'P'}
          </div>
        </div>
      )}
    </button>
  );
}
