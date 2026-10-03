const TONES = {
  neutral: 'border-stone-200 bg-white text-stone-800',
  fresh: 'border-green-200 bg-green-50 text-green-800',
  soon: 'border-amber-200 bg-amber-50 text-amber-900',
  expired: 'border-red-200 bg-red-50 text-red-800',
}

// Reusable summary card: a big number with a label. The `tone` prop picks the colour scheme.
function StatCard({ label, value, hint, tone = 'neutral' }) {
  return (
    <div className={`rounded-xl border p-4 shadow-sm ${TONES[tone]}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
      {hint && <p className="mt-1 text-xs opacity-70">{hint}</p>}
    </div>
  )
}

export default StatCard