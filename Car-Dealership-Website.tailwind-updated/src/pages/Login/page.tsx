import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please fill in all fields.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    setTimeout(() => {
      login({
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email,
        phone: '+1 (555) 000-0000',
        location: 'Auto City, AC',
        memberSince: new Date().getFullYear().toString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=E63946&color=fff&size=200`,
        role: 'Customer',
      })
      setLoading(false)
      navigate('/profile')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-16 transition-colors duration-300">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl dark:shadow-gray-900/60 border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#E63946] to-[#ff6b6b]" />
          <div className="p-8 md:p-10">
            <div className="text-center mb-8">
              <Link to="/" className="text-3xl font-black text-gray-900 dark:text-white no-underline">
                Elite<span className="text-[#E63946]">Auto</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-1">Welcome back</h1>
              <p className="text-gray-400 text-sm">Sign in to your account to continue</p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-xl px-4 py-3 mb-6">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="login-email">Email Address</label>
                <input
                  id="login-email" type="email" value={email}
                  onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="login-password">Password</label>
                <div className="relative">
                  <input
                    id="login-password" type={showPass ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 pr-12 text-sm outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all placeholder-gray-400"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 bg-transparent border-none cursor-pointer text-sm">
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
                <div className="text-right mt-1.5">
                  <a href="#" className="text-xs text-[#E63946] hover:underline">Forgot password?</a>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-[#E63946] hover:bg-[#c62b37] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all duration-200 border-none cursor-pointer text-sm">
                {loading ? 'Signing in...' : 'Sign In →'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#E63946] font-semibold hover:underline no-underline">Create one</Link>
            </p>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">Use any email &amp; password (6+ chars) to demo login</p>
      </div>
    </div>
  )
}
