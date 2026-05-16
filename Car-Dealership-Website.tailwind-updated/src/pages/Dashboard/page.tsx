import { useState } from 'react'
import ChartsSection from '../../components/Dashboard/ChartsSection'

type Car = { id: number; name: string; brand: string; category: string; price: string; year: number; mileage: string; fuel: string; status: 'Available' | 'Sold' | 'Reserved'; img: string }

const initialCars: Car[] = [
  { id: 1, name: 'Mercedes-Benz S-Class', brand: 'Mercedes-Benz', category: 'Luxury Sedan', price: '$89,500', year: 2024, mileage: '0 km', fuel: 'Petrol', status: 'Available', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&q=70' },
  { id: 2, name: 'BMW M5 Competition', brand: 'BMW', category: 'Sports Sedan', price: '$105,000', year: 2024, mileage: '1,200 km', fuel: 'Petrol', status: 'Available', img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&q=70' },
  { id: 3, name: 'Porsche 911 Turbo S', brand: 'Porsche', category: 'Sports Car', price: '$215,000', year: 2023, mileage: '500 km', fuel: 'Petrol', status: 'Reserved', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=70' },
  { id: 4, name: 'Range Rover Sport', brand: 'Land Rover', category: 'Luxury SUV', price: '$78,000', year: 2024, mileage: '0 km', fuel: 'Hybrid', status: 'Available', img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=70' },
  { id: 5, name: 'Audi RS e-tron GT', brand: 'Audi', category: 'Electric', price: '$145,000', year: 2024, mileage: '0 km', fuel: 'Electric', status: 'Available', img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&q=70' },
  { id: 6, name: 'Ferrari Roma', brand: 'Ferrari', category: 'Supercar', price: '$245,000', year: 2023, mileage: '200 km', fuel: 'Petrol', status: 'Sold', img: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400&q=70' },
]

const statCards = [
  { label: 'Total Revenue', value: '$1.24M', icon: '💰', change: '+12%', up: true },
  { label: 'Cars in Stock', value: '48', icon: '🚗', change: '+3', up: true },
  { label: 'Cars Sold', value: '127', icon: '🏆', change: '+8%', up: true },
  { label: 'Pending Inquiries', value: '23', icon: '📩', change: '-4%', up: false },
]

const statusColor: Record<string, string> = {
  Available: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  Sold: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  Reserved: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
}

const emptyForm = { name: '', brand: '', category: '', price: '', year: new Date().getFullYear(), mileage: '', fuel: 'Petrol', status: 'Available' as const, img: '' }

export default function Dashboard() {
  const [cars, setCars] = useState<Car[]>(initialCars)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [editCar, setEditCar] = useState<Car | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Omit<Car, 'id'>>(emptyForm)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory'>('overview')

  const categories = ['All', ...Array.from(new Set(cars.map(c => c.category)))]

  const filtered = cars.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.brand.toLowerCase().includes(search.toLowerCase())
    const matchCat = catFilter === 'All' || c.category === catFilter
    return matchSearch && matchCat
  })

  const openAdd = () => { setForm(emptyForm); setEditCar(null); setShowForm(true) }
  const openEdit = (car: Car) => { setForm({ name: car.name, brand: car.brand, category: car.category, price: car.price, year: car.year, mileage: car.mileage, fuel: car.fuel, status: car.status, img: car.img }); setEditCar(car); setShowForm(true) }

  const handleSave = () => {
    if (!form.name || !form.brand || !form.price) return
    if (editCar) {
      setCars(prev => prev.map(c => c.id === editCar.id ? { ...form, id: editCar.id } : c))
    } else {
      setCars(prev => [...prev, { ...form, id: Date.now() }])
    }
    setShowForm(false)
  }

  const handleDelete = (id: number) => { setCars(prev => prev.filter(c => c.id !== id)); setDeleteId(null) }

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your dealership inventory & analytics</p>
          </div>
          <button onClick={openAdd}
            className="bg-[#E63946] hover:bg-[#c62b37] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors border-none cursor-pointer">
            + Add Vehicle
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white dark:bg-gray-900 rounded-2xl p-1 border border-gray-100 dark:border-gray-800 w-fit mb-8">
          {(['overview', 'inventory'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border-none capitalize ${
                activeTab === tab ? 'bg-[#E63946] text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-transparent'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {statCards.map(s => (
                <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{s.icon}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.up ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                      {s.up ? '↑' : '↓'} {s.change}
                    </span>
                  </div>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">{s.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Recharts — all 4 chart types */}
            <ChartsSection />
          </>
        )}

        {activeTab === 'inventory' && (
          <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search vehicles..."
                className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#E63946] transition-all placeholder-gray-400" />
              <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#E63946] transition-all cursor-pointer">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                      {['Vehicle', 'Category', 'Price', 'Year', 'Fuel', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-5 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(car => (
                      <tr key={car.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="px-5 py-3.5 flex items-center gap-3">
                          <img src={car.img} alt={car.name} className="w-12 h-9 object-cover rounded-lg flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">{car.name}</p>
                            <p className="text-xs text-gray-400">{car.brand}</p>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-gray-600 dark:text-gray-400 text-xs">{car.category}</td>
                        <td className="px-5 py-3.5 font-bold text-[#E63946]">{car.price}</td>
                        <td className="px-5 py-3.5 text-gray-600 dark:text-gray-400">{car.year}</td>
                        <td className="px-5 py-3.5 text-gray-600 dark:text-gray-400 text-xs">{car.fuel}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[car.status]}`}>{car.status}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex gap-2">
                            <button onClick={() => openEdit(car)}
                              className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors border-none cursor-pointer font-medium">
                              Edit
                            </button>
                            <button onClick={() => setDeleteId(car.id)}
                              className="text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors border-none cursor-pointer font-medium">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan={7} className="text-center py-12 text-gray-400">No vehicles found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{editCar ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer text-xl">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { k: 'name', label: 'Vehicle Name *', type: 'text', placeholder: 'e.g. BMW M5' },
                { k: 'brand', label: 'Brand *', type: 'text', placeholder: 'e.g. BMW' },
                { k: 'price', label: 'Price *', type: 'text', placeholder: 'e.g. $105,000' },
                { k: 'year', label: 'Year', type: 'number', placeholder: '2024' },
                { k: 'mileage', label: 'Mileage', type: 'text', placeholder: '0 km' },
                { k: 'img', label: 'Image URL', type: 'url', placeholder: 'https://...' },
              ].map(f => (
                <div key={f.k}>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">{f.label}</label>
                  <input type={f.type} value={(form as Record<string,string|number>)[f.k] as string} onChange={set(f.k)} placeholder={f.placeholder}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#E63946] transition-all placeholder-gray-400" />
                </div>
              ))}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { k: 'category', label: 'Category', options: ['Luxury Sedan', 'Sports Car', 'Luxury SUV', 'Electric', 'Supercar', 'Sports Sedan'] },
                  { k: 'fuel', label: 'Fuel', options: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] },
                  { k: 'status', label: 'Status', options: ['Available', 'Sold', 'Reserved'] },
                ].map(f => (
                  <div key={f.k}>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">{f.label}</label>
                    <select value={(form as unknown as Record<string,string>)[f.k]} onChange={set(f.k)}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#E63946] transition-all cursor-pointer">
                      {f.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-100 dark:border-gray-800">
              <button onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-200 transition-colors border-none cursor-pointer">
                Cancel
              </button>
              <button onClick={handleSave}
                className="flex-1 bg-[#E63946] hover:bg-[#c62b37] text-white font-bold py-2.5 rounded-xl text-sm transition-colors border-none cursor-pointer">
                {editCar ? 'Save Changes' : 'Add Vehicle'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100 dark:border-gray-800 p-7 text-center">
            <span className="text-5xl block mb-3">🗑️</span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Delete Vehicle?</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold py-2.5 rounded-xl text-sm border-none cursor-pointer hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-sm border-none cursor-pointer transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
