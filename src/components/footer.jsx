// Functional component. The year is computed at render time; the tagline comes in as a prop.
function Footer({ tagline }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-sm text-stone-500 sm:flex-row sm:justify-between">
        <p>{tagline}</p>
        <p>&copy; {year} Smart Pantry</p>
      </div>
    </footer>
  )
}

export default Footer