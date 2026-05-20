import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export type DashView = 'overview' | 'inventory' | 'analytics' | 'activity'

interface SidebarProps {
  activeView: DashView
  onNavigate: (view: DashView) => void
  isOpen: boolean
  onClose: () => void
}

const NAV: { id: DashView; icon: string; label: string; desc: string }[] = [
  { id: 'overview',  icon: '📊', label: 'Overview',   desc: 'Stats & summary' },
  { id: 'inventory', icon: '🚗', label: 'Inventory',  desc: 'Manage vehicles' },
  { id: 'analytics', icon: '📈', label: 'Analytics',  desc: 'Charts & data' },
  { id: 'activity',  icon: '📋', label: 'Activity',   desc: 'Recent actions' },
]

export function Sidebar({ activeView, onNavigate, isOpen, onClose }: SidebarProps) {
  const { user } = useAuth()
  const go = (v: DashView) => { onNavigate(v); onClose() }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div>
          <Link to="/" className="text-xl font-black text-gray-900 dark:text-white no-underline" onClick={onClose}>
            Elite<span className="text-[#E63946]">Auto</span>
          </Link>
          <p className="text-[10px] text-gray-400 mt-0.5 font-semibold tracking-wider uppercase">Admin Panel</p>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold px-3 mb-3">Main Menu</p>
        {NAV.map(item => (
          <button
            key={item.id}
            onClick={() => go(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border-none cursor-pointer text-left group ${
              activeView === item.id
                ? 'bg-[#E63946] text-white shadow-lg shadow-[#E63946]/20'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent'
            }`}
          >
            <span className="text-base w-6 text-center flex-shrink-0">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="leading-none">{item.label}</p>
              <p className={`text-[10px] mt-0.5 ${activeView === item.id ? 'text-white/70' : 'text-gray-400 dark:text-gray-500'}`}>
                {item.desc}
              </p>
            </div>
            {activeView === item.id && (
              <span className="w-1.5 h-1.5 bg-white/70 rounded-full flex-shrink-0" />
            )}
          </button>
        ))}

        <div className="my-4 border-t border-gray-100 dark:border-gray-800" />

        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold px-3 mb-3">Quick Links</p>
        <Link
          to="/profile"
          onClick={onClose}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all no-underline"
        >
          <span className="text-base w-6 text-center">⚙️</span> Settings
        </Link>
        <Link
          to="/"
          onClick={onClose}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all no-underline"
        >
          <span className="text-base w-6 text-center">🏠</span> Back to Site
        </Link>
      </nav>

      {/* User Profile */}
      {user && (
        <div className="px-3 py-4 border-t border-gray-100 dark:border-gray-800">
          <Link
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors no-underline group"
          >
            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0 ring-2 ring-[#E63946]/20" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-[#E63946] transition-colors">
                {user.name}
              </p>
              <p className="text-xs text-gray-400 truncate">{user.role}</p>
            </div>
            <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" title="Online" />
          </Link>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </div>

      {/* Desktop static sidebar */}
      <aside className="hidden lg:flex w-64 flex-col flex-shrink-0 min-h-full">
        <SidebarContent />
      </aside>
    </>
  )
}
