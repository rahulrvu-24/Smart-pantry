import { Component } from 'react'

/**
 * Class component (required by the assignment).
 *
 * Error boundaries can only be written as class components: React has no hook
 * equivalent for getDerivedStateFromError / componentDidCatch. If any page
 * throws while rendering, this shows a fallback instead of a blank screen.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
    this.handleReset = this.handleReset.bind(this)
  }

  // Called during render when a child throws: switch to the fallback UI
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  // Called after the error is caught: good place for logging
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info.componentStack)
  }

  handleReset() {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-800">Something went wrong on this page.</h2>
          <p className="mt-1 text-sm text-red-700">{this.state.error?.message}</p>
          <button
            type="button"
            onClick={this.handleReset}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary