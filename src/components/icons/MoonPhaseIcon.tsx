import { Moon, Circle, CircleDot } from 'lucide-react';
import type { MoonPhase } from '../../services/lunar';

interface MoonPhaseIconProps {
  phase: MoonPhase;
  size?: number;
  className?: string;
}

/**
 * Icône représentant les phases lunaires
 * Utilise des icônes Lucide stylisées pour représenter chaque phase
 */
export function MoonPhaseIcon({ phase, size = 20, className = '' }: MoonPhaseIconProps) {
  const baseClass = `${className}`;
  
  switch (phase) {
    case 'new':
      // Nouvelle lune - cercle vide sombre
      return (
        <Circle 
          size={size} 
          className={`${baseClass} text-[var(--color-text-secondary)]`}
          strokeWidth={2}
        />
      );
    
    case 'waxing-crescent':
      // Premier croissant - lune avec remplissage partiel gauche
      return (
        <div className={`${baseClass} relative`} style={{ width: size, height: size }}>
          <Circle size={size} className="text-[var(--color-text-secondary)]" strokeWidth={2} />
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          >
            <Circle size={size} className="text-[var(--color-accent-primary)] fill-current" strokeWidth={0} />
          </div>
        </div>
      );
    
    case 'first-quarter':
      // Premier quartier - demi-lune droite
      return (
        <div className={`${baseClass} relative`} style={{ width: size, height: size }}>
          <Circle size={size} className="text-[var(--color-text-secondary)]" strokeWidth={2} />
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: 'inset(0 0 0 50%)' }}
          >
            <Circle size={size} className="text-[var(--color-accent-primary)] fill-current" strokeWidth={0} />
          </div>
        </div>
      );
    
    case 'waxing-gibbous':
      // Gibbeuse croissante - presque pleine
      return (
        <div className={`${baseClass} relative`} style={{ width: size, height: size }}>
          <Circle size={size} className="text-[var(--color-accent-primary)] fill-current" strokeWidth={0} />
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: 'inset(0 75% 0 0)' }}
          >
            <Circle size={size} className="text-[var(--color-text-secondary)]" strokeWidth={2} />
          </div>
        </div>
      );
    
    case 'full':
      // Pleine lune - cercle plein
      return (
        <CircleDot 
          size={size} 
          className={`${baseClass} text-[var(--color-accent-primary)]`}
          strokeWidth={2}
        />
      );
    
    case 'waning-gibbous':
      // Gibbeuse décroissante
      return (
        <div className={`${baseClass} relative`} style={{ width: size, height: size }}>
          <Circle size={size} className="text-[var(--color-accent-primary)] fill-current" strokeWidth={0} />
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: 'inset(0 0 0 75%)' }}
          >
            <Circle size={size} className="text-[var(--color-text-secondary)]" strokeWidth={2} />
          </div>
        </div>
      );
    
    case 'last-quarter':
      // Dernier quartier - demi-lune gauche
      return (
        <div className={`${baseClass} relative`} style={{ width: size, height: size }}>
          <Circle size={size} className="text-[var(--color-text-secondary)]" strokeWidth={2} />
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          >
            <Circle size={size} className="text-[var(--color-accent-primary)] fill-current" strokeWidth={0} />
          </div>
        </div>
      );
    
    case 'waning-crescent':
      // Dernier croissant
      return (
        <Moon 
          size={size} 
          className={`${baseClass} text-[var(--color-accent-primary)]`}
          strokeWidth={2}
        />
      );
    
    default:
      return <Moon size={size} className={baseClass} />;
  }
}

/**
 * Retourne le nom français de la phase lunaire
 */
export function getMoonPhaseName(phase: MoonPhase): string {
  const names: Record<MoonPhase, string> = {
    'new': 'Nouvelle lune',
    'waxing-crescent': 'Premier croissant',
    'first-quarter': 'Premier quartier',
    'waxing-gibbous': 'Gibbeuse croissante',
    'full': 'Pleine lune',
    'waning-gibbous': 'Gibbeuse décroissante',
    'last-quarter': 'Dernier quartier',
    'waning-crescent': 'Dernier croissant',
  };
  return names[phase];
}
