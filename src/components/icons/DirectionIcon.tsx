import { 
  ArrowUp, 
  ArrowUpRight, 
  ArrowRight, 
  ArrowDownRight, 
  ArrowDown, 
  ArrowDownLeft, 
  ArrowLeft, 
  ArrowUpLeft,
  Minus
} from 'lucide-react';
import type { CardinalDirection } from '../../services/lunar';
import { getDirectionCssKey } from '../../services/lunar';

interface DirectionIconProps {
  direction: CardinalDirection | null;
  size?: number;
  className?: string;
  showColor?: boolean;
}

/**
 * Icône représentant les directions cardinales
 */
export function DirectionIcon({ 
  direction, 
  size = 16, 
  className = '',
  showColor = true 
}: DirectionIconProps) {
  // Si pas de direction, afficher un tiret
  if (!direction) {
    return <Minus size={size} className={`${className} text-[var(--color-text-secondary)]`} />;
  }
  
  const cssKey = getDirectionCssKey(direction);
  const colorStyle = showColor ? { color: `var(--color-dir-${cssKey})` } : {};
  
  const iconProps = {
    size,
    className,
    style: colorStyle,
    strokeWidth: 2,
  };

  switch (direction) {
    case 'Nord':
      return <ArrowUp {...iconProps} />;
    case 'Nord-Est':
      return <ArrowUpRight {...iconProps} />;
    case 'Est':
      return <ArrowRight {...iconProps} />;
    case 'Sud-Est':
      return <ArrowDownRight {...iconProps} />;
    case 'Sud':
      return <ArrowDown {...iconProps} />;
    case 'Sud-Ouest':
      return <ArrowDownLeft {...iconProps} />;
    case 'Ouest':
      return <ArrowLeft {...iconProps} />;
    case 'Nord-Ouest':
      return <ArrowUpLeft {...iconProps} />;
    default:
      return <Minus {...iconProps} />;
  }
}
