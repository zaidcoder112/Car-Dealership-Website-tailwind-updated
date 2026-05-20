import ChartsSection from './ChartsSection'

const stats = [
  { label: 'Total Revenue', value: '$1.24M', icon: '💰', change: '+12%', up: true, bg: 'bg-blue-50 dark:bg-blue-900/20', iconBg: 'bg-blue-100 dark:bg-blue-900/40' },
  { label: 'Cars in Stock', value: '48', icon: '🚗', change: '+3 new', up: true, bg: 'bg-green-50 dark:bg-green-900/20', iconBg: 'bg-green-100 dark:bg-green-900/40' },
  { label: 'Cars Sold', value: '127', icon: '🏆', change: '+8% this month', up: true, bg: 'bg-purple-50 dark:bg-purple-900/20', iconBg: 'bg-purple-100 dark:bg-purple-900/40' },
  { label: 'Pending Inquiries', value: '23', icon: '📩', change: '-4 resolved', up: false, bg: 'bg-red-50 dark:bg-red-900/20', iconBg: 'bg-red-100 dark:bg-red-900/40' },
]

const recentOrders = [
  { id: '#ORD-001', customer: 'Ahmed Khan', car: 'BMW M5 Competition', price: '$105,000', status: 'Completed', date: 'May 20' },
  { id: '#ORD-002', customer: 'Sara Ali', car: 'Porsche 911 Turbo S', price: '$215,000', status: 'Pending', date: 'May 19' },
  { id: '#ORD-003', customer: 'Usman Tariq', car: 'Range Rover Sport', price: '$78,000', status: 'Processing', date: 'May 19' },
  { id: '#ORD-004', customer: 'Ayesha Malik', car: 'Audi RS e-tron GT', price: '$145,000', status: 'Completed', date: 'May 18' },
  { id: '#ORD-005', customer: 'Zain Raza', car: 'Mercedes S-Class', price: '$89,500', status: 'Cancelled', date: 'May 17' },
]

const activity = [
  { icon: '🚗', text: 'New vehicle added: Ferrari Roma', time: '2 mins ago', color: 'bg-green-100 dark:bg-green-900/30' },
  { icon: '💰', text: 'Sale completed: BMW M5 — $105K', time: '1 hr ago', color: 'bg-blue-100 dark:bg-blue-900/30' },
  { icon: '📩', text: 'New inquiry from Ahmed Khan', time: '3 hrs ago', color: 'bg-purple-100 dark:bg-purple-900/30' },
  { icon: '✏️', text: 'Inventory updated: Range Rover Sport', time: '5 hrs ago', color: 'bg-amber-100 dark:bg-amber-900/30' },
  { icon: '🗑️', text: 'Listing removed: Bentley GT 2021', time: '1 day ago', color: 'bg-red-100 dark:bg-red-900/30' },
]

const statusCls: Record<string, string> = {
  Completed: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  Pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  Processing: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  Cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
}

export default function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-5 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between mb-3">
              <div className={`${s.iconBg} w-11 h-11 rounded-xl flex items-center justify-center text-xl`}>{s.icon}</div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.up ? 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'}`}>
                {s.up ? '↑' : '↓'} {s.change}
              </span>
            </div>
            <p className="text-2xl font-black text-gray-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Orders Table */}
        <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Recent Orders</h2>
              <p className="text-xs text-gray-400 mt-0.5">Latest 5 transactions</p>
            </div>
            <span className="text-xs bg-[#E63946]/10 text-[#E63946] font-semibold px-3 py-1 rounded-full">View All</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  {['Order', 'Customer', 'Vehicle', 'Amount', 'Status', 'Date'].map(h => (
                    <th key={h} className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                {recentOrders.map(o => (
                  <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs font-semibold text-[#E63946]">{o.id}</td>
                    <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white text-sm">{o.customer}</td>
                    <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400 text-xs">{o.car}</td>
                    <td className="px-5 py-3.5 font-bold text-gray-900 dark:text-white">{o.price}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusCls[o.status]}`}>{o.status}</span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">Recent Activity</h2>
          <p className="text-xs text-gray-400 mb-5">Live dealership updates</p>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`${a.color} w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0`}>{a.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-snug">{a.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts */}
      <ChartsSection />
    </div>
  )
}
