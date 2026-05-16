import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart()

  const total = cart.reduce((sum, item) => {
    const num = parseFloat(item.price.replace(/[^0-9.]/g, ''))
    return sum + (isNaN(num) ? 0 : num)
  }, 0)

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
        <div className="text-center">
          <span className="text-8xl block mb-5">🛒</span>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Your cart is empty</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Add some vehicles to get started.</p>
          <Link to="/inventory"
            className="bg-[#E63946] hover:bg-[#c62b37] text-white font-bold px-8 py-3.5 rounded-full no-underline transition-colors text-sm inline-block">
            Browse Inventory →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Shopping Cart</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{cart.length} vehicle{cart.length !== 1 ? 's' : ''} selected</p>
          </div>
          <button onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-700 border border-red-200 dark:border-red-800 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 transition-colors cursor-pointer font-medium">
            🗑️ Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 flex gap-4 items-start hover:shadow-md transition-shadow">
                <img src={item.img} alt={item.name}
                  className="w-24 h-20 object-cover rounded-xl flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-gray-400 font-medium">{item.category}</span>
                  <h3 className="text-gray-900 dark:text-white font-bold text-base mt-0.5 truncate">{item.name}</h3>
                  <p className="text-[#E63946] font-black text-lg mt-1">{item.price}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 bg-transparent border-none cursor-pointer text-xl flex-shrink-0 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 sticky top-24">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5">
                {cart.map((item, idx) => (
                  <div key={`sum-${item.id}-${idx}`} className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400 truncate pr-2">{item.name.split(' ').slice(0, 2).join(' ')}</span>
                    <span className="text-gray-900 dark:text-white font-semibold flex-shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mb-5">
                <div className="flex justify-between">
                  <span className="text-gray-900 dark:text-white font-bold">Total</span>
                  <span className="text-[#E63946] font-black text-xl">${total.toLocaleString()}</span>
                </div>
              </div>
              <button className="w-full bg-[#E63946] hover:bg-[#c62b37] text-white font-bold py-3.5 rounded-xl transition-colors border-none cursor-pointer text-sm mb-3">
                Proceed to Checkout →
              </button>
              <Link to="/inventory"
                className="block text-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 no-underline transition-colors">
                ← Continue Shopping
              </Link>
              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
                {['🔒 Secure Checkout', '🚗 Free Delivery Consultation', '💳 Flexible Financing'].map(f => (
                  <p key={f} className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">{f}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
