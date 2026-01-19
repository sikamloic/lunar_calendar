import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

/**
 * Safely retrieves and validates theme from localStorage
 */
function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  
  try {
    const stored = localStorage.getItem('theme');
    
    // Validate that the stored value is a valid theme
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
    
    // Invalid value, return default
    return 'system';
  } catch (error) {
    // localStorage might not be available (private browsing, etc.)
    console.warn('Failed to read theme from localStorage:', error);
    return 'system';
  }
}

/**
 * Safely stores theme to localStorage
 */
function storeTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    // localStorage might not be available or quota exceeded
    console.warn('Failed to save theme to localStorage:', error);
  }
}

/**
 * Hook pour gérer le thème de l'application
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  // Détecte la préférence système
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateResolvedTheme = () => {
      if (theme === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setResolvedTheme(theme);
      }
    };

    updateResolvedTheme();
    mediaQuery.addEventListener('change', updateResolvedTheme);

    return () => mediaQuery.removeEventListener('change', updateResolvedTheme);
  }, [theme]);

  // Applique le thème au document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    storeTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    isDark: resolvedTheme === 'dark',
  };
}
