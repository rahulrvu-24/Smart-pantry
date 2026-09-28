import { useState } from 'react'
import PageHeader from '../components/pageheader'

// A child that throws while rendering, so the ErrorBoundary can catch it
function BrokenWidget() {
  throw new Error('BrokenWidget failed to render (this is a deliberate demo error).')
}

// Demo page for the viva/report: shows the ErrorBoundary class component in action.
// Not linked in the navbar; open it at /error-demo.
function ErrorDemo() {
  const [crash, setCrash] = useState(false)

  return (
    <>
      <PageHeader
        title="Error Boundary Demo"
        subtitle="Click the button to render a component that throws."
      />
      <button
        type="button"
        onClick={() => setCrash(true)}
        className="rounded-lg bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-900"
      >
        Render a broken component
      </button>
      {crash && <BrokenWidget />}
    </>
  )
}

export default ErrorDemo