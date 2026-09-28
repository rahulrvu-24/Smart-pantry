import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import Dashboard from './pages/dashboard'
import Pantry from './pages/pantry'
import AddItem from './pages/additem'
import Recipes from './pages/recipes'
import RecipeDetail from './pages/recipedetail'
import NotFound from './pages/notfound'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pantry" element={<Pantry />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App