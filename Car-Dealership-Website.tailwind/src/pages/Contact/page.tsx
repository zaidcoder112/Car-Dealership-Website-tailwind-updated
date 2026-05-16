import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Message sent!\nName: ${formData.name}\nSubject: ${formData.subject}`)
  }

  const inputClass = "w-full p-2.5 border border-gray-200 rounded-md bg-white text-gray-900 box-border focus:outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all"
  const labelClass = "block font-medium mb-2 text-gray-900"

  return (
    <div className="px-5 py-10 max-w-[1200px] mx-auto flex-1 w-full box-border flex flex-wrap gap-10 justify-center">

      <div className="flex-1 min-w-[300px] max-w-[500px]">
        <h2 className="text-[#E63946] text-3xl mb-4">Get in Touch</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Have questions about our inventory or want to schedule a visit?
          Fill out the form below and our team will get back to you shortly.
        </p>
        <div>
          <p className="text-gray-600 mb-2"><strong>Address:</strong> 123 Car Ave, Auto City, AC 12345</p>
          <p className="text-gray-600 mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p className="text-gray-600 mb-2"><strong>Email:</strong> support@eliteauto.com</p>
          <p className="text-gray-600 mb-2"><strong>Hours:</strong> Mon - Sat: 9 AM - 7 PM</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md flex-1 min-w-[300px] border border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="contact-name" className={labelClass}>Name</label>
            <input type="text" id="contact-name" name="name" required placeholder="Your full name"
              value={formData.name} onChange={handleChange} className={inputClass} />
          </div>
          <div className="mb-4">
            <label htmlFor="contact-email" className={labelClass}>Email Address</label>
            <input type="email" id="contact-email" name="email" required placeholder="Your email"
              value={formData.email} onChange={handleChange} className={inputClass} />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className={labelClass}>Subject</label>
            <select id="subject" name="subject" required value={formData.subject} onChange={handleChange}
              className="w-full p-2.5 border border-gray-200 rounded-md bg-white text-gray-900 appearance-none focus:outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all">
              <option value="">Select a subject</option>
              <option value="sales">Sales Inquiry</option>
              <option value="support">Customer Support</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="message" className={labelClass}>Message</label>
            <textarea id="message" name="message" rows={5} required placeholder="How can we help you?"
              value={formData.message} onChange={handleChange}
              className="w-full p-2.5 border border-gray-200 rounded-md bg-white text-gray-900 box-border focus:outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 resize-y transition-all" />
          </div>
          <button type="submit"
            className="w-full bg-[#E63946] text-white border-none rounded-md px-5 py-2.5 cursor-pointer font-semibold hover:bg-[#1A1A1A] transition-colors">
            Send Message
          </button>
        </form>
      </div>

    </div>
  )
}

export default Contact
