import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import type { DashView } from './Sidebar'

interface DashTopbarProps {
  onMenuToggle: () => void
  activeView: DashView
  searchQuery: string
  onSearch: (q: string) => void
}

const LABELS: Record<DashView, string> = {
  overview: 'Overview',
  inventory: 'Inventory',
  analytics: 'Analytics',
  activity: 'Activity',
}

const NOTIFS = [
  { id: 1, text: 'New inquiry for BMW M5 Competition', time: '2m ago',  unread: true  },
  { id: 2, text: 'Ferrari Roma marked as sold',         time: '1h ago',  unread: true  },
  { id: 3, text: 'New 5-star review submitted',         time: '3h ago',  unread: false },
  { id: 4, text: 'Range Rover Sport reserved',          time: '5h ago',  unread: false },
]

export function DashTopbar({ onMenuToggle, activeView, searchQuery, onSearch }: DashTopbarProps) {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const unread = NOTIFS.filter(n => n.unread).length

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3 px-5 sticky top-0 z-20 flex-shrink-0">
      {/* Hamburger */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden bg-transparent border-none text-gray-500 dark:text-gray-400 text-xl cursor-pointer p-1.5 hover:text-[#E63946] transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Toggle menu"
      >☰</button>

      {/* Title */}
      <div className="flex-1">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white hidden sm:block">{LABELS[activeView]}</h1>
      </div>

      {/* Search */}
      <div className="relative hidden md:block">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">🔍</span>
        <input
          value={searchQuery}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search…"
          className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-xl pl-9 pr-4 py-2 w-48 focus:w-64 outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all duration-300 placeholder-gray-400"
        />
      </div>

      {/* Theme */}
      <button
        onClick={toggleTheme}
        className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border-none cursor-pointer flex-shrink-0"
        aria-label="Toggle theme"
      >{theme === 'dark' ? '☀️' : '🌙'}</button>

      {/* Notifications */}
      <div className="relative flex-shrink-0">
        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border-none cursor-pointer relative"
          aria-label="Notifications"
        >
          🔔
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E63946] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>
        {open && (
          <div className="absolute right-0 top-12 w-76 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden" style={{ width: '300px' }}>
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <p className="text-sm font-bold text-gray-900 dark:text-white">Notifications</p>
              {unread > 0 && <span className="text-xs bg-[#E63946] text-white px-2 py-0.5 rounded-full font-bold">{unread} new</span>}
            </div>
            {NOTIFS.map(n => (
              <div key={n.id} className={`px-4 py-3.5 border-b border-gray-50 dark:border-gray-800/60 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${n.unread ? 'bg-[#E63946]/5' : ''}`}>
                <div className="flex items-start gap-2">
                  {n.unread && <span className="w-1.5 h-1.5 bg-[#E63946] rounded-full mt-1.5 flex-shrink-0" />}
                  <div>
                    <p className="text-sm text-gray-800 dark:text-gray-200 font-medium leading-snug">{n.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="px-4 py-3 text-center">
              <button onClick={() => setOpen(false)} className="text-xs text-[#E63946] font-semibold hover:underline bg-transparent border-none cursor-pointer">
                Mark all as read
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Avatar */}
      {user && (
        <Link to="/profile" className="flex items-center gap-2.5 no-underline group flex-shrink-0">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-[#E63946] transition-all duration-200"
          />
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#E63946] transition-colors leading-tight">{user.name.split(' ')[0]}</p>
            <p className="text-[10px] text-gray-400">{user.role}</p>
          </div>
        </Link>
      )}
    </header>
  )
}
