import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar/page'
import Footer from './components/Footer/page'
import Login from './pages/Login/page'
import Signup from './pages/Signup/page'
import Dashboard from './pages/Dashboard/page'
import Services from './pages/Services/page'
import Contact from './pages/Contact/page'
import Inventory from './pages/Inventory/page'

// ── HOME PAGE ──────────────────────────────────────────────
function Home() {
  const [cart, setCart] = useState<{ name: string; price: string }[]>([])
  const [categoryFilter, setCategoryFilter] = useState('')
  const [priceFilter, setPriceFilter] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  const vehicles = [
    { name: '2026 Phantom RS', price: '$89,900', category: 'Sports',  img: '/images/image1.png', desc: 'Experience the thrill of a sleek modern sports car with unmatched performance.' },
    { name: '2026 Summit LX',  price: '$75,500', category: 'SUV',     img: '/images/image2.png', desc: 'A luxurious modern SUV designed for comfort, space, and off-road capability.' },
    { name: '2026 Voltora EV', price: '$54,200', category: 'Electric',img: '/images/image3.png', desc: 'A futuristic electric sedan offering a range of 400 miles and zero emissions.' },
  ]

  const filtered = vehicles.filter(v => {
    const matchCat    = categoryFilter === '' || v.category.toLowerCase().includes(categoryFilter.toLowerCase())
    const matchSearch = searchFilter   === '' || v.name.toLowerCase().includes(searchFilter.toLowerCase())
    const numericPrice = parseFloat(v.price.replace(/[$,]/g, ''))
    const matchPrice  = priceFilter === '' || numericPrice <= parseFloat(priceFilter)
    return matchCat && matchSearch && matchPrice
  })

  const addToCart    = (v: { name: string; price: string }) => setCart(prev => [...prev, v])
  const removeFromCart = (i: number) => setCart(prev => prev.filter((_, idx) => idx !== i))

  const inputCls = "w-full p-2.5 border border-gray-200 rounded-md bg-white text-gray-900 focus:outline-none focus:border-[#E63946] transition-all"

  return (
    <div className="px-5 py-10 max-w-[1200px] mx-auto flex-1 w-full box-border flex flex-col gap-5">

      {/* HERO */}
      <div className="text-center py-16 px-5 bg-gradient-to-br from-[#1A1A1A] to-[#333333] text-white rounded-xl mb-5">
        <h1 className="text-white text-4xl mb-4">Find Your Dream Car Today</h1>
        <p className="text-[#D1D5DB] leading-relaxed mb-6">
          Explore our premium selection of luxury and standard vehicles at unbeatable prices.
        </p>
        <a href="#inventory"
          className="inline-block bg-[#1A1A1A] text-white no-underline px-7 py-3.5 rounded-md font-semibold text-lg hover:bg-[#E63946] transition-colors">
          Browse Inventory
        </a>
      </div>

      {/* SEARCH */}
      <div className="flex flex-col gap-2.5 my-2.5">
        <input type="text"   placeholder="Search by category"     value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className={inputCls} />
        <input type="number" placeholder="Max price (e.g. 80000)" value={priceFilter}    onChange={e => setPriceFilter(e.target.value)}    className={inputCls} />
        <input type="text"   placeholder="Advanced search"        value={searchFilter}   onChange={e => setSearchFilter(e.target.value)}   className={inputCls} />
      </div>

      {/* INVENTORY */}
      <h2 id="inventory" className="text-3xl mb-3">Our Featured Vehicles</h2>
      <div className="flex flex-wrap justify-center gap-5 my-9 mx-3">
        {filtered.length === 0 && <p className="text-center text-gray-400">No vehicles match your search.</p>}
        {filtered.map((v, i) => (
          <div key={i}
            className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 transition-all max-w-[350px] flex-[1_1_300px]">
            <img src={v.img} alt={v.name} className="w-full h-[200px] object-cover rounded-t-xl bg-gray-50" />
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-xl mb-1">{v.name}</h3>
              <div className="text-xl font-bold text-[#E63946] mb-2">{v.price}</div>
              <p className="text-gray-600 leading-relaxed mb-3">{v.desc}</p>
              <button onClick={() => addToCart(v)}
                className="self-start bg-[#E63946] text-white border-none rounded-md px-3 py-1.5 text-sm font-semibold cursor-pointer hover:bg-[#1A1A1A] transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CART */}
      <div className="p-4 bg-gray-50 mt-5 rounded-xl border border-gray-200">
        <h3 className="text-xl mb-3">Cart View</h3>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is currently empty</p>
        ) : (
          <ul className="list-none p-0 m-2.5">
            {cart.map((item, i) => (
              <li key={i} className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700">{item.name} — {item.price}</span>
                <button onClick={() => removeFromCart(i)}
                  className="bg-[#E63946] text-white border-none rounded-md px-3 py-1.5 text-sm font-semibold cursor-pointer hover:bg-[#1A1A1A] transition-colors">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#333333] text-white rounded-xl px-8 py-12 text-center mt-4">
        <h2 className="text-white text-3xl mb-3">Ready to Find Your Perfect Car?</h2>
        <p className="text-[#ccc] leading-relaxed mb-6">
          Our experts are here to help you choose the right vehicle for your lifestyle and budget.
        </p>
        <Link to="/contact"
          className="inline-block bg-[#1A1A1A] text-white no-underline px-7 py-3.5 rounded-md font-semibold text-lg hover:bg-[#E63946] transition-colors">
          Contact Us Now
        </Link>
      </div>

    </div>
  )
}

// ── APP (ROUTER) ───────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
        <Navbar />
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/signup"    element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/services"  element={<Services />} />
          <Route path="/contact"   element={<Contact />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
