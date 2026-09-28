import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

// Functional component. Receives the app name and nav links from its parent (Layout) as props.
function Navbar({ appName, links }) {
  // Local UI state: whether the mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false)

  const handleToggle = () => setMenuOpen((open) => !open)
  const handleLinkClick = () => setMenuOpen(false)

  const linkClass = ({ isActive }) =>
    `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-600 text-white'
        : 'text-stone-600 hover:bg-brand-50 hover:text-brand-700'
    }`

  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-brand-700">
          <span aria-hidden="true">🥫</span>
          {appName}
        </Link>

        {/* Desktop links */}
        <ul className="hidden gap-1 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={handleToggle}
          className="rounded-md p-2 text-stone-600 hover:bg-stone-100 md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile links */}
      {menuOpen && (
        <ul className="space-y-1 border-t border-stone-200 px-4 py-3 md:hidden">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={linkClass}
                onClick={handleLinkClick}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

export default Navbar