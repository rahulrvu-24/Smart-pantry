function ErrorBanner({ message, onDismiss }) {
  return (
    <div
      role="alert"
      className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
    >
      <p>{message}</p>
      <button type="button" onClick={onDismiss} className="shrink-0 font-medium hover:underline">
        Dismiss
      </button>
    </div>
  )
}

export default ErrorBanner