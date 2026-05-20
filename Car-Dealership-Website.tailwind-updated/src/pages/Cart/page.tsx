import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

interface LuxuryItem {
  id: number
  name: string
  year: number
  engine: string
  badge: string
  price: number
  img: string
  stock: string
  quantity: number
}

const defaultItems: LuxuryItem[] = [
  {
    id: 101,
    name: 'BMW M4 Competition',
    year: 2024,
    engine: '3.0L Twin-Turbo Inline-6 • 503 HP',
    badge: 'M Series',
    price: 84900,
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    stock: 'In Stock',
    quantity: 1,
  },
  {
    id: 102,
    name: 'Mercedes-Benz AMG GT 63 S',
    year: 2023,
    engine: '4.0L V8 Biturbo • 630 HP',
    badge: 'AMG',
    price: 163500,
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    stock: 'Last Unit',
    quantity: 1,
  },
]

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const [items, setItems] = useState<LuxuryItem[]>(defaultItems)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [checkoutMsg, setCheckoutMsg] = useState(false)

  const updateQty = (id: number, delta: number) => {
    setItems(prev => prev.map(i => {
      if (i.id !== id) return i
      const next = i.quantity + delta
      return next < 1 ? i : { ...i, quantity: next }
    }))
  }

  const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id))

  const priceNum = (p: string) => parseFloat(p.replace(/[^0-9.]/g, '')) || 0

  const luxSubtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const realSubtotal = cart.reduce((s, i) => s + priceNum(i.price) * i.quantity, 0)
  const subtotal = luxSubtotal + realSubtotal
  const discount = promoApplied ? subtotal * 0.05 : 0
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + tax

  const handlePromo = () => {
    if (promoCode.trim().toLowerCase() === 'elite10') setPromoApplied(true)
  }

  const handleCheckout = () => {
    setCheckoutMsg(true)
    setTimeout(() => setCheckoutMsg(false), 3000)
  }

  const allEmpty = items.length === 0 && cart.length === 0

  if (allEmpty) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
        <div className="text-center">
          <div className="w-28 h-28 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
            <span className="text-5xl">🛒</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3 transition-colors duration-300">Cart is Empty</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm transition-colors duration-300">
            Your collection awaits. Browse our exclusive inventory.
          </p>
          <Link
            to="/inventory"
            className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#c62b37] text-white font-bold px-8 py-3.5 rounded-full no-underline transition-all duration-300 hover:shadow-xl hover:shadow-[#E63946]/30 hover:-translate-y-0.5"
          >
            Explore Inventory →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

      {/* Toast */}
      {checkoutMsg && (
        <div className="fixed top-24 right-6 z-50 bg-green-100 dark:bg-green-900/80 border border-green-300 dark:border-green-600 text-green-800 dark:text-green-300 px-6 py-3 rounded-2xl backdrop-blur-sm text-sm font-semibold shadow-xl transition-colors duration-300">
          ✓ Order placed successfully!
        </div>
      )}

      {/* Hero */}
      <div className="bg-[#0f0f0f] dark:bg-black py-14 px-6 text-center transition-colors duration-300">
        <span className="text-[#E63946] text-xs font-bold tracking-[0.3em] uppercase">Your Selection</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-2 tracking-tight">
          Shopping <span className="text-[#E63946]">Cart</span>
        </h1>
        <p className="text-gray-400 text-sm">
          {items.length + cart.length} vehicle{items.length + cart.length !== 1 ? 's' : ''} selected
        </p>
        <div className="w-16 h-px bg-[#E63946] mx-auto mt-4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* ── Left: Cart Items ─────────────────────────────────────────── */}
          <div className="xl:col-span-2 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-900 dark:text-white font-bold text-lg tracking-wide transition-colors duration-300">
                Selected Vehicles
                <span className="ml-2 text-sm text-gray-400 dark:text-gray-500 font-normal">({items.length + cart.length})</span>
              </h2>
              {items.length > 0 && (
                <button
                  onClick={() => setItems([])}
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 px-3 py-1.5 rounded-lg bg-transparent cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Luxury showcase items */}
            {items.map(item => (
              <div
                key={item.id}
                className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-[#E63946]/40 hover:shadow-lg dark:hover:shadow-black/40 transition-all duration-300"
              >
                {/* Red accent line */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#E63946] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="sm:w-56 h-48 sm:h-auto overflow-hidden relative flex-shrink-0">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 bg-[#E63946] text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-wider uppercase">
                      {item.badge}
                    </span>
                    <span className={`absolute bottom-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${
                      item.stock === 'In Stock'
                        ? 'bg-green-100/90 dark:bg-green-900/60 border border-green-400/50 text-green-700 dark:text-green-400'
                        : 'bg-amber-100/90 dark:bg-amber-900/60 border border-amber-400/50 text-amber-700 dark:text-amber-400'
                    } transition-colors duration-300`}>
                      ● {item.stock}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold tracking-widest uppercase mb-1 transition-colors duration-300">{item.year}</p>
                        <h3 className="text-gray-900 dark:text-white font-black text-xl leading-tight transition-colors duration-300">{item.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1.5 flex items-center gap-1.5 transition-colors duration-300">
                          <span className="text-[#E63946]">⚙</span> {item.engine}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex-shrink-0 w-9 h-9 flex items-center justify-center text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all cursor-pointer bg-transparent border-none text-lg"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Qty + Price */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
                      <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1 transition-colors duration-300">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#E63946] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all cursor-pointer text-lg font-bold border-none bg-transparent"
                        >−</button>
                        <span className="w-10 text-center text-sm font-bold text-gray-900 dark:text-white select-none transition-colors duration-300">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#E63946] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all cursor-pointer text-lg font-bold border-none bg-transparent"
                        >+</button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 dark:text-gray-500 transition-colors duration-300">Subtotal</p>
                        <p className="text-2xl font-black text-gray-900 dark:text-white transition-colors duration-300">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 transition-colors duration-300">${item.price.toLocaleString()} per unit</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Real cart items from inventory */}
            {cart.map(item => {
              const price = priceNum(item.price)
              return (
                <div
                  key={item.id}
                  className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-[#E63946]/40 hover:shadow-lg dark:hover:shadow-black/40 transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#E63946] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-40 sm:h-auto overflow-hidden flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[11px] font-bold text-[#E63946] uppercase tracking-wider">{item.category}</span>
                          <h3 className="text-gray-900 dark:text-white font-black text-lg mt-1 transition-colors duration-300">{item.name}</h3>
                          <p className="text-[#E63946] font-black text-xl mt-1">{item.price}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all cursor-pointer bg-transparent border-none text-lg flex-shrink-0"
                        >✕</button>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
                        <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1 transition-colors duration-300">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#E63946] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all cursor-pointer text-lg font-bold border-none bg-transparent">−</button>
                          <span className="w-10 text-center text-sm font-bold text-gray-900 dark:text-white transition-colors duration-300">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#E63946] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all cursor-pointer text-lg font-bold border-none bg-transparent">+</button>
                        </div>
                        <p className="text-xl font-black text-gray-900 dark:text-white transition-colors duration-300">${(price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            <Link to="/inventory" className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 hover:text-[#E63946] transition-colors no-underline w-fit mt-2">
              ← Continue Browsing
            </Link>
          </div>

          {/* ── Right: Order Summary ────────────────────────────────────── */}
          <div className="xl:col-span-1">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sticky top-24 transition-colors duration-300 shadow-sm dark:shadow-none">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
                <div className="w-10 h-10 bg-[#E63946]/10 border border-[#E63946]/20 rounded-xl flex items-center justify-center text-lg">🧾</div>
                <div>
                  <h2 className="text-gray-900 dark:text-white font-bold text-base transition-colors duration-300">Order Summary</h2>
                  <p className="text-gray-400 dark:text-gray-500 text-xs transition-colors duration-300">Price breakdown</p>
                </div>
              </div>

              {/* Item list */}
              <div className="space-y-3 mb-5">
                {items.map(i => (
                  <div key={i.id} className="flex justify-between text-sm gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 dark:text-gray-300 font-medium truncate transition-colors duration-300">{i.name}</p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs transition-colors duration-300">× {i.quantity}</p>
                    </div>
                    <span className="text-gray-900 dark:text-white font-semibold flex-shrink-0 transition-colors duration-300">
                      ${(i.price * i.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                {cart.map(i => {
                  const p = priceNum(i.price)
                  return (
                    <div key={i.id} className="flex justify-between text-sm gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-700 dark:text-gray-300 font-medium truncate transition-colors duration-300">{i.name.split(' ').slice(0, 3).join(' ')}</p>
                        <p className="text-gray-400 dark:text-gray-500 text-xs transition-colors duration-300">× {i.quantity}</p>
                      </div>
                      <span className="text-gray-900 dark:text-white font-semibold flex-shrink-0 transition-colors duration-300">
                        ${(p * i.quantity).toLocaleString()}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Promo Code */}
              <div className="mb-5">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-2 transition-colors duration-300">Promo Code</p>
                <div className="flex gap-2">
                  <input
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    placeholder="e.g. ELITE10"
                    disabled={promoApplied}
                    className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-3 py-2 text-sm outline-none focus:border-[#E63946] placeholder-gray-400 dark:placeholder-gray-600 disabled:opacity-50 transition-colors duration-300"
                  />
                  <button
                    onClick={handlePromo}
                    disabled={promoApplied}
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-xs font-bold px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-200 disabled:opacity-50"
                  >
                    {promoApplied ? '✓' : 'Apply'}
                  </button>
                </div>
                {promoApplied && <p className="text-green-600 dark:text-green-400 text-xs mt-1.5 font-medium transition-colors duration-300">✓ 5% discount applied</p>}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-3 mb-6 transition-colors duration-300">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 transition-colors duration-300">Subtotal</span>
                  <span className="text-gray-900 dark:text-white font-medium transition-colors duration-300">${subtotal.toLocaleString()}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 dark:text-green-400 transition-colors duration-300">Discount (5%)</span>
                    <span className="text-green-600 dark:text-green-400 font-medium transition-colors duration-300">−${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 transition-colors duration-300">Est. Tax (8%)</span>
                  <span className="text-gray-900 dark:text-white font-medium transition-colors duration-300">${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 transition-colors duration-300">Delivery</span>
                  <span className="text-green-600 dark:text-green-400 font-semibold transition-colors duration-300">Free</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
                  <span className="text-gray-900 dark:text-white font-bold text-base transition-colors duration-300">Grand Total</span>
                  <span className="text-[#E63946] font-black text-2xl">${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-[#E63946] hover:bg-[#c62b37] text-white font-black py-4 rounded-xl text-sm transition-all duration-300 border-none cursor-pointer hover:shadow-xl hover:shadow-[#E63946]/30 hover:-translate-y-0.5 tracking-wide uppercase mb-4"
              >
                Proceed to Checkout →
              </button>

              {/* Trust Badges */}
              <div className="space-y-2.5 pt-4 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
                {[
                  { icon: '🔒', text: 'Secure 256-bit SSL Checkout' },
                  { icon: '↩️', text: '7-Day Return Policy' },
                  { icon: '✅', text: '100% Authentic Vehicles' },
                  { icon: '💎', text: 'Premium Concierge Service' },
                ].map(b => (
                  <div key={b.text} className="flex items-center gap-2.5">
                    <span className="text-sm">{b.icon}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 transition-colors duration-300">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
