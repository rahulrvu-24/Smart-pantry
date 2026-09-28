// Temporary card listing what a page will contain. Removed as each page is built.
function Placeholder({ day, items }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-stone-300 bg-white p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-stone-400">Coming on {day}</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-stone-600">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default Placeholder