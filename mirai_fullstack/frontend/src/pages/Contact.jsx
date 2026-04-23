import { useState } from 'react'
import { useSubmitEnquiry } from '../api'
import { useSEO } from '../hooks/useSEO'
import { META, organizationSchema } from '../utils/seo'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'

const B = '#AA4A44', F = '#77966D'

const GRADE_OPTIONS = [
  { value: 'EYP', label: 'Early Years (EYP)' },
  { value: 'PYP', label: 'Primary (PYP)' },
  { value: 'MYP', label: 'Middle Years (MYP)' },
  { value: 'DP', label: 'Diploma Programme (DP)' },
]

const ADMISSIONS_PHONE = '9599931471'
const ADMISSIONS_PHONE_DISPLAY = '+91 95999 31471'

const info = [
  { icon: '📍', title: 'Main Campus', detail: 'DOO/BKL, Ansal Avantika, Ghaziabad, Delhi NCR, India, 201002', sub: 'Open for visits Mon–Sat', href: 'https://maps.google.com/?q=DOO/BKL,Ansal+Avantika,Ghaziabad,Delhi+NCR,India,201002' },
  { icon: '📞', title: 'Admissions Office', detail: ADMISSIONS_PHONE_DISPLAY, sub: 'Mon–Sat · 8:00 AM – 6:00 PM IST', href: `tel:${ADMISSIONS_PHONE}` },
  { icon: '✉️', title: 'Email Us', detail: 'admit@miraischool.in', sub: 'Expected response within 4 hours', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=admit@miraischool.in' },
  { icon: '💬', title: 'WhatsApp Support', detail: ADMISSIONS_PHONE_DISPLAY, sub: 'Chat with us for instant assistance', href: `https://wa.me/91${ADMISSIONS_PHONE}?text=Hi%2C%20I%27m%20interested%20in%20learning%20more%20about%20Mirai%20School.` },
]

const EMPTY = { parent_name: '', email: '', phone: '', student_name: '', grade_applying: '', message: '' }

const emailRe  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const mobileRe = /^\d{10}$/
const letters  = /^[A-Za-z\s]+$/

export default function Contact() {
  useSEO(META.contact, [organizationSchema()])

  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(null)
  const mutation = useSubmitEnquiry()

  const handle = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    // Clear error when user changes input
    if (errors[name]) setErrors(errs => ({ ...errs, [name]: null }))
  }

  const validate = () => {
    const errs = {}
    
    const pname = form.parent_name.trim()
    if (!pname) errs.parent_name = 'Parent name is required'
    else if (!letters.test(pname)) errs.parent_name = 'Letters and spaces only'
    
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!emailRe.test(form.email.trim())) errs.email = 'Invalid email format'
    
    const ph = form.phone.replace(/\D/g, '')
    if (!form.phone.trim()) errs.phone = 'Phone number is required'
    else if (!mobileRe.test(ph)) errs.phone = 'Must be exactly 10 digits'
    
    const sname = form.student_name.trim()
    if (sname && !letters.test(sname)) errs.student_name = 'Letters and spaces only'
    
    if (!form.grade_applying) errs.grade_applying = 'Please select a programme'

    return errs
  }

  const submit = e => {
    e.preventDefault()
    setSuccess(null)
    setErrors({})

    const clientErrors = validate()
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors)
      return
    }

    mutation.mutate(form, {
      onSuccess: data => {
        setSuccess(data.message || 'Your inquiry has been sent successfully!')
        setForm(EMPTY)
        setErrors({})
        mutation.reset()
      },
      onError: err => {
        if (err.isValidationError) setErrors(err.fieldErrors)
      }
    })
  }

  const serverGeneralError = mutation.isError && !mutation.error?.isValidationError ? mutation.error?.message : null
  const fe = errors // convenient shorthand for field errors

  return (
    <>
      <PageHero
        title="Connect with Mirai"
        subtitle="Experience the future of education. Book a campus tour, request a brochure, or speak with our admissions experts."
        breadcrumb={[{ label: 'Contact' }]}
      />

      <section className="py-24" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* ── Left Column: Contact Methods & Info ────────────────── */}
            <div className="lg:col-span-5 space-y-8">
              <SectionHeader
                label="Admissions Office"
                title="We're Here to Help Your Child Succeed"
                subtitle="Reach our admissions team directly to schedule a campus visit, submit an enquiry, or speak with our counsellors."
              />

              {/* ── Quick action highlight ────── */}
              <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: `${B}08`, border: `1.5px solid ${B}20` }}>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: B, fontFamily: 'var(--font-display)' }}>Parents can:</p>
                {['📅 Schedule a campus visit & guided tour', '📋 Submit an admissions enquiry online or by phone', '🤝 Speak directly with the admissions counselling team'].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm" style={{ color: '#44403C', fontFamily: 'var(--font-body)' }}>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {info.map((item, i) => {
                  const Card = (
                    <div className="bg-white p-6 rounded-2xl flex items-start gap-4 transition-all hover:shadow-lg hover:-translate-y-1 w-full"
                      style={{ border: '1.5px solid #F0EDEA' }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ background: i % 2 === 0 ? `${B}10` : `${F}10`, color: i % 2 === 0 ? B : F }}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#A8A29E', fontFamily: 'var(--font-display)' }}>
                          {item.title}
                        </h4>
                        <p className="text-base font-bold mb-0.5" style={{ color: '#1C1917', fontFamily: 'var(--font-display)' }}>{item.detail}</p>
                        <p className="text-xs" style={{ color: '#78716C', fontFamily: 'var(--font-body)' }}>{item.sub}</p>
                      </div>
                      {item.href && (
                        <div className="flex-shrink-0 self-center">
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                            style={{ background: i % 2 === 0 ? `${B}15` : `${F}15`, color: i % 2 === 0 ? B : F }}>
                            {i === 1 ? 'Call' : i === 2 ? 'Email' : 'Chat'} →
                          </span>
                        </div>
                      )}
                    </div>
                  )
                  return item.href ? (
                    <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : '_self'}
                       rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                      {Card}
                    </a>
                  ) : (
                    <div key={i}>{Card}</div>
                  )
                })}
              </div>

              {/* ── Prominent mobile call button ────── */}
              <a href={`tel:${ADMISSIONS_PHONE}`}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-display font-900 text-white text-sm uppercase tracking-widest transition-all hover:shadow-xl hover:brightness-110 active:scale-[0.98]"
                style={{ background: `linear-gradient(135deg, ${B}, #C9645D)`, fontFamily: 'var(--font-display)', fontWeight: 900, textDecoration: 'none' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                </svg>
                📞 Call Admissions: {ADMISSIONS_PHONE_DISPLAY}
              </a>

              {/* Social Media Connectivity */}
              <div className="p-8 rounded-3xl text-white" style={{ background: `linear-gradient(135deg, #1C1917, #2D1210)` }}>
                <h4 className="font-display font-800 text-lg mb-4">Follow Our Journey</h4>
                <div className="flex gap-4">
                  {['Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map(social => (
                    <div key={social} className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <span className="text-xs font-bold">{social[0]}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs leading-relaxed opacity-60">
                  Stay updated with daily snapshots of school life, events, and educational insights.
                </p>
              </div>
            </div>

            {/* ── Right Column: Interactive Inquiry Form ──────────────── */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden" 
                   style={{ border: '1.5px solid #F0EDEA' }}>
                
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-stone-50 rounded-bl-[100%] z-0" />
                
                <div className="relative z-10 text-center mb-10">
                  <h3 className="font-display font-900 text-3xl mb-3" style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 900 }}>
                    Admissions Enquiry
                  </h3>
                  <p className="text-sm font-medium" style={{ color: '#78716C', fontFamily: 'var(--font-body)' }}>
                    Fill out the form below to receive our prospectus or book a tour.
                  </p>
                </div>

                {success && (
                  <div className="mb-8 p-5 rounded-2xl text-center font-bold text-sm animate-fade-in" 
                       style={{ background: `${F}15`, color: F, border: `1.5px solid ${F}30` }}>
                    ✨ {success}
                  </div>
                )}
                {serverGeneralError && (
                  <div className="mb-8 p-5 rounded-2xl text-center font-bold text-sm" 
                       style={{ background: `${B}15`, color: B, border: `1.5px solid ${B}30` }}>
                    ⚠️ {serverGeneralError}
                  </div>
                )}

                <form onSubmit={submit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest px-1" style={{ color: '#1C1917' }}>Parent's Name *</label>
                      <input type="text" name="parent_name" value={form.parent_name} onChange={handle} 
                             placeholder="Ex: John Doe" className={`form-input ${fe.parent_name ? 'error' : ''}`}
                             style={fe.parent_name ? { borderColor: B } : {}} />
                      {fe.parent_name && <p className="text-[10px] font-bold text-red-500 px-1 mt-1">{fe.parent_name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest px-1" style={{ color: '#1C1917' }}>Contact Email *</label>
                      <input type="email" name="email" value={form.email} onChange={handle} 
                             placeholder="john@example.com" className={`form-input ${fe.email ? 'error' : ''}`}
                             style={fe.email ? { borderColor: B } : {}} />
                      {fe.email && <p className="text-[10px] font-bold text-red-500 px-1 mt-1">{fe.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest px-1" style={{ color: '#1C1917' }}>Phone Number *</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handle} 
                             placeholder="10-digit mobile number" className={`form-input ${fe.phone ? 'error' : ''}`}
                             style={fe.phone ? { borderColor: B } : {}} />
                      {fe.phone && <p className="text-[10px] font-bold text-red-500 px-1 mt-1">{fe.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest px-1" style={{ color: '#1C1917' }}>Student's Name</label>
                      <input type="text" name="student_name" value={form.student_name} onChange={handle} 
                             placeholder="Full name" className={`form-input ${fe.student_name ? 'error' : ''}`}
                             style={fe.student_name ? { borderColor: B } : {}} />
                      {fe.student_name && <p className="text-[10px] font-bold text-red-500 px-1 mt-1">{fe.student_name}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest px-1" style={{ color: '#1C1917' }}>Applying for Programme *</label>
                    <select name="grade_applying" value={form.grade_applying} onChange={handle} 
                            className={`form-input ${fe.grade_applying ? 'error' : ''}`}
                            style={fe.grade_applying ? { borderColor: B } : {}}>
                      <option value="">Select Programme / Grade...</option>
                      {GRADE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                    {fe.grade_applying && <p className="text-[10px] font-bold text-red-500 px-1 mt-1">{fe.grade_applying}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest px-1" style={{ color: '#1C1917' }}>Your Message / Questions</label>
                    <textarea name="message" value={form.message} onChange={handle} rows={4} 
                              placeholder="Tell us what you're looking for..." className="form-input" style={{ resize: 'none' }} />
                  </div>

                  <button type="submit" disabled={mutation.isPending}
                    className="w-full py-5 rounded-2xl font-display font-900 text-sm uppercase tracking-widest text-white transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
                    style={{ background: B, fontFamily: 'var(--font-display)', fontWeight: 900 }}>
                    {mutation.isPending ? 'Sending Inquiry...' : 'Submit Inquiry / Book Visit →'}
                  </button>
                  
                  <p className="text-center text-[10px] text-stone-400 font-medium">
                    By submitting, you agree to our privacy policy and consent to mirror contact.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map / Reach Us Section ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-[40px] overflow-hidden relative shadow-2xl h-[500px] bg-stone-100 group"
               style={{ border: '1.5px solid #F0EDEA' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.31558296!2d77.46!3d28.68!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQwJzQ4LjAiTiA3N8KwMjcnMzYuMCJF!5e0!3m2!1sen!2sin!4v1713690000000!5m2!1sen!2sin&q=DOO/BKL,Ansal+Avantika,Ghaziabad,Delhi+NCR,India,201002"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mirai Experiential School Location"
            />
            {/* Floating "Get Directions" button */}
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=DOO/BKL,Ansal+Avantika,Ghaziabad,India,201002"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 right-6 btn shadow-2xl flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              style={{ 
                background: 'white', 
                color: '#1C1917', 
                fontFamily: 'var(--font-display)', 
                fontWeight: 800,
                textDecoration: 'none',
                padding: '12px 24px',
                borderRadius: '16px',
                fontSize: '0.85rem'
              }}
            >
              <span className="text-xl">🚀</span>
              Get Directions →
            </a>
          </div>
          <div className="mt-8 text-center">
            <h4 className="font-display font-800 text-xl mb-2" style={{ color: '#1C1917' }}>Visit Our Campus</h4>
            <p className="text-stone-500 max-w-2xl mx-auto">
              DOO/BKL, Ansal Avantika, Ghaziabad, Delhi NCR, India, 201002
            </p>
          </div>
        </div>
      </section>

      <CTABanner
        title="Experience Mirai in Person"
        subtitle="Virtual tours and photos can only show so much. Feel the energy of our campus firsthand."
        primaryText="Schedule a School Visit"
        primaryTo="/contact"
        secondaryText="Enroll Now"
        secondaryTo="/student-inquiry#academic-session-header"
      />
    </>
  )
}

