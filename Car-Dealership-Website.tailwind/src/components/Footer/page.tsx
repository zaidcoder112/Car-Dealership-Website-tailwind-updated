import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white px-5 pt-10 pb-5 mt-auto">
      <div className="flex flex-wrap justify-between gap-8 max-w-[1200px] mx-auto">
        <div className="flex-1 min-w-[250px]">
          <h2 className="text-white mb-4 text-2xl">Elite<span className="text-[#E63946]">Auto</span></h2>
          <p className="text-[#D1D5DB] text-sm leading-relaxed mb-2">
            Your trusted partner for premium cars. Visit us to find the perfect vehicle for your lifestyle.
          </p>
        </div>
        <div className="flex-1 min-w-[250px]">
          <h3 className="text-white mb-4 text-lg">Quick Links</h3>
          <Link to="/" className="text-[#D1D5DB] no-underline block mb-2 hover:text-white transition-colors text-sm">Home</Link>
          <Link to="/services" className="text-[#D1D5DB] no-underline block mb-2 hover:text-white transition-colors text-sm">Services</Link>
          <Link to="/contact" className="text-[#D1D5DB] no-underline block mb-2 hover:text-white transition-colors text-sm">Contact Us</Link>
          <Link to="/login" className="text-[#D1D5DB] no-underline block mb-2 hover:text-white transition-colors text-sm">Login</Link>
        </div>
        <div className="flex-1 min-w-[250px]">
          <h3 className="text-white mb-4 text-lg">Contact Info</h3>
          <p className="text-[#D1D5DB] text-sm mb-1">Email: info@eliteauto.com</p>
          <p className="text-[#D1D5DB] text-sm mb-1">Phone: +1 (555) 123-4567</p>
          <p className="text-[#D1D5DB] text-sm mb-1">Location: 123 Car Ave, Auto City</p>
        </div>
      </div>
      <div className="text-center pt-5 mt-5 border-t border-gray-700">
        <p className="text-[#D1D5DB] text-sm">© 2026 Elite Auto Deals. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
