import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1200)
  }

  const info = [
    { icon: '📍', label: 'Address', value: '123 Car Avenue, Auto City, AC 12345', sub: 'Open for walk-ins Mon–Sat' },
    { icon: '📞', label: 'Phone', value: '+1 (555) 123-4567', sub: 'Mon–Sat, 9 AM – 7 PM' },
    { icon: '✉️', label: 'Email', value: 'info@eliteauto.com', sub: 'We reply within 2 hours' },
    { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 9 AM – 7 PM', sub: 'Sunday: 11 AM – 4 PM' },
  ]

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* Hero */}
      <section className="bg-[#0f0f0f] py-20 px-6 text-center">
        <span className="inline-block bg-[#E63946]/20 border border-[#E63946]/40 text-[#E63946] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">Get In Touch</span>
        <h1 className="text-5xl font-black text-white mb-4">Contact Us</h1>
        <p className="text-gray-400 text-base max-w-xl mx-auto">
          Have a question, want to book a test drive, or need financing help? We're here for you.
        </p>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Info Panel */}
          <div className="lg:col-span-1 space-y-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Reach Out</h2>
            {info.map(i => (
              <div key={i.label}
                className="flex items-start gap-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 hover:shadow-md transition-shadow">
                <span className="text-2xl flex-shrink-0">{i.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-[#E63946] uppercase tracking-wide mb-0.5">{i.label}</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{i.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{i.sub}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: '📘', label: 'Facebook' },
                  { icon: '🐦', label: 'Twitter' },
                  { icon: '📸', label: 'Instagram' },
                  { icon: '💼', label: 'LinkedIn' },
                ].map(s => (
                  <a key={s.label} href="#" aria-label={s.label}
                    className="w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-[#E63946] hover:border-[#E63946] rounded-xl flex items-center justify-center text-base transition-all no-underline">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-[#E63946] to-[#ff6b6b]" />
              <div className="p-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
                {sent ? (
                  <div className="text-center py-10">
                    <span className="text-7xl block mb-4">✅</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                      Thank you, {form.name}! We'll get back to you at {form.email} within 2 hours.
                    </p>
                    <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' }) }}
                      className="bg-[#E63946] hover:bg-[#c62b37] text-white font-bold px-6 py-2.5 rounded-xl text-sm border-none cursor-pointer transition-colors">
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5" htmlFor="contact-name">Full Name *</label>
                        <input id="contact-name" type="text" value={form.name} onChange={set('name')} placeholder="John Doe"
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all placeholder-gray-400" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5" htmlFor="contact-email">Email Address *</label>
                        <input id="contact-email" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com"
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all placeholder-gray-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5" htmlFor="contact-phone">Phone Number</label>
                        <input id="contact-phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000"
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all placeholder-gray-400" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5" htmlFor="contact-subject">Subject</label>
                        <select id="contact-subject" value={form.subject} onChange={set('subject')}
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#E63946] transition-all cursor-pointer">
                          {['General Inquiry', 'Test Drive Request', 'Financing', 'Trade-In', 'Service Booking', 'Other'].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5" htmlFor="contact-message">Message *</label>
                      <textarea id="contact-message" value={form.message} onChange={set('message')} rows={5}
                        placeholder="Tell us how we can help you..."
                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all placeholder-gray-400 resize-none" />
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full bg-[#E63946] hover:bg-[#c62b37] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all border-none cursor-pointer text-sm shadow-lg shadow-red-500/20">
                      {loading ? 'Sending...' : 'Send Message →'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm h-64 bg-gray-100 dark:bg-gray-900 flex items-center justify-center relative">
            <div className="text-center z-10">
              <span className="text-5xl block mb-2">📍</span>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">123 Car Avenue, Auto City, AC 12345</p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer"
                className="inline-block mt-3 text-xs text-[#E63946] font-semibold hover:underline no-underline">
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
