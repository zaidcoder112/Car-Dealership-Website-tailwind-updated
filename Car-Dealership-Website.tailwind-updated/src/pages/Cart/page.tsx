import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const priceNum = (p: string) => parseFloat(p.replace(/[^0-9.]/g, '')) || 0

  const subtotal = cart.reduce((sum, item) => sum + priceNum(item.price) * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.05 : 0
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + tax

  const handlePromo = () => {
    if (promoCode.trim().toLowerCase() === 'elite10') setPromoApplied(true)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
        <div className="text-center max-w-sm">
          <div className="w-28 h-28 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <span className="text-5xl">🛒</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Cart is Empty</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm leading-relaxed">
            You haven't added any vehicles yet. Browse our premium collection to find your dream car.
          </p>
          <Link
            to="/inventory"
            className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#c62b37] text-white font-bold px-8 py-3.5 rounded-full no-underline transition-all duration-200 hover:shadow-lg hover:shadow-[#E63946]/30 hover:-translate-y-0.5"
          >
            Browse Inventory →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Header */}
      <div className="bg-[#0f0f0f] py-12 px-6 text-center">
        <span className="text-[#E63946] text-xs font-semibold tracking-widest uppercase">Your Selection</span>
        <h1 className="text-4xl font-black text-white mt-2 mb-2">Shopping Cart</h1>
        <p className="text-gray-400 text-sm">
          {cart.reduce((s, i) => s + i.quantity, 0)} item{cart.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''} selected
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-white">{cart.length}</span> vehicle{cart.length !== 1 ? 's' : ''} in cart
          </p>
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-700 border border-red-200 dark:border-red-800 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all cursor-pointer font-medium flex items-center gap-2"
          >
            🗑️ Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => {
              const itemPrice = priceNum(item.price)
              const itemTotal = itemPrice * item.quantity
              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Car Image */}
                    <div className="sm:w-44 h-40 sm:h-auto overflow-hidden flex-shrink-0 relative">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-bold text-[#E63946] uppercase tracking-wider">
                            {item.category}
                          </span>
                          <h3 className="text-gray-900 dark:text-white font-bold text-lg mt-1 leading-tight">
                            {item.name}
                          </h3>
                          <p className="text-[#E63946] font-black text-xl mt-1">{item.price}</p>
                          <p className="text-xs text-gray-400 mt-0.5">Base price per unit</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all cursor-pointer bg-transparent border-none text-base"
                          title="Remove"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Quantity + Subtotal */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                        {/* Qty Controls */}
                        <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#E63946] hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all cursor-pointer text-lg font-bold border-none bg-transparent"
                          >
                            −
                          </button>
                          <span className="w-10 text-center text-sm font-bold text-gray-900 dark:text-white select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#E63946] hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all cursor-pointer text-lg font-bold border-none bg-transparent"
                          >
                            +
                          </button>
                        </div>

                        {/* Item Subtotal */}
                        <div className="text-right">
                          <p className="text-xs text-gray-400">Subtotal</p>
                          <p className="font-black text-gray-900 dark:text-white text-xl">
                            ${itemTotal.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Continue Shopping */}
            <Link
              to="/inventory"
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#E63946] transition-colors no-underline w-fit"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 pb-4 border-b border-gray-100 dark:border-gray-800">
                Order Summary
              </h2>

              {/* Item list */}
              <div className="space-y-3 mb-5">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-start text-sm gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 dark:text-gray-300 truncate font-medium">
                        {item.name.split(' ').slice(0, 3).join(' ')}
                      </p>
                      <p className="text-xs text-gray-400">× {item.quantity}</p>
                    </div>
                    <span className="text-gray-900 dark:text-white font-semibold flex-shrink-0">
                      ${(priceNum(item.price) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Promo Code</p>
                <div className="flex gap-2">
                  <input
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    placeholder="e.g. ELITE10"
                    disabled={promoApplied}
                    className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-3 py-2 text-sm outline-none focus:border-[#E63946] transition-all placeholder-gray-400 disabled:opacity-50"
                  />
                  <button
                    onClick={handlePromo}
                    disabled={promoApplied}
                    className="bg-gray-900 dark:bg-gray-700 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors border-none cursor-pointer disabled:opacity-50"
                  >
                    {promoApplied ? '✓' : 'Apply'}
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-green-500 text-xs mt-1.5 font-medium">✓ 5% discount applied!</p>
                )}
              </div>

              {/* Price breakdown */}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2.5 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                  <span className="text-gray-900 dark:text-white font-medium">${subtotal.toLocaleString()}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-500">Discount (5%)</span>
                    <span className="text-green-500 font-medium">−${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Est. Tax (8%)</span>
                  <span className="text-gray-900 dark:text-white font-medium">${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-gray-900 dark:text-white font-bold">Total</span>
                  <span className="text-[#E63946] font-black text-2xl">${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-[#E63946] hover:bg-[#c62b37] text-white font-bold py-3.5 rounded-xl transition-all duration-200 border-none cursor-pointer text-sm hover:shadow-lg hover:shadow-[#E63946]/30 hover:-translate-y-0.5 mb-3">
                Proceed to Checkout →
              </button>

              {/* Trust badges */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
                {[
                  { icon: '🔒', text: 'Secure 256-bit SSL Checkout' },
                  { icon: '🚗', text: 'Free Delivery Consultation' },
                  { icon: '💳', text: 'Flexible Financing Available' },
                  { icon: '↩️', text: '14-Day Return Policy' },
                ].map(f => (
                  <p key={f.text} className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-2">
                    <span>{f.icon}</span>
                    <span>{f.text}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
