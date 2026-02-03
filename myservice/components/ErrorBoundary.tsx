import React, { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState;
  public props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#1a2a22] text-white flex items-center justify-center p-6">
          <div className="max-w-md text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-3xl font-bold mb-4 serif">Etwas ist schiefgelaufen</h1>
            <p className="text-white/60 mb-8">
              Es gab einen unerwarteten Fehler. Bitte versuchen Sie, die Seite zu aktualisieren.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-yellow-400 text-[#1a2a22] rounded-full font-bold hover:bg-yellow-300 transition-colors"
            >
              Seite aktualisieren
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left bg-[#2b4036] p-4 rounded-lg text-xs">
                <summary className="cursor-pointer text-yellow-400 font-bold">
                  Fehlerdetails (Entwicklung)
                </summary>
                <pre className="mt-3 text-white/70 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
