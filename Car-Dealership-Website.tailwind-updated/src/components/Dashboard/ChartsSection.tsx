import {
  ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar,
  PieChart, Pie, Cell,
  AreaChart, Area,
} from 'recharts'

const monthlySales = [
  { month: 'Jan', revenue: 62000, sales: 12 },
  { month: 'Feb', revenue: 48000, sales: 9 },
  { month: 'Mar', revenue: 78000, sales: 15 },
  { month: 'Apr', revenue: 95000, sales: 18 },
  { month: 'May', revenue: 72000, sales: 14 },
  { month: 'Jun', revenue: 88000, sales: 17 },
  { month: 'Jul', revenue: 105000, sales: 21 },
  { month: 'Aug', revenue: 91000, sales: 19 },
  { month: 'Sep', revenue: 112000, sales: 23 },
  { month: 'Oct', revenue: 98000, sales: 20 },
  { month: 'Nov', revenue: 80000, sales: 16 },
  { month: 'Dec', revenue: 70000, sales: 13 },
]

const inventoryStats = [
  { brand: 'BMW', available: 12, sold: 8, reserved: 3 },
  { brand: 'Mercedes', available: 10, sold: 14, reserved: 2 },
  { brand: 'Porsche', available: 6, sold: 5, reserved: 4 },
  { brand: 'Audi', available: 9, sold: 11, reserved: 1 },
  { brand: 'Ferrari', available: 4, sold: 7, reserved: 2 },
  { brand: 'Land Rover', available: 7, sold: 6, reserved: 3 },
]

const categoryDist = [
  { name: 'Luxury Sedan', value: 30 },
  { name: 'Sports Car', value: 25 },
  { name: 'Luxury SUV', value: 20 },
  { name: 'Electric', value: 15 },
  { name: 'Supercar', value: 10 },
]

const PIE_COLORS = ['#3b82f6', '#E63946', '#a855f7', '#14b8a6', '#f59e0b']

const userActivity = [
  { day: 'Mon', visits: 240, inquiries: 45, testDrives: 12 },
  { day: 'Tue', visits: 310, inquiries: 58, testDrives: 18 },
  { day: 'Wed', visits: 280, inquiries: 52, testDrives: 15 },
  { day: 'Thu', visits: 390, inquiries: 70, testDrives: 22 },
  { day: 'Fri', visits: 450, inquiries: 85, testDrives: 28 },
  { day: 'Sat', visits: 520, inquiries: 95, testDrives: 35 },
  { day: 'Sun', visits: 380, inquiries: 62, testDrives: 20 },
]

const tooltipStyle = {
  backgroundColor: 'rgba(17,24,39,0.95)',
  border: '1px solid rgba(75,85,99,0.5)',
  borderRadius: '12px',
  color: '#f9fafb',
  fontSize: '12px',
}

export default function ChartsSection() {
  return (
    <div className="space-y-6 mt-6">

      {/* Row 1: Line + Bar */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Line Chart – Monthly Revenue */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="mb-4">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Monthly Revenue</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Revenue trend over the year</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlySales} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(156,163,175,0.2)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="revenue" stroke="#E63946" strokeWidth={3} dot={{ r: 4, fill: '#E63946', strokeWidth: 0 }} activeDot={{ r: 6 }} name="Revenue ($)" />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 5 }} name="Units Sold" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart – Inventory by Brand */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="mb-4">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Inventory by Brand</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Stock breakdown per manufacturer</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={inventoryStats} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(156,163,175,0.2)" />
              <XAxis dataKey="brand" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="available" name="Available" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="sold" name="Sold" fill="#E63946" radius={[4, 4, 0, 0]} />
              <Bar dataKey="reserved" name="Reserved" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Pie + Area */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Pie Chart – Category Distribution */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="mb-4">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Vehicle Category Distribution</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Share of each category in inventory</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={categoryDist} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {categoryDist.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 min-w-max">
              {categoryDist.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{d.name}</span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white ml-auto pl-4">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Area Chart – User Activity */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="mb-4">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">User Activity Trends</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Weekly visits, inquiries & test drives</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={userActivity} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="gradVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradInquiries" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E63946" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#E63946" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradTest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(156,163,175,0.2)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area type="monotone" dataKey="visits" name="Visits" stroke="#3b82f6" strokeWidth={2} fill="url(#gradVisits)" />
              <Area type="monotone" dataKey="inquiries" name="Inquiries" stroke="#E63946" strokeWidth={2} fill="url(#gradInquiries)" />
              <Area type="monotone" dataKey="testDrives" name="Test Drives" stroke="#a855f7" strokeWidth={2} fill="url(#gradTest)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}
