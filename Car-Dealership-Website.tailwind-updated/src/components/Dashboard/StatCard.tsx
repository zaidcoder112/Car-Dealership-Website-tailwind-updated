interface StatCardProps {
  icon: string
  label: string
  value: string
  change: string
  up: boolean
  loading?: boolean
}

export function StatCard({ icon, label, value, change, up, loading }: StatCardProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
        <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <div className="h-4 w-32 bg-gray-100 dark:bg-gray-800 rounded" />
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 bg-[#E63946]/10 group-hover:bg-[#E63946]/20 rounded-xl flex items-center justify-center text-xl transition-colors">
          {icon}
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
          up
            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
            : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
        }`}>
          {up ? '↑' : '↓'} {change}
        </span>
      </div>
      <p className="text-2xl font-black text-gray-900 dark:text-white mb-1">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">{label}</p>
    </div>
  )
}
