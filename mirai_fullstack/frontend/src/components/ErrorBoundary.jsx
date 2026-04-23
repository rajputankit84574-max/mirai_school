import React from 'react'

/**
 * ErrorBoundary
 * 
 * Audit fix §4.3: Prevents the entire React application from crashing
 * when a single component fails. Displays a brand-consistent fallback UI.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Audit Note: In production, log this to Sentry or similar service
    console.error("Mirai App Crash:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 p-6 text-center">
          <div className="max-w-md">
            <div className="text-6xl mb-6">🍃</div>
            <h1 className="font-display text-2xl font-bold text-stone-900 mb-4">Something went wrong</h1>
            <p className="text-stone-500 mb-8 leading-relaxed">
              We encountered an unexpected error. Please try refreshing the page or contact our support if the issue persists.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 rounded-full font-bold text-white transition-transform hover:scale-105 active:scale-95"
              style={{ background: '#AA4A44' }}
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
