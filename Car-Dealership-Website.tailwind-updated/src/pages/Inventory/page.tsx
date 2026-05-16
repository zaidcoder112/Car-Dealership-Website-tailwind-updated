import { useState } from 'react'
import { useCart } from '../../context/CartContext'

type Car = { id: number; name: string; brand: string; category: string; price: string; year: number; mileage: string; fuel: string; color: string; img: string; badge?: string }

const cars: Car[] = [
  { id: 1, name: 'Mercedes-Benz S-Class', brand: 'Mercedes-Benz', category: 'Luxury Sedan', price: '$89,500', year: 2024, mileage: '0 km', fuel: 'Petrol', color: 'Obsidian Black', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80', badge: 'New' },
  { id: 2, name: 'BMW M5 Competition', brand: 'BMW', category: 'Sports Sedan', price: '$105,000', year: 2024, mileage: '1,200 km', fuel: 'Petrol', color: 'Marina Bay Blue', img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80', badge: 'Hot' },
  { id: 3, name: 'Porsche 911 Turbo S', brand: 'Porsche', category: 'Sports Car', price: '$215,000', year: 2023, mileage: '500 km', fuel: 'Petrol', color: 'GT Silver', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80', badge: 'Premium' },
  { id: 4, name: 'Range Rover Sport', brand: 'Land Rover', category: 'Luxury SUV', price: '$78,000', year: 2024, mileage: '0 km', fuel: 'Hybrid', color: 'Carpathian Grey', img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80' },
  { id: 5, name: 'Audi RS e-tron GT', brand: 'Audi', category: 'Electric', price: '$145,000', year: 2024, mileage: '0 km', fuel: 'Electric', color: 'Tactil Green', img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80', badge: 'Electric' },
  { id: 6, name: 'Ferrari Roma', brand: 'Ferrari', category: 'Supercar', price: '$245,000', year: 2023, mileage: '200 km', fuel: 'Petrol', color: 'Rosso Corsa', img: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=600&q=80', badge: 'Exclusive' },
  { id: 7, name: 'Lamborghini Urus', brand: 'Lamborghini', category: 'Luxury SUV', price: '$228,000', year: 2024, mileage: '0 km', fuel: 'Petrol', color: 'Arancio Borealis', img: 'https://images.unsplash.com/photo-1608891428083-9e5e3e0e6a62?w=600&q=80', badge: 'New' },
  { id: 8, name: 'Tesla Model S Plaid', brand: 'Tesla', category: 'Electric', price: '$89,990', year: 2024, mileage: '0 km', fuel: 'Electric', color: 'Midnight Silver', img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80' },
  { id: 9, name: 'Bentley Continental GT', brand: 'Bentley', category: 'Luxury Coupe', price: '$310,000', year: 2023, mileage: '800 km', fuel: 'Petrol', color: 'Beluga', img: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&q=80', badge: 'Exclusive' },
]

const badgeColor: Record<string, string> = {
  New: 'bg-green-600', Hot: 'bg-red-600', Premium: 'bg-purple-600',
  Electric: 'bg-teal-600', Exclusive: 'bg-amber-600',
}

const fuelIcons: Record<string, string> = { Petrol: '⛽', Electric: '⚡', Hybrid: '🌿', Diesel: '🛢️' }

export default function Inventory() {
  const { addToCart, cart } = useCart()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [fuel, setFuel] = useState('All')
  const [sort, setSort] = useState('default')
  const [selected, setSelected] = useState<Car | null>(null)

  const isInCart = (id: number) => cart.some(c => c.id === id)

  const categories = ['All', ...Array.from(new Set(cars.map(c => c.category)))]
  const fuels = ['All', ...Array.from(new Set(cars.map(c => c.fuel)))]

  const priceNum = (p: string) => parseFloat(p.replace(/[^0-9.]/g, ''))

  const filtered = cars
    .filter(c => {
      const q = search.toLowerCase()
      const matchQ = c.name.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q)
      const matchCat = category === 'All' || c.category === category
      const matchFuel = fuel === 'All' || c.fuel === fuel
      return matchQ && matchCat && matchFuel
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return priceNum(a.price) - priceNum(b.price)
      if (sort === 'price-desc') return priceNum(b.price) - priceNum(a.price)
      if (sort === 'year') return b.year - a.year
      return 0
    })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

      {/* Page Header */}
      <div className="bg-[#0f0f0f] py-16 px-6 text-center">
        <span className="text-[#E63946] text-xs font-semibold tracking-widest uppercase">Browse & Shop</span>
        <h1 className="text-4xl font-black text-white mt-2 mb-3">Our Inventory</h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">Explore our curated collection of premium, certified vehicles</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 mb-8 flex flex-col sm:flex-row gap-3 flex-wrap">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍  Search brand or model..."
            className="flex-1 min-w-[180px] bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#E63946] transition-all placeholder-gray-400" />
          <select value={category} onChange={e => setCategory(e.target.value)}
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#E63946] transition-all cursor-pointer">
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={fuel} onChange={e => setFuel(e.target.value)}
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#E63946] transition-all cursor-pointer">
            {fuels.map(f => <option key={f}>{f}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#E63946] transition-all cursor-pointer">
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="year">Newest First</option>
          </select>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} found</p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map(car => (
            <div key={car.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="relative overflow-hidden h-52 cursor-pointer" onClick={() => setSelected(car)}>
                <img src={car.img} alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {car.badge && (
                  <span className={`absolute top-3 left-3 ${badgeColor[car.badge]} text-white text-[11px] font-bold px-3 py-1 rounded-full`}>
                    {car.badge}
                  </span>
                )}
                <span className="absolute top-3 right-3 bg-black/60 text-white text-[11px] px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {fuelIcons[car.fuel]} {car.fuel}
                </span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full transition-opacity">
                    View Details
                  </span>
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-gray-400 font-medium">{car.category} · {car.year}</span>
                <h3 className="text-gray-900 dark:text-white font-bold text-base mt-0.5 mb-1">{car.name}</h3>
                <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span>🛣️ {car.mileage}</span>
                  <span>🎨 {car.color}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#E63946] font-black text-xl">{car.price}</span>
                  <div className="flex gap-2">
                    <button onClick={() => setSelected(car)}
                      className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border-none cursor-pointer font-medium">
                      Details
                    </button>
                    <button
                      onClick={() => addToCart({ id: car.id, name: car.name, price: car.price, category: car.category, img: car.img })}
                      disabled={isInCart(car.id)}
                      className={`text-xs font-semibold px-3 py-2 rounded-lg transition-all border-none cursor-pointer ${
                        isInCart(car.id)
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : 'bg-[#E63946] hover:bg-[#c62b37] text-white'
                      }`}>
                      {isInCart(car.id) ? '✓ Added' : '+ Cart'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16">
              <span className="text-6xl block mb-3">🔍</span>
              <p className="text-gray-500 dark:text-gray-400">No vehicles match your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
            onClick={e => e.stopPropagation()}>
            <div className="relative h-64">
              <img src={selected.img} alt={selected.name} className="w-full h-full object-cover" />
              <button onClick={() => setSelected(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer text-sm backdrop-blur-sm">
                ✕
              </button>
              {selected.badge && (
                <span className={`absolute top-4 left-4 ${badgeColor[selected.badge]} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {selected.badge}
                </span>
              )}
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">{selected.name}</h2>
              <p className="text-[#E63946] font-black text-2xl mb-5">{selected.price}</p>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: 'Year', value: selected.year },
                  { label: 'Mileage', value: selected.mileage },
                  { label: 'Fuel', value: selected.fuel },
                  { label: 'Category', value: selected.category },
                  { label: 'Brand', value: selected.brand },
                  { label: 'Color', value: selected.color },
                ].map(d => (
                  <div key={d.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">{d.label}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{d.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { addToCart({ id: selected.id, name: selected.name, price: selected.price, category: selected.category, img: selected.img }); setSelected(null) }}
                  disabled={isInCart(selected.id)}
                  className={`flex-1 font-bold py-3 rounded-xl text-sm transition-colors border-none cursor-pointer ${
                    isInCart(selected.id) ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-[#E63946] hover:bg-[#c62b37] text-white'
                  }`}>
                  {isInCart(selected.id) ? '✓ Already in Cart' : '🛒 Add to Cart'}
                </button>
                <button onClick={() => setSelected(null)}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-xl text-sm hover:bg-gray-200 transition-colors border-none cursor-pointer">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
