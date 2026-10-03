import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import ErrorBanner from './components/ErrorBanner'
import Dashboard from './pages/Dashboard'
import Pantry from './pages/Pantry'
import AddItem from './pages/AddItem'
import Recipes from './pages/Recipes'
import RecipeDetail from './pages/RecipeDetail'
import ErrorDemo from './pages/ErrorDemo'
import NotFound from './pages/NotFound'
import { consumeItem, createItem, deleteItem, getItems, resetItems } from './api/items'

function App() {
  const location = useLocation()

  // Single source of truth for the pantry on the client. The Express API is the
  // permanent store; this state is the copy the UI renders from.
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Side effect: load the pantry from the API once, when the app first mounts
  useEffect(() => {
    let ignore = false // guards against setting state after unmount

    getItems()
      .then((data) => {
        if (!ignore) setItems(data)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    // Cleanup runs if the component unmounts before the request finishes
    return () => {
      ignore = true
    }
  }, []) // empty dependency array = run once on mount

  // Each handler: call the API first, then update local state with what the server returned.
  const handleUseOne = async (id) => {
    try {
      const updated = await consumeItem(id)
      setItems((prev) =>
        prev.map((item) => (item.id === id ? updated : item)).filter((item) => item.quantity > 0),
      )
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteItem(id)
      setItems((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  // Returns true/false so the Add Item page knows whether to navigate away
  const handleAddItem = async (newItem) => {
    try {
      const saved = await createItem(newItem) // the server assigns the id
      setItems((prev) => [saved, ...prev])
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  const handleReset = async () => {
    try {
      setItems(await resetItems())
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Layout>
      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

      {/* Changing the key remounts the boundary, clearing a caught error on navigation */}
      <ErrorBoundary key={location.pathname}>
        <Routes>
          <Route path="/" 
          element={<Dashboard items={items} loading={loading} onUse={handleUseOne}/>} />
          <Route
            path="/pantry"
            element={
              <Pantry
                items={items}
                loading={loading}
                onUse={handleUseOne}
                onDelete={handleDelete}
                onReset={handleReset}
              />
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