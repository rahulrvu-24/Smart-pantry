import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import Dashboard from './pages/Dashboard'
import Pantry from './pages/Pantry'
import AddItem from './pages/AddItem'
import Recipes from './pages/Recipes'
import RecipeDetail from './pages/RecipeDetail'
import ErrorDemo from './pages/ErrorDemo'
import NotFound from './pages/NotFound'
import { createSeedItems } from './data/pantry'
import { loadItems, saveItems } from './utils/storage'

function App() {
  const location = useLocation()

  // Single source of truth for the pantry. Lives in App (the top-level parent)
  // so every page that needs it can receive it as a prop.
  // Passing a function (not its result) means localStorage is only read on the first render.
  const [items, setItems] = useState(loadItems)

  // Side effect: save to localStorage every time `items` changes
  useEffect(() => {
    saveItems(items)
  }, [items])

  // Event handlers live next to the state they change, and are passed down as props.
  // "Use 1": reduce quantity by one; remove the item when the last one is used.
  const handleUseOne = (id) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Add a new item from the form. The form doesn't know about ids, so App creates one.
  const handleAddItem = (newItem) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    setItems((prev) => [{ ...newItem, id }, ...prev])
  }

  const handleReset = () => {
    setItems(createSeedItems())
  }

  return (
    <Layout>
      {/* Changing the key remounts the boundary, clearing a caught error on navigation */}
      <ErrorBoundary key={location.pathname}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/pantry"
            element={
              <Pantry items={items} onUse={handleUseOne} onDelete={handleDelete} onReset={handleReset} />
            }
          />
          <Route path="/add" element={<AddItem onAdd={handleAddItem} />} />
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