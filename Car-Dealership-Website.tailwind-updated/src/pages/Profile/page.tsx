import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

type Tab = 'info' | 'activity' | 'settings'

const ACTIVITY = [
  { icon: '🚗', text: 'Viewed BMW M5 Competition', time: '2 hours ago' },
  { icon: '🛒', text: 'Added Mercedes S-Class to cart', time: '1 day ago' },
  { icon: '⭐', text: 'Left a 5-star review for Porsche 911', time: '3 days ago' },
  { icon: '💰', text: 'Requested financing quote', time: '1 week ago' },
  { icon: '🔧', text: 'Booked a service appointment', time: '2 weeks ago' },
]

const QUICK_ACTIONS = [
  { to: '/inventory', icon: '🚗', label: 'Browse Cars' },
  { to: '/cart',      icon: '🛒', label: 'My Cart'    },
  { to: '/reviews',   icon: '⭐', label: 'Reviews'    },
  { to: '/dashboard', icon: '📊', label: 'Dashboard'  },
  { to: '/services',  icon: '🔧', label: 'Services'   },
  { to: '/contact',   icon: '💬', label: 'Contact'    },
]

export default function Profile() {
  const { user, isLoggedIn, logout, updateUser } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('info')

  // Edit-mode state
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', location: '', bio: '' })
  const [saved, setSaved] = useState(false)
  const [avatarUploading, setAvatarUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { alert('Image must be under 5MB'); return }
    setAvatarUploading(true)
    const reader = new FileReader()
    reader.onload = () => {
      updateUser({ avatar: reader.result as string })
      setAvatarUploading(false)
    }
    reader.readAsDataURL(file)
  }

  // ── Not logged in ─────────────────────────────────────────────────────────
  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
        <div className="text-center">
          <span className="text-7xl block mb-4">🔒</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Not Logged In</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Please sign in to view your profile.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/login"
              className="bg-[#E63946] text-white font-bold px-6 py-3 rounded-xl no-underline hover:bg-[#c62b37] transition-colors text-sm">
              Sign In
            </Link>
            <Link to="/register"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold px-6 py-3 rounded-xl no-underline hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 text-sm">
              Register
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  const handleEditOpen = () => {
    setForm({ name: user.name, phone: user.phone, location: user.location, bio: user.bio ?? '' })
    setEditing(true)
    setSaved(false)
  }

  const handleSave = () => {
    if (!form.name.trim()) return
    updateUser({ name: form.name.trim(), phone: form.phone.trim(), location: form.location.trim(), bio: form.bio.trim() })
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleLogout = () => { logout(); navigate('/') }

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const tabCls = (t: Tab) =>
    `px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer border-none ${
      tab === t
        ? 'bg-[#E63946] text-white shadow-md'
        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`

  const inputCls =
    'w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all placeholder-gray-400'

  const stats = [
    { label: 'Orders',      value: '3'   },
    { label: 'Wishlist',    value: '7'   },
    { label: 'Reviews',     value: '2'   },
    { label: 'Loyalty Pts', value: '450' },
  ]

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Save success banner */}
        {saved && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm rounded-2xl px-5 py-3 flex items-center gap-2">
            ✅ Profile updated successfully!
          </div>
        )}

        {/* ── Hero Card ───────────────────────────────────────────────────── */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-[#E63946] via-[#c62b37] to-[#0f0f0f]" />
          <div className="px-6 sm:px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-12 mb-6">
              {/* Avatar with upload overlay */}
              <div className="relative flex-shrink-0 group">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-2xl border-4 border-white dark:border-gray-900 object-cover shadow-lg"
                />
                {/* Camera overlay */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={avatarUploading}
                  className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-none"
                  title="Change profile picture"
                >
                  {avatarUploading
                    ? <span className="text-white text-lg animate-spin">⟳</span>
                    : <span className="text-white text-2xl">📷</span>
                  }
                </button>
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <div className="flex-1 sm:pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-black text-gray-900 dark:text-white">{user.name}</h1>
                  <span className="bg-[#E63946]/10 text-[#E63946] text-xs font-semibold px-3 py-0.5 rounded-full border border-[#E63946]/20">
                    {user.role}
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{user.email}</p>
                {user.bio && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 italic">"{user.bio}"</p>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 font-semibold px-5 py-2 rounded-xl text-sm hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer">
                🚪 Logout
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map(s => (
                <div key={s.label} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 text-center border border-gray-100 dark:border-gray-700">
                  <p className="text-2xl font-black text-[#E63946]">{s.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs ────────────────────────────────────────────────────────── */}
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setTab('info')}     className={tabCls('info')}>👤 Personal Info</button>
          <button onClick={() => setTab('activity')} className={tabCls('activity')}>📋 Activity</button>
          <button onClick={() => setTab('settings')} className={tabCls('settings')}>⚙️ Settings</button>
        </div>

        {/* ── Info Tab ────────────────────────────────────────────────────── */}
        {tab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Personal info panel */}
            <div className="md:col-span-1 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-[#E63946]/10 text-[#E63946] rounded-lg flex items-center justify-center text-sm">👤</span>
                Personal Info
              </h2>

              {editing ? (
                /* ── Edit Form ── */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Full Name *</label>
                    <input value={form.name} onChange={set('name')} className={inputCls} placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Phone</label>
                    <input value={form.phone} onChange={set('phone')} className={inputCls} placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Location</label>
                    <input value={form.location} onChange={set('location')} className={inputCls} placeholder="City, State" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Bio</label>
                    <textarea
                      value={form.bio}
                      onChange={set('bio')}
                      rows={3}
                      className={`${inputCls} resize-none`}
                      placeholder="Tell us a little about yourself…"
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button onClick={handleSave}
                      className="flex-1 bg-[#E63946] hover:bg-[#c62b37] text-white font-semibold py-2.5 rounded-xl text-sm transition-colors border-none cursor-pointer">
                      💾 Save
                    </button>
                    <button onClick={() => setEditing(false)}
                      className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold py-2.5 rounded-xl text-sm transition-colors border-none cursor-pointer">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* ── View Mode ── */
                <div className="space-y-4">
                  {[
                    { icon: '✉️', label: 'Email',        value: user.email                      },
                    { icon: '📞', label: 'Phone',        value: user.phone || '—'               },
                    { icon: '📍', label: 'Location',     value: user.location || '—'            },
                    { icon: '🗓️', label: 'Member Since', value: user.memberSince                },
                    { icon: '🏷️', label: 'Account Type', value: user.role                       },
                    ...(user.bio ? [{ icon: '💬', label: 'Bio', value: user.bio }] : []),
                  ].map(row => (
                    <div key={row.label} className="flex items-start gap-3">
                      <span className="text-base mt-0.5">{row.icon}</span>
                      <div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{row.label}</p>
                        <p className="text-sm text-gray-900 dark:text-white font-medium break-all">{row.value}</p>
                      </div>
                    </div>
                  ))}
                  <button onClick={handleEditOpen}
                    className="mt-2 w-full bg-[#E63946] hover:bg-[#c62b37] text-white font-semibold py-2.5 rounded-xl text-sm transition-colors border-none cursor-pointer">
                    ✏️ Edit Profile
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="md:col-span-2 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-[#E63946]/10 text-[#E63946] rounded-lg flex items-center justify-center text-sm">⚡</span>
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {QUICK_ACTIONS.map(a => (
                  <Link key={a.to} to={a.to}
                    className="flex items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-[#E63946]/10 hover:text-[#E63946] dark:hover:bg-[#E63946]/10 text-gray-700 dark:text-gray-300 no-underline transition-all text-sm font-medium">
                    <span className="text-lg">{a.icon}</span> {a.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Activity Tab ─────────────────────────────────────────────────── */}
        {tab === 'activity' && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
              <span className="w-7 h-7 bg-[#E63946]/10 text-[#E63946] rounded-lg flex items-center justify-center text-sm">📋</span>
              Recent Activity
            </h2>
            <div className="space-y-3">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <span className="text-2xl">{a.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white font-medium">{a.text}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Settings Tab ─────────────────────────────────────────────────── */}
        {tab === 'settings' && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-5">
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 bg-[#E63946]/10 text-[#E63946] rounded-lg flex items-center justify-center text-sm">⚙️</span>
              Account Settings
            </h2>

            {/* Notification toggles (UI only) */}
            {[
              { label: 'Email Notifications', desc: 'Receive deals and updates via email', defaultOn: true  },
              { label: 'SMS Alerts',           desc: 'Get text messages for order status',  defaultOn: false },
              { label: 'Promotional Offers',   desc: 'Weekly newsletter with new arrivals', defaultOn: true  },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{s.label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{s.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={s.defaultOn} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-[#E63946] transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>
            ))}

            {/* Danger zone */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <p className="text-sm font-bold text-red-500 mb-3">Danger Zone</p>
              <button
                onClick={handleLogout}
                className="w-full sm:w-auto bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer">
                🚪 Sign Out of All Devices
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
