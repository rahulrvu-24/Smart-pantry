// Computed once when the file loads, not during render (keeps the component pure)
const CURRENT_YEAR = new Date().getFullYear()

// Functional component. The tagline comes in as a prop.
function Footer({ tagline }) {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-sm text-stone-500 sm:flex-row sm:justify-between">
        <p>{tagline}</p>
        <p>&copy; {CURRENT_YEAR} Smart Pantry</p>
      </div>
    </footer>
  )
}

export default Footer