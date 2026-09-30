import PageHeader from '../components/PageHeader'
import Placeholder from '../components/Placeholder'

function Recipes() {
  return (
    <>
      <PageHeader title="Recipe Rescue" subtitle="Recipes that use up what's about to expire." />
      <Placeholder
        day="Day 5"
        items={[
          'Fetch recipes from TheMealDB by ingredient (useEffect)',
          'Loading, error and empty states',
        ]}
      />
    </>
  )
}

export default Recipes