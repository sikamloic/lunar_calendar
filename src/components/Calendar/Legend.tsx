import { useState } from 'react';
import { Check, X, AlertTriangle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { getAllFezanDays, getAllDirections, getDirectionCssKey } from '../../services/lunar';
import type { MoonPhase } from '../../services/lunar';
import { MoonPhaseIcon, getMoonPhaseName } from '../icons';
import { DirectionIcon } from '../icons';

const MOON_PHASES: MoonPhase[] = [
  'new', 'waxing-crescent', 'first-quarter', 'waxing-gibbous',
  'full', 'waning-gibbous', 'last-quarter', 'waning-crescent'
];

export function Legend() {
  const [isExpanded, setIsExpanded] = useState(false);
  const fezanDays = getAllFezanDays();
  const directions = getAllDirections();

  return (
    <div className="bg-[var(--color-surface)] rounded-2xl mt-6 overflow-hidden">
      {/* Header cliquable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 sm:p-6 
                   hover:bg-[var(--color-surface-elevated)] transition-colors touch-manipulation"
      >
        <div className="flex items-center gap-3">
          <Info size={20} className="text-[var(--color-accent-primary)]" />
          <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
            Guide & Légende
          </h3>
        </div>
        {isExpanded ? (
          <ChevronUp size={20} className="text-[var(--color-text-secondary)]" />
        ) : (
          <ChevronDown size={20} className="text-[var(--color-text-secondary)]" />
        )}
      </button>

      {/* Contenu expansible */}
      <div className={`
        transition-all duration-300 ease-in-out overflow-hidden
        ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-6">
          
          {/* Jours Fezan */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-3 flex items-center gap-2">
              Cycle Fezan
              <span className="text-xs font-normal">(9 jours)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {fezanDays.map((day) => (
                <div
                  key={day.name}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl text-sm
                    ${day.status === 'favorable'
                      ? 'bg-[var(--color-favorable)]/10'
                      : 'bg-[var(--color-unfavorable)]/10'
                    }
                  `}
                >
                  <span className={`
                    w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs
                    ${day.status === 'favorable'
                      ? 'bg-[var(--color-favorable)] text-white'
                      : 'bg-[var(--color-unfavorable)] text-white'
                    }
                  `}>
                    {day.dayNumber}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[var(--color-text-primary)]">{day.name}</div>
                    <div className="text-xs text-[var(--color-text-secondary)] truncate">
                      {day.description}
                    </div>
                  </div>
                  {day.status === 'favorable' ? (
                    <Check size={16} className="text-[var(--color-favorable)] flex-shrink-0" />
                  ) : (
                    <X size={16} className="text-[var(--color-unfavorable)] flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Directions */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-3 flex items-center gap-2">
              Directions
              <span className="text-xs font-normal">(cycle de 8 jours)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {directions.map((dir, index) => {
                const cssKey = getDirectionCssKey(dir);
                return (
                  <div
                    key={dir}
                    className="flex items-center gap-2 p-3 rounded-xl text-sm"
                    style={{ 
                      backgroundColor: `color-mix(in srgb, var(--color-dir-${cssKey}) 15%, transparent)`,
                    }}
                  >
                    <span 
                      className="w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs text-white"
                      style={{ backgroundColor: `var(--color-dir-${cssKey})` }}
                    >
                      {index + 1}
                    </span>
                    <DirectionIcon direction={dir} size={18} />
                    <span 
                      className="font-medium text-xs sm:text-sm"
                      style={{ color: `var(--color-dir-${cssKey})` }}
                    >
                      {dir}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phases lunaires */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-3">
              Phases lunaires
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {MOON_PHASES.map((phase) => (
                <div 
                  key={phase}
                  className="flex items-center gap-2 p-3 rounded-xl bg-[var(--color-surface-elevated)]"
                >
                  <MoonPhaseIcon phase={phase} size={20} />
                  <span className="text-xs sm:text-sm text-[var(--color-text-primary)]">
                    {getMoonPhaseName(phase)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Indicateurs */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-3">
              Indicateurs
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-elevated)]">
                <span className="px-2 py-1 rounded-lg bg-[var(--color-surface)] text-[var(--color-text-primary)] text-xs font-bold border border-[var(--color-text-secondary)]">
                  NL
                </span>
                <span className="text-sm text-[var(--color-text-secondary)]">Nouvelle lune</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-elevated)]">
                <span className="px-2 py-1 rounded-lg bg-[var(--color-accent-primary)] text-[var(--color-background)] text-xs font-bold">
                  PL
                </span>
                <span className="text-sm text-[var(--color-text-secondary)]">Pleine lune</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-elevated)]">
                <AlertTriangle size={18} className="text-[var(--color-unfavorable)]" />
                <span className="text-sm text-[var(--color-text-secondary)]">Jour interdit</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
