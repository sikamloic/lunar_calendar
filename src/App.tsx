import { Moon } from 'lucide-react';
import { LunarCalendar, ThemeToggle } from './components';

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[var(--color-surface)]/90 backdrop-blur-md border-b border-[var(--color-surface-elevated)]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[var(--color-accent-primary)] flex items-center justify-center">
              <Moon size={18} className="text-[var(--color-background)]" />
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-bold text-[var(--color-text-primary)] leading-tight">
                Calendrier Fezan
              </h1>
              <p className="text-[10px] sm:text-xs text-[var(--color-text-secondary)] hidden sm:block">
                Calendrier lunaire traditionnel
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-4 sm:py-6">
        <LunarCalendar />
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-surface-elevated)] py-4 sm:py-6 safe-area-bottom">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 text-center text-xs sm:text-sm text-[var(--color-text-secondary)]">
          <p>Calendrier basé sur le système Fezan traditionnel du Bénin</p>
          <p className="mt-1 hidden sm:block">Les calculs lunaires sont effectués avec précision astronomique</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
