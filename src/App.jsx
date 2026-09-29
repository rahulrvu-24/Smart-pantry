import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/layout'
import ErrorBoundary from './components/errorboundary'
import Dashboard from './pages/dashboard'
import Pantry from './pages/pantry'
import AddItem from './pages/additem'
import Recipes from './pages/Recipes'
import RecipeDetail from './pages/recipedetail'
import ErrorDemo from './pages/errordemo'
import NotFound from './pages/notfound'
import { createSeedItems } from './data/pantry'

function App() {
  const location = useLocation()

  // Single source of truth for the pantry. Lives in App (the top-level parent)
  // so every page that needs it can receive it as a prop.
  const [items, setItems] = useState(createSeedItems)

  return (
    <Layout>
      {/* Changing the key remounts the boundary, clearing a caught error on navigation */}
      <ErrorBoundary key={location.pathname}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pantry" element={<Pantry items={items} />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/error-demo" element={<ErrorDemo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Layout>
  )
}

export default App