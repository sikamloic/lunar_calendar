import { Check, X, AlertTriangle } from 'lucide-react';
import type { LunarDayInfo } from '../../services/lunar';
import { getDirectionCssKey } from '../../services/lunar';
import { MoonPhaseIcon } from '../icons';
import { DirectionIcon } from '../icons';

interface DayCellProps {
  dayInfo: LunarDayInfo;
  isToday?: boolean;
  onSelect?: (dayInfo: LunarDayInfo) => void;
}

export function DayCell({ dayInfo, isToday = false, onSelect }: DayCellProps) {
  const directionKey = getDirectionCssKey(dayInfo.direction);
  const isFavorable = dayInfo.fezan.status === 'favorable';
  
  return (
    <button
      onClick={() => onSelect?.(dayInfo)}
      className={`
        relative w-full p-2 sm:p-3 rounded-xl transition-all duration-200
        bg-[var(--color-surface)] 
        hover:bg-[var(--color-surface-elevated)] hover:scale-[1.02]
        active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]/50
        ${isToday ? 'ring-2 ring-[var(--color-accent-primary)] shadow-lg' : ''}
        ${dayInfo.isNewMoon ? 'moon-new' : ''}
        ${dayInfo.isForbiddenDay ? 'opacity-75' : ''}
      `}
      aria-label={`${dayInfo.gregorianDay} ${dayInfo.dayOfWeek}, Jour lunaire ${dayInfo.lunarDay}, ${dayInfo.fezan.name}`}
    >
      {/* Barre de statut latérale */}
      <div 
        className={`absolute left-0 top-2 bottom-2 w-1 rounded-full ${
          isFavorable ? 'bg-[var(--color-favorable)]' : 'bg-[var(--color-unfavorable)]'
        }`}
      />

      {/* Contenu principal */}
      <div className="pl-2">
        {/* Ligne 1: Jour grégorien + indicateur */}
        <div className="flex items-center justify-between mb-1">
          <span className={`
            text-lg sm:text-xl font-bold
            ${isToday ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-primary)]'}
          `}>
            {dayInfo.gregorianDay}
          </span>
          
          <div className="flex items-center gap-1">
            {dayInfo.isForbiddenDay && (
              <AlertTriangle size={12} className="text-[var(--color-unfavorable)]" />
            )}
            {isFavorable ? (
              <Check size={14} className="text-[var(--color-favorable)]" />
            ) : (
              <X size={14} className="text-[var(--color-unfavorable)]" />
            )}
          </div>
        </div>

        {/* Ligne 2: Jour lunaire + Phase */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <span 
            className="text-sm sm:text-base font-mono font-bold"
            style={{ color: `var(--color-dir-${directionKey})` }}
          >
            {dayInfo.lunarDay}
          </span>
          <MoonPhaseIcon phase={dayInfo.moonPhase} size={16} />
        </div>

        {/* Ligne 3: Fezan (visible sur mobile, plus grand sur desktop) */}
        <div className="text-[10px] sm:text-xs font-semibold text-[var(--color-text-secondary)] truncate">
          {dayInfo.fezan.name}
        </div>

        {/* Ligne 4: Direction avec icône */}
        <div className="flex items-center gap-1 mt-1">
          <DirectionIcon direction={dayInfo.direction} size={12} />
          <span 
            className="text-[10px] sm:text-xs font-medium hidden sm:inline"
            style={{ color: `var(--color-dir-${directionKey})` }}
          >
            {dayInfo.direction}
          </span>
        </div>
      </div>

      {/* Badge nouvelle lune / pleine lune */}
      {(dayInfo.isNewMoon || dayInfo.isFullMoon) && (
        <div className="absolute -top-1 -right-1 sm:top-1 sm:right-1">
          <span className={`
            text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full
            ${dayInfo.isNewMoon 
              ? 'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] border border-[var(--color-text-secondary)]' 
              : 'bg-[var(--color-accent-primary)] text-[var(--color-background)]'
            }
          `}>
            {dayInfo.isNewMoon ? 'NL' : 'PL'}
          </span>
        </div>
      )}
    </button>
  );
}
