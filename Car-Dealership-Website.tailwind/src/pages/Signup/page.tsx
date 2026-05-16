import { useState } from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { alert('Passwords do not match!'); return }
    alert(`Account created!\nName: ${name}\nEmail: ${email}`)
  }

  const inputClass = "w-full p-2.5 border border-gray-200 rounded-md bg-white text-gray-900 box-border focus:outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all"

  return (
    <div className="px-5 py-10 max-w-[1200px] mx-auto flex-1 w-full box-border flex justify-center items-center min-h-[70vh]">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-[500px] w-full border border-gray-200">

        <h2 className="text-center text-[#E63946] text-3xl mb-3">Create an Account</h2>
        <p className="text-center text-gray-600 mb-6">Join us to save your favorite vehicles.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2 text-gray-900">Full Name</label>
            <input type="text" id="name" name="name" required placeholder="Enter your name"
              value={name} onChange={e => setName(e.target.value)} className={inputClass} />
          </div>
          <div className="mb-4">
            <label htmlFor="sig-email" className="block font-medium mb-2 text-gray-900">Email Address</label>
            <input type="email" id="sig-email" name="email" required placeholder="Enter your email"
              value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
          </div>
          <div className="mb-4">
            <label htmlFor="sig-password" className="block font-medium mb-2 text-gray-900">Password</label>
            <input type="password" id="sig-password" name="password" required placeholder="Create a password"
              value={password} onChange={e => setPassword(e.target.value)} className={inputClass} />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block font-medium mb-2 text-gray-900">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" required placeholder="Confirm your password"
              value={confirm} onChange={e => setConfirm(e.target.value)} className={inputClass} />
          </div>
          <button type="submit"
            className="w-full bg-[#E63946] text-white border-none rounded-md px-5 py-2.5 cursor-pointer font-semibold hover:bg-[#1A1A1A] transition-colors">
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-[#E63946] no-underline hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
