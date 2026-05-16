import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', location: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password || !form.confirm) { setError('All required fields must be filled.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    setLoading(true)
    setTimeout(() => {
      login({
        name: form.name,
        email: form.email,
        phone: form.phone || '+1 (555) 000-0000',
        location: form.location || 'Auto City, AC',
        memberSince: new Date().getFullYear().toString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=E63946&color=fff&size=200`,
        role: 'Customer',
      })
      setLoading(false)
      navigate('/profile')
    }, 1000)
  }

  const fields = [
    { k: 'name', label: 'Full Name *', type: 'text', placeholder: 'John Doe' },
    { k: 'email', label: 'Email Address *', type: 'email', placeholder: 'you@example.com' },
    { k: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000' },
    { k: 'location', label: 'Location', type: 'text', placeholder: 'City, State' },
    { k: 'password', label: 'Password *', type: 'password', placeholder: '••••••••' },
    { k: 'confirm', label: 'Confirm Password *', type: 'password', placeholder: '••••••••' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-16 transition-colors duration-300">
      <div className="w-full max-w-lg">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl dark:shadow-gray-900/60 border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#E63946] to-[#ff6b6b]" />
          <div className="p-8 md:p-10">
            <div className="text-center mb-8">
              <Link to="/" className="text-3xl font-black text-gray-900 dark:text-white no-underline">
                Elite<span className="text-[#E63946]">Auto</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-1">Create Account</h1>
              <p className="text-gray-400 text-sm">Join EliteAuto for exclusive deals and offers</p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-xl px-4 py-3 mb-6">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map(f => (
                  <div key={f.k} className={f.k === 'name' || f.k === 'email' ? '' : ''}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5" htmlFor={`reg-${f.k}`}>
                      {f.label}
                    </label>
                    <input
                      id={`reg-${f.k}`} type={f.type} value={(form as Record<string,string>)[f.k]}
                      onChange={set(f.k)} placeholder={f.placeholder}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all placeholder-gray-400"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input id="reg-terms" type="checkbox" required
                  className="mt-0.5 accent-[#E63946] cursor-pointer" />
                <label htmlFor="reg-terms" className="text-xs text-gray-500 dark:text-gray-400 cursor-pointer leading-relaxed">
                  I agree to the{' '}
                  <a href="#" className="text-[#E63946] hover:underline">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="text-[#E63946] hover:underline">Privacy Policy</a>
                </label>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-[#E63946] hover:bg-[#c62b37] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all duration-200 border-none cursor-pointer text-sm mt-2">
                {loading ? 'Creating account...' : 'Create Account →'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-[#E63946] font-semibold hover:underline no-underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
