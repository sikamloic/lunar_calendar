import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-surface-elevated)] 
                 active:scale-95 transition-all touch-manipulation"
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      {isDark ? (
        <Sun size={20} className="text-[var(--color-accent-primary)]" />
      ) : (
        <Moon size={20} className="text-[var(--color-accent-primary)]" />
      )}
    </button>
  );
}
