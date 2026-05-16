import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { isLoggedIn, user, logout } = useAuth()
  const { cart } = useCart()
  const navigate = useNavigate()

  const close = () => setMenuOpen(false)

  const handleLogout = () => {
    logout()
    close()
    navigate('/')
  }

  const linkCls =
    'text-white no-underline font-medium hover:text-[#E63946] transition-colors text-sm tracking-wide'
  const mobileLinkCls =
    'w-full text-center py-2.5 text-white no-underline font-medium hover:text-[#E63946] transition-colors block'

  return (
    <nav className="flex justify-between items-center bg-[#0f0f0f] dark:bg-[#0a0a0a] border-b border-white/5 px-6 py-4 sticky top-0 z-[100] backdrop-blur-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold text-white no-underline tracking-tight" onClick={close}>
        Elite<span className="text-[#E63946]">Auto</span>
      </Link>

      {/* Hamburger */}
      <button
        className="md:hidden bg-transparent border border-white/20 text-white text-xl cursor-pointer px-2.5 py-1 rounded-md ml-2 hover:border-[#E63946] transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Nav Links */}
      <ul
        className={`${
          menuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row list-none m-0 p-0 items-center gap-1 md:gap-2
          max-md:absolute max-md:top-full max-md:left-0 max-md:w-full max-md:bg-[#0f0f0f] max-md:py-4 max-md:px-0 max-md:border-t max-md:border-white/10`}
      >
        <li className="max-md:w-full max-md:text-center max-md:py-1 px-3">
          <Link to="/" className={`${linkCls} max-md:${mobileLinkCls}`} onClick={close}>Home</Link>
        </li>
        <li className="max-md:w-full max-md:text-center max-md:py-1 px-3">
          <Link to="/inventory" className={`${linkCls} max-md:${mobileLinkCls}`} onClick={close}>Inventory</Link>
        </li>
        <li className="max-md:w-full max-md:text-center max-md:py-1 px-3">
          <Link to="/dashboard" className={`${linkCls} max-md:${mobileLinkCls}`} onClick={close}>Dashboard</Link>
        </li>
        <li className="max-md:w-full max-md:text-center max-md:py-1 px-3">
          <Link to="/services" className={`${linkCls} max-md:${mobileLinkCls}`} onClick={close}>Services</Link>
        </li>
        <li className="max-md:w-full max-md:text-center max-md:py-1 px-3">
          <Link to="/reviews" className={`${linkCls} max-md:${mobileLinkCls}`} onClick={close}>Reviews</Link>
        </li>
        <li className="max-md:w-full max-md:text-center max-md:py-1 px-3">
          <Link to="/about" className={`${linkCls} max-md:${mobileLinkCls}`} onClick={close}>About</Link>
        </li>
        <li className="max-md:w-full max-md:text-center max-md:py-1 px-3">
          <Link to="/contact" className={`${linkCls} max-md:${mobileLinkCls}`} onClick={close}>Contact</Link>
        </li>

        {/* Cart */}
        <li className="max-md:w-full max-md:text-center max-md:py-1 px-3">
          <Link to="/cart" className="relative text-white hover:text-[#E63946] transition-colors" onClick={close}>
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#E63946] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </li>

        {/* Theme toggle */}
        <li className="max-md:w-full max-md:text-center max-md:py-1 px-2">
          <button
            onClick={toggleTheme}
            className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1.5 rounded-full border border-white/20 cursor-pointer transition-all"
            aria-label="Toggle dark/light mode"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </li>

        {/* Account */}
        {isLoggedIn ? (
          <li className="relative group max-md:w-full max-md:text-center max-md:py-1 px-2">
            <button className="text-white font-medium text-sm bg-[#E63946] px-3 py-1.5 rounded-full cursor-pointer hover:bg-[#c62b37] transition-colors border-none flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
              {user?.name?.split(' ')[0]} ▾
            </button>
            <div className="hidden group-hover:flex absolute top-full right-0 bg-white dark:bg-gray-900 shadow-xl rounded-xl min-w-[160px] flex-col z-50 border border-gray-100 dark:border-gray-700 overflow-hidden mt-1">
              <Link to="/profile" className="px-4 py-3 text-gray-900 dark:text-gray-100 no-underline hover:bg-gray-50 dark:hover:bg-gray-800 text-sm transition-colors block" onClick={close}>👤 Profile</Link>
              <Link to="/dashboard" className="px-4 py-3 text-gray-900 dark:text-gray-100 no-underline hover:bg-gray-50 dark:hover:bg-gray-800 text-sm transition-colors block" onClick={close}>📊 Dashboard</Link>
              <button onClick={handleLogout} className="px-4 py-3 text-red-600 text-left hover:bg-red-50 dark:hover:bg-red-900/20 text-sm transition-colors border-none bg-transparent cursor-pointer border-t border-gray-100 dark:border-gray-700 w-full">🚪 Logout</button>
            </div>
          </li>
        ) : (
          <li className="relative group max-md:w-full max-md:text-center max-md:py-1 px-2">
            <button className="text-white font-medium text-sm bg-white/10 px-3 py-1.5 rounded-full cursor-pointer hover:bg-white/20 transition-colors border border-white/20">
              Account ▾
            </button>
            <div className="hidden group-hover:flex absolute top-full right-0 bg-white dark:bg-gray-900 shadow-xl rounded-xl min-w-[150px] flex-col z-50 border border-gray-100 dark:border-gray-700 overflow-hidden mt-1">
              <Link to="/login" className="px-4 py-3 text-gray-900 dark:text-gray-100 no-underline hover:bg-gray-50 dark:hover:bg-gray-800 text-sm transition-colors block" onClick={close}>Login</Link>
              <Link to="/register" className="px-4 py-3 text-gray-900 dark:text-gray-100 no-underline hover:bg-gray-50 dark:hover:bg-gray-800 text-sm transition-colors block" onClick={close}>Register</Link>
            </div>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
