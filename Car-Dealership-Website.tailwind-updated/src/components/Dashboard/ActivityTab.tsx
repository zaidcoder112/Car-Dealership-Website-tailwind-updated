const activities = [
  { icon: '🚗', title: 'New vehicle added', desc: 'Ferrari Roma 2023 added to inventory', time: '2 mins ago', type: 'add' },
  { icon: '💰', title: 'Sale completed', desc: 'BMW M5 Competition sold for $105,000', time: '1 hour ago', type: 'sale' },
  { icon: '📩', title: 'New inquiry received', desc: 'Ahmed Khan inquired about Porsche 911', time: '3 hours ago', type: 'inquiry' },
  { icon: '✏️', title: 'Inventory updated', desc: 'Range Rover Sport status → Reserved', time: '5 hours ago', type: 'edit' },
  { icon: '👤', title: 'New user registered', desc: 'Sara Ali created an account', time: '6 hours ago', type: 'user' },
  { icon: '🗑️', title: 'Listing removed', desc: 'Bentley Continental GT 2021 removed', time: '1 day ago', type: 'delete' },
  { icon: '💳', title: 'Payment received', desc: 'Audi RS e-tron GT — $145,000 cleared', time: '1 day ago', type: 'sale' },
  { icon: '📋', title: 'Test drive booked', desc: 'Zain Raza booked Mercedes S-Class test drive', time: '2 days ago', type: 'inquiry' },
]

const typeBg: Record<string, string> = {
  add: 'bg-green-100 dark:bg-green-900/30',
  sale: 'bg-blue-100 dark:bg-blue-900/30',
  inquiry: 'bg-purple-100 dark:bg-purple-900/30',
  edit: 'bg-amber-100 dark:bg-amber-900/30',
  delete: 'bg-red-100 dark:bg-red-900/30',
  user: 'bg-teal-100 dark:bg-teal-900/30',
}

const metrics = [
  { label: 'Total Activities', value: '248', icon: '📊', color: 'text-blue-500' },
  { label: 'Sales This Week', value: '12', icon: '💰', color: 'text-green-500' },
  { label: 'Inquiries Pending', value: '7', icon: '📩', color: 'text-amber-500' },
  { label: 'New Users', value: '34', icon: '👥', color: 'text-purple-500' },
]

export default function ActivityTab() {
  return (
    <div className="space-y-6">
      {/* Quick Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{m.icon}</span>
              <span className={`text-xs font-bold ${m.color}`}>↑ 12%</span>
            </div>
            <p className="text-2xl font-black text-gray-900 dark:text-white">{m.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">Activity Feed</h2>
          <p className="text-xs text-gray-400 mt-0.5">All recent dealership events</p>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
          {activities.map((a, i) => (
            <div key={i} className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
              <div className={`${typeBg[a.type]} w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0`}>
                {a.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{a.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{a.desc}</p>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0 whitespace-nowrap">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
