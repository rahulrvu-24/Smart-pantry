import Navbar from './Navbar'
import Footer from './Footer'

// Navigation config lives here and is passed down to Navbar as a prop.
const NAV_LINKS = [
  { to: '/', label: 'Dashboard' },
  { to: '/pantry', label: 'Pantry' },
  { to: '/add', label: 'Add Item' },
  { to: '/recipes', label: 'Recipes' },
]

// Parent component: wraps every page. Whatever it is given as `children` is rendered in <main>.
function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar appName="Smart Pantry" links={NAV_LINKS} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-8">{children}</main>
      <Footer tagline="Use it before you lose it." />
    </div>
  )
}

export default Layout