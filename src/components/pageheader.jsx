import { useEffect } from 'react'

// Reusable page heading. Keeps the browser tab title in sync with the current page.
function PageHeader({ title, subtitle, children }) {
  // Side effect: update document.title whenever the page title changes
  useEffect(() => {
    document.title = `${title} · Smart Pantry`
  }, [title])

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-stone-600">{subtitle}</p>}
      </div>
      {/* Optional actions (buttons, links) passed in from the page */}
      {children && <div className="flex gap-2">{children}</div>}
    </div>
  )
}

export default PageHeader