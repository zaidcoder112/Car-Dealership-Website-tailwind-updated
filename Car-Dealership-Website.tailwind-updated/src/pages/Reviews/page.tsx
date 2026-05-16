import { useState } from 'react'

const allReviews = [
  { id: 1, name: 'James Carter', avatar: 'https://ui-avatars.com/api/?name=James+Carter&background=E63946&color=fff', rating: 5, car: 'Mercedes-Benz S-Class', date: 'May 2026', text: 'Absolutely flawless experience from start to finish. The team was professional, knowledgeable, and made the entire process stress-free. My S-Class is everything I dreamed of!', verified: true },
  { id: 2, name: 'Sophia Martinez', avatar: 'https://ui-avatars.com/api/?name=Sophia+Martinez&background=6366f1&color=fff', rating: 5, car: 'BMW M5 Competition', date: 'Apr 2026', text: 'EliteAuto found me the perfect M5 at a competitive price. The financing team went above and beyond. I will definitely be back for my next vehicle.', verified: true },
  { id: 3, name: 'David Thompson', avatar: 'https://ui-avatars.com/api/?name=David+Thompson&background=0ea5e9&color=fff', rating: 4, car: 'Porsche 911 Turbo S', date: 'Apr 2026', text: 'Outstanding selection and genuine expertise. Slight delay in paperwork but overall a premium experience. Would recommend to any car enthusiast.', verified: true },
  { id: 4, name: 'Emily Chen', avatar: 'https://ui-avatars.com/api/?name=Emily+Chen&background=10b981&color=fff', rating: 5, car: 'Range Rover Sport', date: 'Mar 2026', text: 'The staff listened to exactly what I wanted and matched me with the perfect Range Rover. The showroom is stunning and the service is world-class.', verified: true },
  { id: 5, name: 'Michael Brown', avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=f59e0b&color=fff', rating: 5, car: 'Audi RS e-tron GT', date: 'Mar 2026', text: 'Switched to electric and I could not be happier. EliteAuto made the whole EV experience understandable and exciting. Great after-sales support too!', verified: false },
  { id: 6, name: 'Rachel Kim', avatar: 'https://ui-avatars.com/api/?name=Rachel+Kim&background=8b5cf6&color=fff', rating: 4, car: 'Ferrari Roma', date: 'Feb 2026', text: 'Buying a Ferrari is a once-in-a-lifetime experience and EliteAuto made it magical. The attention to detail is remarkable. Highly recommend!', verified: true },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`text-base ${i <= count ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'}`}>★</span>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [form, setForm] = useState({ name: '', car: '', rating: 5, text: '' })
  const [submitted, setSubmitted] = useState(false)
  const [filter, setFilter] = useState(0)

  const shown = filter === 0 ? allReviews : allReviews.filter(r => r.rating === filter)

  const avg = (allReviews.reduce((a, r) => a + r.rating, 0) / allReviews.length).toFixed(1)
  const dist = [5,4,3,2,1].map(s => ({ star: s, count: allReviews.filter(r => r.rating === s).length }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.text) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#E63946] text-xs font-semibold tracking-widest uppercase">Customer Feedback</span>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mt-2 mb-3">What Our Clients Say</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">Real experiences from real EliteAuto customers</p>
        </div>

        {/* Rating Summary */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
          <div className="text-center">
            <p className="text-7xl font-black text-[#E63946]">{avg}</p>
            <Stars count={Math.round(parseFloat(avg))} />
            <p className="text-gray-400 text-xs mt-2">{allReviews.length} reviews</p>
          </div>
          <div className="flex-1 w-full space-y-2">
            {dist.map(d => (
              <div key={d.star} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 dark:text-gray-400 w-6 text-right">{d.star}★</span>
                <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-400 h-2 rounded-full transition-all" style={{ width: `${(d.count / allReviews.length) * 100}%` }} />
                </div>
                <span className="text-xs text-gray-400 w-3">{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {[0,5,4,3,2,1].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all cursor-pointer ${
                filter === s
                  ? 'bg-[#E63946] border-[#E63946] text-white'
                  : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-[#E63946]'
              }`}>
              {s === 0 ? 'All' : `${s} ★`}
            </button>
          ))}
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {shown.map(r => (
            <div key={r.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <img src={r.avatar} alt={r.name} className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{r.name}</p>
                    {r.verified && <span className="text-xs text-green-500">✓</span>}
                  </div>
                  <p className="text-xs text-gray-400">{r.car} · {r.date}</p>
                </div>
              </div>
              <Stars count={r.rating} />
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-3">"{r.text}"</p>
            </div>
          ))}
        </div>

        {/* Write Review */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Write a Review</h2>
          {submitted ? (
            <div className="text-center py-8">
              <span className="text-6xl block mb-3">🎉</span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Thank you for your review!</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Your feedback helps us improve our service.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Your Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="John Doe"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all placeholder-gray-400" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Vehicle Purchased</label>
                  <input value={form.car} onChange={e => setForm(f => ({ ...f, car: e.target.value }))}
                    placeholder="e.g. BMW M5"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all placeholder-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(s => (
                    <button key={s} type="button" onClick={() => setForm(f => ({ ...f, rating: s }))}
                      className={`text-2xl bg-transparent border-none cursor-pointer transition-transform hover:scale-110 ${s <= form.rating ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'}`}>
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Your Review *</label>
                <textarea value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                  placeholder="Tell us about your experience..."
                  rows={4}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all placeholder-gray-400 resize-none" />
              </div>
              <button type="submit"
                className="bg-[#E63946] hover:bg-[#c62b37] text-white font-bold px-8 py-3 rounded-xl transition-colors border-none cursor-pointer text-sm">
                Submit Review →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
