import { Moon } from 'lucide-react';
import { LunarCalendar, ThemeToggle } from './components';

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col">
      {/* Header minimaliste */}
      <header className="sticky top-0 z-30 bg-[var(--color-background)]/95 backdrop-blur-sm">
        <div className="max-w-lg mx-auto px-2 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon size={20} className="text-[var(--color-accent-primary)]" />
            <h1 className="text-sm font-semibold text-[var(--color-text-primary)]">
              Fezan
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-2">
        <LunarCalendar />
      </main>
    </div>
  );
}

export default App;
