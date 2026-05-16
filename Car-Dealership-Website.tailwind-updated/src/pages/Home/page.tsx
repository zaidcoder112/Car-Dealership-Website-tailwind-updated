import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const featuredCars = [
  { id: 1, name: 'Mercedes-Benz S-Class', price: '$89,500', category: 'Luxury Sedan', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80', badge: 'Featured' },
  { id: 2, name: 'BMW M5 Competition', price: '$105,000', category: 'Sports Sedan', img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80', badge: 'New' },
  { id: 3, name: 'Porsche 911 Turbo S', price: '$215,000', category: 'Sports Car', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80', badge: 'Hot' },
  { id: 4, name: 'Range Rover Sport', price: '$78,000', category: 'Luxury SUV', img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80', badge: 'Popular' },
  { id: 5, name: 'Audi RS e-tron GT', price: '$145,000', category: 'Electric', img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80', badge: 'Electric' },
  { id: 6, name: 'Ferrari Roma', price: '$245,000', category: 'Supercar', img: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=600&q=80', badge: 'Exclusive' },
]

const stats = [
  { value: '2,500+', label: 'Cars Sold' },
  { value: '15+', label: 'Years Experience' },
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '50+', label: 'Luxury Brands' },
]

const badgeColor: Record<string, string> = {
  Featured: 'bg-blue-600',
  New: 'bg-green-600',
  Hot: 'bg-red-600',
  Popular: 'bg-purple-600',
  Electric: 'bg-teal-600',
  Exclusive: 'bg-amber-600',
}

export default function Home() {
  const { addToCart, cart } = useCart()

  const isInCart = (id: number) => cart.some(c => c.id === id)

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0f0f0f]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0f0f]/60 to-[#0f0f0f]" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <span className="inline-block bg-[#E63946]/20 border border-[#E63946]/40 text-[#E63946] text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
            Premium Car Dealership
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Drive Your <br />
            <span className="text-[#E63946]">Dream Car</span> Today
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover an unmatched selection of luxury, sports, and electric vehicles — 
            curated for the discerning driver.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/inventory"
              className="bg-[#E63946] hover:bg-[#c62b37] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 no-underline text-base shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-0.5 active:translate-y-0"
            >
              Browse Inventory
            </Link>
            <Link
              to="/about"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 no-underline text-base border border-white/20 hover:border-white/40"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs animate-bounce">
          <span>Scroll</span>
          <span>↓</span>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-[#E63946] py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-black text-white mb-1">{s.value}</p>
              <p className="text-red-100 text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Cars ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#E63946] text-xs font-semibold tracking-widest uppercase">Our Collection</span>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mt-2">Featured Vehicles</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
            Hand-picked premium vehicles awaiting their next owner
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map(car => (
            <div
              key={car.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={car.img}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 left-3 ${badgeColor[car.badge]} text-white text-[11px] font-bold px-3 py-1 rounded-full`}>
                  {car.badge}
                </span>
              </div>
              <div className="p-5">
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{car.category}</span>
                <h3 className="text-gray-900 dark:text-white font-bold text-lg mt-0.5 mb-3">{car.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[#E63946] font-black text-xl">{car.price}</span>
                  <button
                    onClick={() => addToCart({ id: car.id, name: car.name, price: car.price, category: car.category, img: car.img })}
                    disabled={isInCart(car.id)}
                    className={`text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 border-none cursor-pointer ${
                      isInCart(car.id)
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-[#E63946] hover:bg-[#c62b37] text-white'
                    }`}
                  >
                    {isInCart(car.id) ? '✓ Added' : '+ Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/inventory"
            className="inline-block bg-transparent border-2 border-[#E63946] text-[#E63946] hover:bg-[#E63946] hover:text-white font-bold px-10 py-3.5 rounded-full transition-all duration-300 no-underline"
          >
            View All Inventory →
          </Link>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#E63946] text-xs font-semibold tracking-widest uppercase">Why EliteAuto</span>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mt-2">The EliteAuto Advantage</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🏆', title: 'Certified Quality', desc: 'Every vehicle undergoes a rigorous 150-point inspection before reaching our showroom floor.' },
              { icon: '💰', title: 'Best Financing', desc: 'Flexible financing options with competitive rates tailored to your budget and credit profile.' },
              { icon: '🔧', title: 'Lifetime Support', desc: 'Complimentary maintenance consultations and priority service scheduling for every buyer.' },
            ].map(f => (
              <div key={f.title} className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 text-center hover:shadow-lg transition-shadow duration-300">
                <span className="text-5xl block mb-4">{f.icon}</span>
                <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-3">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#E63946] to-[#c62b37] text-center">
        <h2 className="text-4xl font-black text-white mb-4">Ready to Find Your Perfect Car?</h2>
        <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
          Browse our full inventory or get in touch with our expert team today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/inventory" className="bg-white text-[#E63946] font-bold px-8 py-4 rounded-full no-underline hover:bg-gray-100 transition-colors duration-200">
            Browse Now
          </Link>
          <Link to="/contact" className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full no-underline hover:bg-white/10 transition-colors duration-200">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
