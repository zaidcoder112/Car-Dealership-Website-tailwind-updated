const services = [
  { icon: '🔧', title: 'Full Vehicle Service', desc: 'Comprehensive multi-point inspection and maintenance by ASE-certified technicians using OEM parts.', price: 'From $199', time: '2–4 hours' },
  { icon: '💰', title: 'Flexible Financing', desc: 'Tailored loan and lease plans with competitive interest rates. Get pre-approved in minutes.', price: '0% APR Available', time: 'Same Day' },
  { icon: '🔄', title: 'Trade-In Program', desc: 'Get the best value for your current vehicle. Instant online valuation with no obligation.', price: 'Free Appraisal', time: '30 Minutes' },
  { icon: '🛡️', title: 'Extended Warranty', desc: 'Comprehensive coverage plans protecting you from unexpected repair costs for up to 7 years.', price: 'From $49/mo', time: 'Instant Activation' },
  { icon: '🎨', title: 'Detailing & Wrap', desc: 'Professional ceramic coating, paint protection film, and full-colour vehicle wraps by specialists.', price: 'From $299', time: '1–3 Days' },
  { icon: '🚗', title: 'Test Drive', desc: 'Schedule a private test drive at your convenience — at our showroom or delivered to your door.', price: 'Free', time: 'Flexible Booking' },
]

const process = [
  { step: '01', title: 'Browse & Select', desc: 'Explore our inventory online or visit our showroom to find your perfect vehicle.' },
  { step: '02', title: 'Test Drive', desc: 'Book a test drive at your convenience with one of our expert advisors.' },
  { step: '03', title: 'Financing', desc: 'Get approved for financing tailored to your budget — fast, fair, and transparent.' },
  { step: '04', title: 'Drive Away', desc: 'Complete the paperwork and drive away in your dream car the same day.' },
]

export default function Services() {
  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* Hero */}
      <section className="bg-[#0f0f0f] py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580274455191-1c62238fa1c3?w=1600&q=80')" }} />
        <div className="relative z-10">
          <span className="inline-block bg-[#E63946]/20 border border-[#E63946]/40 text-[#E63946] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">What We Offer</span>
          <h1 className="text-5xl font-black text-white mb-4">Our Services</h1>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            From financing to full-service maintenance, EliteAuto provides everything you need for a premium ownership experience.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#E63946] text-xs font-semibold tracking-widest uppercase">Everything Under One Roof</span>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">Premium Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map(s => (
              <div key={s.title}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-7 hover:shadow-xl dark:hover:shadow-gray-900 hover:-translate-y-1 transition-all duration-300 group">
                <span className="text-4xl block mb-4">{s.icon}</span>
                <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5">{s.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-[#E63946] font-black text-sm">{s.price}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">⏱ {s.time}</span>
                </div>
                <button className="mt-4 w-full bg-gray-50 dark:bg-gray-800 hover:bg-[#E63946] hover:text-white text-gray-700 dark:text-gray-300 font-semibold py-2.5 rounded-xl text-sm transition-all border-none cursor-pointer group-hover:bg-[#E63946] group-hover:text-white">
                  Book This Service →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#E63946] text-xs font-semibold tracking-widest uppercase">Simple & Transparent</span>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {process.map((p, i) => (
              <div key={p.step} className="relative">
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#E63946]/60 to-transparent z-0" />
                )}
                <div className="relative z-10 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-[#E63946]/10 border-2 border-[#E63946]/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#E63946] font-black text-xl">{p.step}</span>
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-bold text-base mb-2">{p.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#E63946] text-center">
        <h2 className="text-3xl font-black text-white mb-3">Ready to Experience EliteAuto Service?</h2>
        <p className="text-red-100 text-sm mb-6 max-w-lg mx-auto">Book an appointment online or call us and our team will take care of the rest.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+15551234567"
            className="bg-white text-[#E63946] font-bold px-8 py-3.5 rounded-full no-underline hover:bg-gray-100 transition-colors inline-block">
            📞 Call Now
          </a>
          <a href="/contact"
            className="bg-transparent border-2 border-white text-white font-bold px-8 py-3.5 rounded-full no-underline hover:bg-white/10 transition-colors inline-block">
            Book Online
          </a>
        </div>
      </section>
    </div>
  )
}
