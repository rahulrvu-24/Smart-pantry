import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/layout'
import ErrorBoundary from './components/errorboundary'
import Dashboard from './pages/dashboard'
import Pantry from './pages/pantry'
import AddItem from './pages/additem'
import Recipes from './pages/recipes'
import RecipeDetail from './pages/recipedetail'
import ErrorDemo from './pages/errordemo'
import NotFound from './pages/notfound'

function App() {
  const location = useLocation()

  return (
    <Layout>
      {/* Changing the key remounts the boundary, clearing a caught error on navigation */}
      <ErrorBoundary key={location.pathname}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pantry" element={<Pantry />} />
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