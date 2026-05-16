import { useState } from 'react'

interface Vehicle {
  id: number
  name: string
  category: string
  price: string
  status: 'available' | 'pending' | 'sold'
  stock: number
}

const initialVehicles: Vehicle[] = [
  { id: 1, name: '2026 Phantom RS',  category: 'Sports',   price: '$89,900', status: 'available', stock: 5 },
  { id: 2, name: '2026 Summit LX',   category: 'SUV',      price: '$75,500', status: 'pending',   stock: 2 },
  { id: 3, name: '2025 EcoHatch',    category: 'Sedan',    price: '$22,000', status: 'sold',      stock: 0 },
  { id: 4, name: '2026 Voltora EV',  category: 'Electric', price: '$54,200', status: 'available', stock: 8 },
  { id: 5, name: '2026 Titan X4',    category: 'SUV',      price: '$67,800', status: 'available', stock: 3 },
]

const inputCls = "w-full p-2.5 border border-gray-200 rounded-md bg-white text-gray-900 box-border focus:outline-none focus:border-[#E63946] transition-all"
const labelCls = "block font-medium mb-2 text-gray-900 text-sm"

function Dashboard() {
  const [vehicles, setVehicles]         = useState<Vehicle[]>(initialVehicles)
  const [showModal, setShowModal]       = useState(false)
  const [editId, setEditId]             = useState<number | null>(null)
  const [searchText, setSearchText]     = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCat, setFilterCat]       = useState('all')
  const [selected, setSelected]         = useState<number[]>([])
  const [form, setForm] = useState({ name: '', category: 'Sports', price: '', status: 'available' as Vehicle['status'], stock: '' })

  const openAdd = () => { setEditId(null); setForm({ name: '', category: 'Sports', price: '', status: 'available', stock: '' }); setShowModal(true) }
  const openEdit = (v: Vehicle) => { setEditId(v.id); setForm({ name: v.name, category: v.category, price: v.price, status: v.status, stock: String(v.stock) }); setShowModal(true) }
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editId !== null) {
      setVehicles(prev => prev.map(v => v.id === editId ? { ...v, ...form, stock: Number(form.stock) } : v))
    } else {
      const newId = vehicles.length ? Math.max(...vehicles.map(v => v.id)) + 1 : 1
      setVehicles(prev => [...prev, { id: newId, name: form.name, category: form.category, price: form.price, status: form.status, stock: Number(form.stock) }])
    }
    setShowModal(false)
  }

  const deleteRow = (id: number) => { if (window.confirm('Delete this vehicle?')) setVehicles(prev => prev.filter(v => v.id !== id)) }
  const deleteSelected = () => {
    if (selected.length === 0) { alert('Select at least one row.'); return }
    if (window.confirm(`Delete ${selected.length} vehicle(s)?`)) { setVehicles(prev => prev.filter(v => !selected.includes(v.id))); setSelected([]) }
  }
  const toggleSelect = (id: number) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const toggleAll = (checked: boolean) => setSelected(checked ? filtered.map(v => v.id) : [])

  const filtered = vehicles.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(searchText.toLowerCase())
    const matchStatus = filterStatus === 'all' || v.status === filterStatus
    const matchCat    = filterCat === 'all' || v.category.toLowerCase() === filterCat
    return matchSearch && matchStatus && matchCat
  })

  const badgeCls = (s: string) =>
    s === 'available'
      ? 'px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700'
      : s === 'pending'
      ? 'px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-600'
      : 'px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-600'

  const total   = vehicles.length
  const avail   = vehicles.filter(v => v.status === 'available').length
  const pending = vehicles.filter(v => v.status === 'pending').length

  const statCards = [
    { icon: '🚗', bg: 'bg-blue-50',   value: total,   label: 'Total Vehicles',  change: '▲ 8% this month',  up: true },
    { icon: '✅', bg: 'bg-green-50',  value: avail,   label: 'Available',        change: '▲ 3% this month',  up: true },
    { icon: '💰', bg: 'bg-red-50',    value: '$2.4M', label: 'Total Revenue',    change: '▲ 12% this month', up: true },
    { icon: '⏳', bg: 'bg-orange-50', value: pending, label: 'Pending Sales',    change: '▼ 2% this month',  up: false },
  ]

  const activityDots: Record<string, string> = {
    green: 'bg-green-600', red: 'bg-red-600', orange: 'bg-orange-500', blue: 'bg-blue-600'
  }

  return (
    <div className="flex min-h-[calc(100vh-60px)]">

      {/* SIDEBAR */}
      <aside className="w-60 bg-[#1A1A1A] text-white flex flex-col py-0 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto shrink-0">
        <div className="flex items-center gap-2.5 px-5 pb-5 pt-5 text-lg font-bold border-b border-[#333]">
          <span>🚗</span><span>Admin Panel</span>
        </div>
        <nav className="flex flex-col flex-1 py-4">
          <a href="#overview"  className="flex items-center gap-2.5 px-5 py-3 text-white no-underline text-sm bg-white/10 border-l-4 border-[#E63946]">📊 Overview</a>
          <a href="#stock"     className="flex items-center gap-2.5 px-5 py-3 text-[#ccc] no-underline text-sm hover:bg-white/10 hover:text-white transition-colors">🚙 Stock Manager</a>
          <a href="#analytics" className="flex items-center gap-2.5 px-5 py-3 text-[#ccc] no-underline text-sm hover:bg-white/10 hover:text-white transition-colors">📈 Analytics</a>
          <a href="#activity"  className="flex items-center gap-2.5 px-5 py-3 text-[#ccc] no-underline text-sm hover:bg-white/10 hover:text-white transition-colors">🔔 Activity</a>
        </nav>
        <div className="flex items-center gap-3 px-5 py-4 border-t border-[#333]">
          <div className="w-9 h-9 rounded-full bg-[#E63946] flex items-center justify-content-center font-bold text-sm flex items-center justify-center">AD</div>
          <div>
            <div className="font-semibold text-sm">Admin User</div>
            <div className="text-xs text-[#999]">Super Admin</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">

        {/* HEADER */}
        <div id="overview" className="flex justify-between items-start mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-3xl m-0 text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-400 mt-1 mb-0 text-sm">Welcome back, Admin. Here's what's happening today.</p>
          </div>
          <div className="flex gap-2.5">
            <button onClick={() => alert('Report exported!')}
              className="px-3 py-1.5 text-sm font-semibold rounded-md border border-[#E63946] text-[#E63946] bg-transparent cursor-pointer hover:bg-[#E63946] hover:text-white transition-colors">
              Export Report
            </button>
            <button onClick={openAdd}
              className="px-3 py-1.5 text-sm font-semibold rounded-md bg-[#E63946] text-white border-none cursor-pointer hover:bg-[#1A1A1A] transition-colors">
              + Add Vehicle
            </button>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-6">
          {statCards.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-5 flex items-center gap-4 border border-gray-200 shadow-sm">
              <div className={`w-12 h-12 rounded-md ${s.bg} flex items-center justify-center text-2xl`}>{s.icon}</div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                <div className="text-sm text-gray-400">{s.label}</div>
                <div className={`text-xs mt-1 ${s.up ? 'text-green-600' : 'text-red-600'}`}>{s.change}</div>
              </div>
            </div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div className="flex flex-wrap gap-2.5 mb-5">
          <button onClick={() => { setFilterStatus('all'); setFilterCat('all'); setSearchText('') }}
            className="px-4 py-2.5 rounded-md text-sm font-semibold cursor-pointer bg-[#1A1A1A] text-white border-none hover:opacity-85 transition-opacity">👁️ View All Stock</button>
          <button onClick={openAdd}
            className="px-4 py-2.5 rounded-md text-sm font-semibold cursor-pointer bg-green-600 text-white border-none hover:opacity-85 transition-opacity">➕ Insert Stock</button>
          <button onClick={() => alert('Select a row to update.')}
            className="px-4 py-2.5 rounded-md text-sm font-semibold cursor-pointer bg-orange-600 text-white border-none hover:opacity-85 transition-opacity">✏️ Update Stock</button>
          <button onClick={deleteSelected}
            className="px-4 py-2.5 rounded-md text-sm font-semibold cursor-pointer bg-red-600 text-white border-none hover:opacity-85 transition-opacity">🗑️ Delete Stock</button>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex flex-wrap gap-3 mb-5">
          <input type="text" id="search-input" placeholder="🔍 Search by vehicle name..." value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="flex-[2] min-w-[200px] p-2.5 border border-gray-200 rounded-md bg-white text-gray-900 focus:outline-none focus:border-[#E63946] transition-all" />
          <select id="filter-status" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="flex-1 min-w-[140px] p-2.5 border border-gray-200 rounded-md bg-white text-gray-900 appearance-none focus:outline-none focus:border-[#E63946] transition-all">
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
          <select id="filter-category" value={filterCat} onChange={e => setFilterCat(e.target.value)}
            className="flex-1 min-w-[140px] p-2.5 border border-gray-200 rounded-md bg-white text-gray-900 appearance-none focus:outline-none focus:border-[#E63946] transition-all">
            <option value="all">All Categories</option>
            <option value="suv">SUV</option>
            <option value="sedan">Sedan</option>
            <option value="sports">Sports</option>
            <option value="electric">Electric</option>
          </select>
        </div>

        {/* STOCK TABLE */}
        <div id="stock" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-xl m-0 mb-4 text-gray-900">🚙 Stock Manager</h2>
          <div className="w-full overflow-x-auto mt-5">
            <table id="stock-table" className="w-full border-collapse rounded-xl overflow-hidden bg-white shadow-sm">
              <thead className="bg-[#1A1A1A] text-white">
                <tr>
                  <th className="p-4 text-left font-semibold"><input type="checkbox" id="select-all" checked={selected.length === filtered.length && filtered.length > 0} onChange={e => toggleAll(e.target.checked)} /></th>
                  <th className="p-4 text-left font-semibold">Vehicle</th>
                  <th className="p-4 text-left font-semibold">Category</th>
                  <th className="p-4 text-left font-semibold">Price</th>
                  <th className="p-4 text-left font-semibold">Status</th>
                  <th className="p-4 text-left font-semibold">Stock</th>
                  <th className="p-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody id="table-body">
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="text-center text-gray-400 p-4">No vehicles found.</td></tr>
                )}
                {filtered.map((v, idx) => (
                  <tr key={v.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}>
                    <td className="px-4 py-3.5 border-b border-gray-200"><input type="checkbox" className="row-check" checked={selected.includes(v.id)} onChange={() => toggleSelect(v.id)} /></td>
                    <td className="px-4 py-3.5 border-b border-gray-200 text-gray-600"><strong>{v.name}</strong></td>
                    <td className="px-4 py-3.5 border-b border-gray-200 text-gray-600">{v.category}</td>
                    <td className="px-4 py-3.5 border-b border-gray-200 text-gray-600">{v.price}</td>
                    <td className="px-4 py-3.5 border-b border-gray-200"><span className={badgeCls(v.status)}>{v.status.charAt(0).toUpperCase() + v.status.slice(1)}</span></td>
                    <td className="px-4 py-3.5 border-b border-gray-200 text-gray-600">{v.stock}</td>
                    <td className="px-4 py-3.5 border-b border-gray-200">
                      <div className="flex gap-1.5">
                        <button onClick={() => alert(`Vehicle: ${v.name}\nCategory: ${v.category}\nPrice: ${v.price}\nStatus: ${v.status}\nStock: ${v.stock}`)}
                          className="px-2 py-1 text-xs rounded-md bg-[#E63946] text-white border-none cursor-pointer hover:bg-[#1A1A1A] transition-colors">View</button>
                        <button onClick={() => openEdit(v)}
                          className="px-2 py-1 text-xs rounded-md bg-transparent border border-[#E63946] text-[#E63946] cursor-pointer hover:bg-[#E63946] hover:text-white transition-colors">Edit</button>
                        <button onClick={() => deleteRow(v.id)}
                          className="px-2 py-1 text-xs rounded-md bg-red-600 text-white border-none cursor-pointer hover:bg-red-800 transition-colors">Del</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ANALYTICS */}
        <div id="analytics" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-xl m-0 mb-4 text-gray-900">📈 Sales Analytics</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">

            {/* BAR CHART */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="text-base m-0 mb-4 text-gray-900">Monthly Sales (2026)</h3>
              <div className="flex items-end gap-3 h-40 py-2.5">
                {[
                  { m: 'Jan', n: 22, hCls: 'h-[55%]',  accent: false },
                  { m: 'Feb', n: 28, hCls: 'h-[70%]',  accent: false },
                  { m: 'Mar', n: 18, hCls: 'h-[45%]',  accent: false },
                  { m: 'Apr', n: 34, hCls: 'h-[85%]',  accent: false },
                  { m: 'May', n: 40, hCls: 'h-full',   accent: true  },
                  { m: 'Jun', n: 24, hCls: 'h-[60%]',  accent: false },
                ].map(({ m, n, hCls, accent }) => (
                  <div key={m} className="flex flex-col items-center flex-1 h-full justify-end">
                    <div className={`w-full ${accent ? 'bg-[#457B9D]' : 'bg-[#E63946]'} rounded-t flex items-start justify-center transition-all ${hCls}`}
                      title={`${m}: ${n} sold`}>
                      <span className="text-[0.7rem] text-white pt-1 font-semibold">{n}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1.5">{m}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* DONUT CHART */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="text-base m-0 mb-4 text-gray-900">Stock by Category</h3>
              <div className="flex justify-center my-2.5">
                <div className="w-[120px] h-[120px] rounded-full relative flex items-center justify-center bg-[conic-gradient(#E63946_0%_28%,#457B9D_28%_52%,#2A9D8F_52%_74%,#E9C46A_74%_100%)]">
                  <div className="w-[70px] h-[70px] bg-gray-50 rounded-full flex flex-col items-center justify-center text-lg font-bold text-center">
                    {vehicles.length}<br /><small className="text-xs font-normal">Total</small>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  { cls: 'bg-[#E63946]', label: 'Sports 28%'   },
                  { cls: 'bg-[#457B9D]', label: 'SUV 24%'      },
                  { cls: 'bg-[#2A9D8F]', label: 'Electric 22%' },
                  { cls: 'bg-[#E9C46A]', label: 'Sedan 26%'    },
                ].map(({ cls, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs text-gray-600">
                    <span className={`w-2.5 h-2.5 rounded-full ${cls}`}></span>{label}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ACTIVITY */}
        <div id="activity" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-xl m-0 mb-4 text-gray-900">🔔 Recent Activity</h2>
          <ul className="list-none p-0 m-0">
            {[
              { dot: 'green',  text: <><strong>2026 Voltora EV</strong> was added to inventory.</>,         time: '2 minutes ago' },
              { dot: 'red',    text: <><strong>2025 EcoHatch</strong> was marked as Sold.</>,               time: '1 hour ago' },
              { dot: 'orange', text: <><strong>2026 Summit LX</strong> price updated to $75,500.</>,        time: '3 hours ago' },
              { dot: 'blue',   text: <>New contact message received from <strong>John Smith</strong>.</>,   time: 'Yesterday, 4:30 PM' },
              { dot: 'green',  text: <><strong>2026 Titan X4</strong> was added to inventory.</>,           time: 'Yesterday, 10:00 AM' },
            ].map((a, i) => (
              <li key={i} className="flex gap-3.5 items-start py-3 border-b border-gray-100">
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${activityDots[a.dot]}`}></div>
                <div>
                  <div className="text-gray-900 text-sm">{a.text}</div>
                  <div className="text-xs text-gray-400 mt-1">{a.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </main>

      {/* MODAL */}
      {showModal && (
        <div id="add-modal" className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center">
          <div className="bg-white rounded-xl p-7 w-full max-w-[480px] shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between items-center mb-5">
              <h3 className="m-0 text-gray-900">{editId !== null ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
              <button onClick={() => setShowModal(false)}
                className="bg-transparent border-none text-xl cursor-pointer text-gray-400 px-2 py-1 hover:bg-gray-100 hover:text-gray-900 rounded transition-colors">✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="v-name" className={labelCls}>Vehicle Name</label>
                <input type="text" id="v-name" name="name" placeholder="e.g. 2026 Phantom RS" required value={form.name} onChange={handleFormChange} className={inputCls} />
              </div>
              <div className="mb-4">
                <label htmlFor="v-cat" className={labelCls}>Category</label>
                <select id="v-cat" name="category" value={form.category} onChange={handleFormChange} className={inputCls + " appearance-none"}>
                  <option>Sports</option><option>SUV</option><option>Sedan</option><option>Electric</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="v-price" className={labelCls}>Price</label>
                <input type="text" id="v-price" name="price" placeholder="e.g. $89,900" required value={form.price} onChange={handleFormChange} className={inputCls} />
              </div>
              <div className="mb-4">
                <label htmlFor="v-status" className={labelCls}>Status</label>
                <select id="v-status" name="status" value={form.status} onChange={handleFormChange} className={inputCls + " appearance-none"}>
                  <option value="available">Available</option><option value="pending">Pending</option><option value="sold">Sold</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="v-stock" className={labelCls}>Stock Qty</label>
                <input type="number" id="v-stock" name="stock" placeholder="e.g. 5" required min="0" value={form.stock} onChange={handleFormChange} className={inputCls} />
              </div>
              <div className="flex gap-2.5 justify-end mt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md border border-[#E63946] text-[#E63946] bg-transparent cursor-pointer font-semibold hover:bg-[#E63946] hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit"
                  className="px-4 py-2 rounded-md bg-[#E63946] text-white border-none cursor-pointer font-semibold hover:bg-[#1A1A1A] transition-colors">
                  {editId !== null ? 'Save Changes' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default Dashboard
