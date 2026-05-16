import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="flex justify-between items-center bg-[#1A1A1A] px-6 py-4 sticky top-0 z-[100]">
      <Link to="/" className="text-2xl font-bold text-white no-underline">
        Elite<span className="text-[#E63946]">Auto</span>
      </Link>

      <button
        className="md:hidden bg-transparent border border-white text-white text-2xl cursor-pointer px-2 py-1 rounded ml-2"
        onClick={() => setMenuOpen(!menuOpen)}
      >☰</button>

      <ul className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row list-none m-0 p-0 items-center gap-5
        max-md:absolute max-md:top-full max-md:left-0 max-md:w-full max-md:bg-[#1A1A1A] max-md:py-5 max-md:px-0`}>
        <li className="max-md:w-full max-md:text-center max-md:py-2.5">
          <Link to="/" className="text-white no-underline font-medium hover:text-[#E63946] transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li className="max-md:w-full max-md:text-center max-md:py-2.5">
          <Link to="/dashboard" className="text-white no-underline font-medium hover:text-[#E63946] transition-colors" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        </li>
        <li className="max-md:w-full max-md:text-center max-md:py-2.5">
          <Link to="/services" className="text-white no-underline font-medium hover:text-[#E63946] transition-colors" onClick={() => setMenuOpen(false)}>Services</Link>
        </li>
        <li className="max-md:w-full max-md:text-center max-md:py-2.5">
          <Link to="/contact" className="text-white no-underline font-medium hover:text-[#E63946] transition-colors" onClick={() => setMenuOpen(false)}>Contact</Link>
        </li>
        <li className="relative group max-md:w-full max-md:text-center max-md:py-2.5">
          <a href="#" className="text-white no-underline font-medium hover:text-[#E63946] transition-colors">Account ▼</a>
          <div className="hidden group-hover:flex absolute top-full left-0 bg-white shadow-md rounded-md min-w-[150px] flex-col z-50
            max-md:static max-md:shadow-none max-md:bg-[#333333]">
            <Link to="/login" className="px-4 py-3 text-gray-900 no-underline hover:bg-gray-50 hover:text-[#E63946] block max-md:text-white max-md:hover:bg-[#1A1A1A]" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/signup" className="px-4 py-3 text-gray-900 no-underline hover:bg-gray-50 hover:text-[#E63946] block max-md:text-white max-md:hover:bg-[#1A1A1A]" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
