import { Link } from 'react-router-dom'

const services = [
  { icon: '💰', title: 'Car Financing', desc: 'Flexible financing plans with low interest rates tailored to your budget and credit profile.' },
  { icon: '🔄', title: 'Trade-In Program', desc: 'Get the best value for your existing vehicle when you trade in for a new or used model at our dealership.' },
  { icon: '🛣️', title: 'Test Drive', desc: 'Book a test drive at your convenience. Experience the performance before making a commitment.', label: 'Book Now' },
  { icon: '🔧', title: 'Maintenance & Repair', desc: 'Certified mechanics and genuine parts ensure your vehicle runs in peak condition year-round.' },
  { icon: '🛡️', title: 'Extended Warranty', desc: 'Peace of mind with our extended warranty packages covering parts, labour, and roadside assistance.' },
  { icon: '📄', title: 'Vehicle Registration', desc: 'We handle all paperwork and registration so you can drive away stress-free on the same day.' },
]

const testimonials = [
  { quote: '"Absolutely seamless experience. The financing was sorted within a day and I drove off with my dream car."', author: '— James T., Phantom RS Owner' },
  { quote: '"The trade-in program gave me far more than other dealers offered. Highly recommend Elite Auto Deals!"', author: '— Sarah M., Summit LX Owner' },
  { quote: '"Maintenance is top-notch. My EV runs perfectly and the team is always transparent with costs."', author: '— Raj P., Voltora EV Owner' },
]

const pricingList = "list-none p-0 m-0 mb-5 text-left"
const pricingItem = "py-1.5 text-sm text-gray-600 border-b border-gray-100"
const btnPrimary = "w-full bg-[#E63946] text-white border-none rounded-md px-5 py-2.5 cursor-pointer font-semibold hover:bg-[#1A1A1A] transition-colors"

function Services() {
  const handlePlan = (plan: string) => alert(`${plan} plan selected!`)

  return (
    <div className="px-5 py-10 max-w-[1200px] mx-auto flex-1 w-full box-border flex flex-col gap-5">

      {/* HERO */}
      <div className="text-center py-16 px-5 bg-gradient-to-br from-[#1A1A1A] to-[#333333] text-white rounded-xl mb-5">
        <h1 className="text-white text-4xl mb-4">Our Premium Services</h1>
        <p className="text-[#D1D5DB] leading-relaxed mb-6">
          From financing to maintenance, we offer everything you need for a seamless car ownership experience.
        </p>
        <Link to="/contact" className="inline-block bg-[#1A1A1A] text-white no-underline px-7 py-3.5 rounded-md font-semibold text-lg hover:bg-[#E63946] transition-colors">
          Get in Touch
        </Link>
      </div>

      {/* SERVICES GRID */}
      <h2 className="text-center my-8 text-3xl">What We Offer</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 mb-8">
        {services.map((s, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-7 text-center shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all">
            <div className="text-4xl mb-3">{s.icon}</div>
            <h3 className="text-xl mb-2">{s.title}</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">{s.desc}</p>
            <Link to="/contact" className="inline-block bg-[#1A1A1A] text-white no-underline px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-[#E63946] transition-colors">
              {s.label ?? 'Learn More'}
            </Link>
          </div>
        ))}
      </div>

      {/* PRICING */}
      <h2 className="text-center my-8 text-3xl">Service Packages</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 mb-8">

        <div className="bg-white border border-gray-200 rounded-xl p-7 text-center relative">
          <div className="text-lg font-bold mb-2 text-gray-900">Basic</div>
          <div className="text-4xl font-extrabold text-[#E63946] mb-4">$99<span className="text-base font-normal text-gray-400">/mo</span></div>
          <ul className={pricingList}>
            {['✅ Oil Change (bi-annual)', '✅ Tyre Rotation', '✅ Vehicle Inspection', '❌ Extended Warranty', '❌ Priority Support'].map(i => (
              <li key={i} className={pricingItem}>{i}</li>
            ))}
          </ul>
          <button className={btnPrimary} onClick={() => handlePlan('Basic')}>Get Started</button>
        </div>

        <div className="bg-white border-2 border-[#E63946] rounded-xl p-7 text-center relative shadow-[0_8px_24px_rgba(230,57,70,0.12)]">
          <div className="bg-[#E63946] text-white text-xs font-bold px-3 py-1 rounded-full absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">Most Popular</div>
          <div className="text-lg font-bold mb-2 text-gray-900">Premium</div>
          <div className="text-4xl font-extrabold text-[#E63946] mb-4">$199<span className="text-base font-normal text-gray-400">/mo</span></div>
          <ul className={pricingList}>
            {['✅ Oil Change (quarterly)', '✅ Tyre Rotation', '✅ Full Vehicle Inspection', '✅ 2-Year Extended Warranty', '❌ Priority Support'].map(i => (
              <li key={i} className={pricingItem}>{i}</li>
            ))}
          </ul>
          <button className={btnPrimary} onClick={() => handlePlan('Premium')}>Get Started</button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-7 text-center relative">
          <div className="text-lg font-bold mb-2 text-gray-900">Elite</div>
          <div className="text-4xl font-extrabold text-[#E63946] mb-4">$349<span className="text-base font-normal text-gray-400">/mo</span></div>
          <ul className={pricingList}>
            {['✅ Unlimited Oil Changes', '✅ Tyre Rotation & Balancing', '✅ Full Vehicle Inspection', '✅ 5-Year Extended Warranty', '✅ 24/7 Priority Support'].map(i => (
              <li key={i} className={pricingItem}>{i}</li>
            ))}
          </ul>
          <button className={btnPrimary} onClick={() => handlePlan('Elite')}>Get Started</button>
        </div>

      </div>

      {/* TESTIMONIALS */}
      <h2 className="text-center my-8 text-3xl">What Our Customers Say</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 mb-8">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="text-amber-400 text-lg mb-2">★★★★★</div>
            <p className="text-gray-600 leading-relaxed mb-2">{t.quote}</p>
            <div className="text-sm text-gray-400 mt-2">{t.author}</div>
          </div>
        ))}
      </div>

      {/* CTA BANNER */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#333333] text-white rounded-xl px-8 py-12 text-center mt-4">
        <h2 className="text-white text-3xl mb-3">Ready to Experience Elite Service?</h2>
        <p className="text-[#ccc] leading-relaxed mb-6">Contact our team today and we'll help you find the right package for your needs.</p>
        <Link to="/contact" className="inline-block bg-[#1A1A1A] text-white no-underline px-7 py-3.5 rounded-md font-semibold text-lg hover:bg-[#E63946] transition-colors">
          Contact Us Now
        </Link>
      </div>

    </div>
  )
}

export default Services
