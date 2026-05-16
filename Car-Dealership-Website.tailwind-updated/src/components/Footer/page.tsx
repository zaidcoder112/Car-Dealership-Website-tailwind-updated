import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-[#0f0f0f] dark:bg-[#0a0a0a] text-white border-t border-white/5 px-5 pt-12 pb-6 mt-auto">
      <div className="max-w-[1200px] mx-auto">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-extrabold mb-3 tracking-tight">
              Elite<span className="text-[#E63946]">Auto</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your trusted partner for premium vehicles. We offer luxury cars, financing, and world-class service — all under one roof.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { label: 'Facebook', icon: '📘', href: '#' },
                { label: 'Twitter', icon: '🐦', href: '#' },
                { label: 'Instagram', icon: '📸', href: '#' },
                { label: 'LinkedIn', icon: '💼', href: '#' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#E63946] transition-colors text-base"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide uppercase text-xs">Quick Links</h3>
            <ul className="list-none p-0 m-0 space-y-2">
              {[
                { to: '/',          label: 'Home' },
                { to: '/inventory', label: 'Inventory' },
                { to: '/services',  label: 'Services' },
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/about',     label: 'About Us' },
                { to: '/contact',   label: 'Contact' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 no-underline text-sm hover:text-white hover:pl-1 transition-all block"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide uppercase text-xs">Account</h3>
            <ul className="list-none p-0 m-0 space-y-2">
              {[
                { to: '/login',    label: 'Login' },
                { to: '/register', label: 'Register' },
                { to: '/profile',  label: 'My Profile' },
                { to: '/cart',     label: 'Shopping Cart' },
                { to: '/reviews',  label: 'Reviews' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 no-underline text-sm hover:text-white hover:pl-1 transition-all block"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide uppercase text-xs">Contact Info</h3>
            <ul className="list-none p-0 m-0 space-y-3">
              <li className="flex items-start gap-2.5 text-gray-400 text-sm">
                <span className="text-[#E63946] mt-0.5">📍</span>
                <span>123 Car Ave, Auto City, AC 12345</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 text-sm">
                <span className="text-[#E63946]">📞</span>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 text-sm">
                <span className="text-[#E63946]">✉️</span>
                <span>info@eliteauto.com</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 text-sm">
                <span className="text-[#E63946]">🕐</span>
                <span>Mon – Sat: 9 AM – 7 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-sm">© 2026 EliteAuto Deals. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors no-underline">Privacy Policy</a>
            <a href="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors no-underline">Terms of Service</a>
            <a href="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors no-underline">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
