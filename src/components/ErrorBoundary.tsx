import React, { Component } from 'react';
import type { ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { LunarCalculationError } from '../services/lunar';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary for catching and displaying lunar calculation errors
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    if (error instanceof LunarCalculationError) {
      console.error('Lunar calculation failed for date:', error.date);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4">
          <div className="max-w-md w-full bg-[var(--color-surface)] rounded-2xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-[var(--color-unfavorable)]/10 flex items-center justify-center">
                <AlertTriangle size={32} className="text-[var(--color-unfavorable)]" />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
              Erreur de calcul lunaire
            </h2>
            
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">
              Une erreur s'est produite lors du calcul des informations lunaires. 
              Veuillez réessayer.
            </p>

            {this.state.error && import.meta.env.DEV && (
              <details className="text-left mb-4 p-3 bg-[var(--color-background)] rounded-lg">
                <summary className="text-xs text-[var(--color-text-secondary)] cursor-pointer">
                  Détails de l'erreur
                </summary>
                <pre className="text-xs text-[var(--color-unfavorable)] mt-2 overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-primary)] 
                       text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              <RefreshCw size={18} />
              Réessayer
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
