import { useState } from 'react'
import { Sidebar, type DashView } from '../../components/Dashboard/Sidebar'
import OverviewTab from '../../components/Dashboard/OverviewTab'
import InventoryTab from '../../components/Dashboard/InventoryTab'
import ChartsSection from '../../components/Dashboard/ChartsSection'
import ActivityTab from '../../components/Dashboard/ActivityTab'
import { useAuth } from '../../context/AuthContext'

const viewLabels: Record<DashView, { title: string; subtitle: string }> = {
  overview:  { title: 'Dashboard Overview',  subtitle: 'Welcome back! Here\'s what\'s happening today.' },
  inventory: { title: 'Vehicle Inventory',   subtitle: 'Manage your complete car listing.' },
  analytics: { title: 'Analytics & Reports', subtitle: 'Sales charts and performance data.' },
  activity:  { title: 'Recent Activity',     subtitle: 'Live log of dealership events.' },
}

export default function Dashboard() {
  const [view, setView] = useState<DashView>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div className="flex bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)] transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        activeView={view}
        onNavigate={setView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 sm:px-6 py-4 flex items-center gap-4 sticky top-0 z-20 shadow-sm">
          {/* Hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors bg-transparent border-none cursor-pointer"
          >
            ☰
          </button>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-black text-gray-900 dark:text-white truncate">{viewLabels[view].title}</h1>
            <p className="text-xs text-gray-400 hidden sm:block">{viewLabels[view].subtitle}</p>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 w-48 lg:w-64">
            <span className="text-gray-400 text-sm">🔍</span>
            <input
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 w-full"
            />
          </div>

          {/* Notification */}
          <button className="relative w-9 h-9 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors bg-transparent border-none cursor-pointer">
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#E63946] rounded-full" />
          </button>

          {/* User avatar */}
          {user ? (
            <div className="flex items-center gap-2.5 pl-2 border-l border-gray-100 dark:border-gray-800">
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-xl object-cover ring-2 ring-[#E63946]/20" />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-none">{user.name.split(' ')[0]}</p>
                <p className="text-[10px] text-gray-400">{user.role}</p>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm">👤</div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {view === 'overview'  && <OverviewTab />}
          {view === 'inventory' && <InventoryTab />}
          {view === 'analytics' && (
            <div>
              <div className="mb-4">
                <h2 className="text-base font-bold text-gray-900 dark:text-white">Sales & Performance Charts</h2>
                <p className="text-xs text-gray-400 mt-0.5">Visual analytics for the current year</p>
              </div>
              <ChartsSection />
            </div>
          )}
          {view === 'activity'  && <ActivityTab />}
        </main>
      </div>
    </div>
  )
}
