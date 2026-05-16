import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export type DashView = 'overview' | 'inventory' | 'analytics' | 'activity'

interface SidebarProps {
  activeView: DashView
  onNavigate: (view: DashView) => void
  isOpen: boolean
  onClose: () => void
}

const NAV: { id: DashView; icon: string; label: string }[] = [
  { id: 'overview',  icon: '📊', label: 'Overview'  },
  { id: 'inventory', icon: '🚗', label: 'Inventory' },
  { id: 'analytics', icon: '📈', label: 'Analytics' },
  { id: 'activity',  icon: '📋', label: 'Activity'  },
]

export function Sidebar({ activeView, onNavigate, isOpen, onClose }: SidebarProps) {
  const { user } = useAuth()

  const go = (v: DashView) => { onNavigate(v); onClose() }

  const itemCls = (id: DashView) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border-none cursor-pointer text-left ${
      activeView === id
        ? 'bg-[#E63946] text-white shadow-lg shadow-[#E63946]/25'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 bg-transparent'
    }`

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-64 z-40 flex flex-col
        bg-white dark:bg-gray-900
        border-r border-gray-100 dark:border-gray-800
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <Link to="/" className="text-2xl font-black text-gray-900 dark:text-white no-underline" onClick={onClose}>
            Elite<span className="text-[#E63946]">Auto</span>
          </Link>
          <p className="text-xs text-gray-400 mt-0.5 font-medium">Admin Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold px-4 mb-3">Main Menu</p>
          {NAV.map(item => (
            <button key={item.id} onClick={() => go(item.id)} className={itemCls(item.id)}>
              <span className="text-base w-5 text-center">{item.icon}</span>
              <span>{item.label}</span>
              {activeView === item.id && <span className="ml-auto w-1.5 h-1.5 bg-white/70 rounded-full" />}
            </button>
          ))}

          <div className="my-4 border-t border-gray-100 dark:border-gray-800" />

          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold px-4 mb-3">General</p>
          <Link
            to="/profile"
            onClick={onClose}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all no-underline"
          >
            <span className="text-base w-5 text-center">⚙️</span> Settings
          </Link>
          <Link
            to="/"
            onClick={onClose}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all no-underline"
          >
            <span className="text-base w-5 text-center">🏠</span> Back to Site
          </Link>
        </nav>

        {/* User profile */}
        {user && (
          <div className="px-3 py-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
            <Link
              to="/profile"
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors no-underline group"
            >
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-[#E63946] transition-colors">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">{user.role}</p>
              </div>
              <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" title="Online" />
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}
