import { X, Check, AlertTriangle, Clock, Navigation } from 'lucide-react';
import type { LunarDayInfo } from '../../services/lunar';
import { getDirectionCssKey } from '../../services/lunar';
import { MoonPhaseIcon, getMoonPhaseName } from '../icons';
import { DirectionIcon } from '../icons';

interface DayDetailPanelProps {
  dayInfo: LunarDayInfo | null;
  onClose: () => void;
}

export function DayDetailPanel({ dayInfo, onClose }: DayDetailPanelProps) {
  if (!dayInfo) return null;

  const directionKey = getDirectionCssKey(dayInfo.direction);
  const isFavorable = dayInfo.fezan.status === 'favorable';

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-surface)] rounded-t-3xl 
                      max-h-[85vh] overflow-y-auto animate-slide-up
                      sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
                      sm:w-full sm:rounded-2xl sm:max-h-[90vh]">
        
        {/* Handle pour mobile */}
        <div className="sm:hidden flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[var(--color-text-secondary)]/30 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-[var(--color-surface-elevated)]">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-3xl font-bold text-[var(--color-text-primary)]">
                {dayInfo.gregorianDay}
              </span>
              <span className="text-lg text-[var(--color-text-secondary)]">
                {dayInfo.dayOfWeek}
              </span>
            </div>
            <div className="text-sm text-[var(--color-text-secondary)]">
              {new Date(dayInfo.date).toLocaleDateString('fr-FR', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-[var(--color-surface-elevated)] transition-colors"
            aria-label="Fermer"
          >
            <X size={20} className="text-[var(--color-text-secondary)]" />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-4 sm:p-6 space-y-6">
          
          {/* Jour lunaire */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--color-surface-elevated)]">
            <div>
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">Jour lunaire</div>
              <div 
                className="text-4xl font-mono font-bold"
                style={{ color: `var(--color-dir-${directionKey})` }}
              >
                {dayInfo.lunarDay}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MoonPhaseIcon phase={dayInfo.moonPhase} size={40} />
              <span className="text-xs text-[var(--color-text-secondary)]">
                {getMoonPhaseName(dayInfo.moonPhase)}
              </span>
            </div>
          </div>

          {/* Fezan */}
          <div className={`p-4 rounded-2xl ${
            isFavorable 
              ? 'bg-[var(--color-favorable)]/10 border border-[var(--color-favorable)]/30' 
              : 'bg-[var(--color-unfavorable)]/10 border border-[var(--color-unfavorable)]/30'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold
                  ${isFavorable 
                    ? 'bg-[var(--color-favorable)] text-white' 
                    : 'bg-[var(--color-unfavorable)] text-white'
                  }
                `}>
                  {dayInfo.fezan.dayNumber}
                </span>
                <div>
                  <div className="font-bold text-lg text-[var(--color-text-primary)]">
                    {dayInfo.fezan.name}
                  </div>
                  <div className={`text-sm font-medium ${
                    isFavorable ? 'text-[var(--color-favorable)]' : 'text-[var(--color-unfavorable)]'
                  }`}>
                    {isFavorable ? 'Jour favorable' : 'Jour défavorable'}
                  </div>
                </div>
              </div>
              {isFavorable ? (
                <Check size={24} className="text-[var(--color-favorable)]" />
              ) : (
                <X size={24} className="text-[var(--color-unfavorable)]" />
              )}
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-2">
              {dayInfo.fezan.description}
            </p>
            <p className="text-sm text-[var(--color-text-primary)]">
              {dayInfo.fezan.recommendation}
            </p>
          </div>

          {/* Direction */}
          <div 
            className="p-4 rounded-2xl"
            style={{ 
              backgroundColor: `color-mix(in srgb, var(--color-dir-${directionKey}) 15%, transparent)`,
              borderColor: `var(--color-dir-${directionKey})`,
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `var(--color-dir-${directionKey})` }}
              >
                <Navigation size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-[var(--color-text-secondary)]">Direction du jour</div>
                <div 
                  className="font-bold text-lg flex items-center gap-2"
                  style={{ color: `var(--color-dir-${directionKey})` }}
                >
                  <DirectionIcon direction={dayInfo.direction} size={20} />
                  {dayInfo.direction}
                </div>
              </div>
            </div>
          </div>

          {/* Alertes */}
          {(dayInfo.isNewMoon || dayInfo.isFullMoon || dayInfo.isForbiddenDay) && (
            <div className="space-y-2">
              {dayInfo.isNewMoon && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-elevated)]">
                  <Clock size={18} className="text-[var(--color-accent-primary)]" />
                  <span className="text-sm text-[var(--color-text-primary)]">
                    Nouvelle lune {dayInfo.newMoonTime && `à ${dayInfo.newMoonTime}`}
                  </span>
                </div>
              )}
              {dayInfo.isFullMoon && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-accent-primary)]/10">
                  <MoonPhaseIcon phase="full" size={18} />
                  <span className="text-sm text-[var(--color-text-primary)]">
                    Pleine lune
                  </span>
                </div>
              )}
              {dayInfo.isForbiddenDay && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-unfavorable)]/10">
                  <AlertTriangle size={18} className="text-[var(--color-unfavorable)]" />
                  <span className="text-sm text-[var(--color-unfavorable)]">
                    Jour interdit - Ne rien entreprendre d'important
                  </span>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
