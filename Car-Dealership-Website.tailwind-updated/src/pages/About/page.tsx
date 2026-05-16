const team = [
  { name: 'Alexander Rhodes', role: 'CEO & Founder', img: 'https://ui-avatars.com/api/?name=Alexander+Rhodes&background=E63946&color=fff&size=200', bio: '20+ years in the luxury auto industry. Passionate about connecting people with their dream cars.' },
  { name: 'Natalie Chen', role: 'Sales Director', img: 'https://ui-avatars.com/api/?name=Natalie+Chen&background=6366f1&color=fff&size=200', bio: 'Expert negotiator and customer advocate who has closed over 3,000 vehicle deals in her career.' },
  { name: 'Marcus Johnson', role: 'Head of Finance', img: 'https://ui-avatars.com/api/?name=Marcus+Johnson&background=0ea5e9&color=fff&size=200', bio: 'Specializes in creating tailored financing solutions that make luxury vehicles accessible to everyone.' },
  { name: 'Sofia Williams', role: 'Lead Mechanic', img: 'https://ui-avatars.com/api/?name=Sofia+Williams&background=10b981&color=fff&size=200', bio: 'ASE-certified master technician with expertise in European and American luxury vehicle maintenance.' },
  { name: 'Daniel Park', role: 'Marketing Manager', img: 'https://ui-avatars.com/api/?name=Daniel+Park&background=f59e0b&color=fff&size=200', bio: 'Creative storyteller who brings the EliteAuto brand to life through compelling digital experiences.' },
  { name: 'Priya Patel', role: 'Customer Relations', img: 'https://ui-avatars.com/api/?name=Priya+Patel&background=8b5cf6&color=fff&size=200', bio: 'Dedicated to ensuring every client receives VIP treatment from inquiry to delivery and beyond.' },
]

const values = [
  { icon: '🏆', title: 'Excellence', desc: 'We set the highest standards in every aspect of our business, from vehicle selection to customer service.' },
  { icon: '🤝', title: 'Integrity', desc: 'Transparent pricing, honest advice, and no hidden fees — we build relationships on trust.' },
  { icon: '🚀', title: 'Innovation', desc: 'Embracing the latest automotive technology to provide cutting-edge vehicles and services.' },
  { icon: '💚', title: 'Sustainability', desc: 'Committed to expanding our EV lineup and reducing our environmental footprint.' },
]

export default function About() {
  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* Hero */}
      <section className="relative py-24 bg-[#0f0f0f] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493238792000-8113da705763?w=1600&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/60 to-[#0f0f0f]" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <span className="inline-block bg-[#E63946]/20 border border-[#E63946]/40 text-[#E63946] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">Our Story</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5">About <span className="text-[#E63946]">EliteAuto</span></h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Since 2010, EliteAuto Deals has been Pakistan's — and the region's — most trusted name in premium vehicle sales, financing, and service.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-[#E63946] text-xs font-semibold tracking-widest uppercase">Who We Are</span>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2 mb-5">Driven By Passion, Defined By Quality</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-4">
              Founded in 2010 by automotive enthusiast Alexander Rhodes, EliteAuto began as a small showroom with a big vision: to make the experience of buying a luxury car as extraordinary as the vehicle itself.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-4">
              Over 15 years, we've grown into a full-service dealership representing 50+ premium brands, with a team of 60+ experts dedicated to matching every customer with their perfect vehicle.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              Today, EliteAuto is synonymous with trust, transparency, and an unmatched ownership experience.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🎯', label: 'Our Mission', text: 'To deliver a world-class automotive experience by combining premium vehicles with exceptional, personalized service.' },
              { icon: '🔭', label: 'Our Vision', text: 'To become the most trusted luxury auto dealership in South Asia, setting the benchmark for customer satisfaction.' },
              { icon: '⭐', label: 'Our Promise', text: 'Every vehicle, every interaction, every transaction — held to the highest standard of quality and integrity.' },
              { icon: '🌱', label: 'Our Future', text: 'Leading the transition to electric and hybrid vehicles while maintaining our legacy of excellence.' },
            ].map(v => (
              <div key={v.label} className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md transition-shadow">
                <span className="text-2xl block mb-2">{v.icon}</span>
                <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-2">{v.label}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#E63946] text-xs font-semibold tracking-widest uppercase">What We Stand For</span>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <span className="text-4xl block mb-3">{v.icon}</span>
                <h3 className="text-gray-900 dark:text-white font-bold text-base mb-2">{v.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#E63946] text-xs font-semibold tracking-widest uppercase">The People Behind EliteAuto</span>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2 mb-3">Meet Our Team</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
              A passionate group of automotive experts united by a shared commitment to excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map(member => (
              <div key={member.name}
                className="group bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 hover:-translate-y-1 overflow-hidden text-center p-8">
                <div className="relative inline-block mb-5">
                  <img src={member.img} alt={member.name}
                    className="w-24 h-24 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-[#E63946] rounded-full flex items-center justify-center text-white text-xs">✓</div>
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold text-lg">{member.name}</h3>
                <span className="inline-block bg-[#E63946]/10 text-[#E63946] text-xs font-semibold px-3 py-1 rounded-full mt-1.5 mb-3">
                  {member.role}
                </span>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{member.bio}</p>
                <div className="flex justify-center gap-2 mt-4">
                  {['💼', '🐦', '📧'].map(icon => (
                    <a key={icon} href="#"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#E63946] hover:text-white text-sm transition-colors no-underline">
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 bg-[#E63946] px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: '2010', label: 'Founded' },
            { val: '60+', label: 'Team Members' },
            { val: '50+', label: 'Brands' },
            { val: '2,500+', label: 'Happy Clients' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-4xl font-black text-white mb-1">{s.val}</p>
              <p className="text-red-100 text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
