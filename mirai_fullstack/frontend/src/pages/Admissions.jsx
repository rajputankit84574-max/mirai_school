import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useAdmissionSteps } from '../api'
import { useSEO } from '../hooks/useSEO'
import { META, faqSchema, organizationSchema } from '../utils/seo'
import { useFAQs } from '../api'
import FAQSection from '../components/FAQSection'
import LeadMagnet from '../components/LeadMagnet'
import InquiryForm from '../components/InquiryForm'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import StatsBanner from '../components/StatsBanner'
import LoadingSpinner from '../components/LoadingSpinner'

const B = '#AA4A44', F = '#77966D'

/* Section 3 – Age Criteria */
const ageCriteria = [
  {
    programme: 'Early Years Programme',
    short: 'EYP',
    age: '3 – 6 years',
    grades: 'Nursery, LKG, UKG',
    icon: '🌱',
    desc: 'Foundational years focused on play-based, inquiry-led learning in a nurturing environment.',
  },
  {
    programme: 'Primary Years Programme',
    short: 'PYP',
    age: '6 – 12 years',
    grades: 'Grade 1 – Grade 6',
    icon: '📚',
    desc: 'Concept-driven learning across six transdisciplinary themes, building curiosity and critical thinking.',
  },
  {
    programme: 'Middle Years Programme',
    short: 'MYP',
    age: '12 – 16 years',
    grades: 'Grade 7 – Grade 10',
    icon: '🔭',
    desc: 'Rigorous interdisciplinary curriculum preparing students for higher thinking, global challenges, and the IB Diploma.',
  },
]

/* Section 5 – Scholarships */
const scholarships = [
  {
    icon: '🏆',
    title: 'Merit Scholarship',
    desc: 'Awarded to students who demonstrate outstanding academic performance in their previous school assessments and entrance interaction.',
    badge: 'Academic Excellence',
  },
  {
    icon: '🌟',
    title: 'Sports Scholarship',
    desc: 'Reserved for students with nationally or state-recognised achievements in sports and athletics, supporting their dual pursuit of sport and academics.',
    badge: 'Athletic Achievement',
  },
  {
    icon: '🎨',
    title: 'Arts & Creativity Award',
    desc: 'Available for students who demonstrate exceptional talent in visual arts, performing arts, music, dance, or creative disciplines.',
    badge: 'Creative Excellence',
  },
  {
    icon: '🤝',
    title: 'Need-Based Support',
    desc: 'Mirai is committed to making quality education accessible. Need-based financial support is available for deserving families on application.',
    badge: 'Financial Support',
  },
]

const admissionsStats = [
  { value: '4',   suffix: ' Steps', label: 'Admission Process' },
  { value: '3',   suffix: '+',      label: 'IB Programmes' },
  { value: '100', suffix: '%',      label: 'Transparent Process' },
  { value: '2026', suffix: '–27',   label: 'Enrolment Open' },
]

export default function Admissions() {
  const { data: steps, isLoading: stepsLoading } = useAdmissionSteps()
  const { data: faqData } = useFAQs('admissions')
  const faqs = Array.isArray(faqData) ? faqData : faqData?.results ?? []
  useSEO(META.admissions, [faqSchema(faqs), organizationSchema()])

  const location = useLocation()
  const stepsArr = steps ?? []

  useEffect(() => {
    if (location.hash === '#admission-form') {
      const el = document.getElementById('admission-form')
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location.hash])

  return (
    <>
      <PageHero
        title="Admissions 2026–27"
        subtitle="Join India's leading IB experiential school. A transparent, parent-friendly process designed to find the right fit for every child."
        breadcrumb={[{ label: 'Admissions' }]}
      />

      {/* ── Section 1: Admission Overview ────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-4" style={{ display: 'inline-flex' }}>Admission Overview</div>
              <h2 className="font-display font-800 leading-tight mb-5"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#1C1917' }}>
                Welcome to the Mirai Family
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: '#78716C' }}>
                At Mirai Experiential School, we believe every child brings a unique spark. Our admissions process is not a filter — it is a <strong style={{ color: '#44403C' }}>conversation</strong>. We take time to understand each child's strengths, learning style, and potential before offering a place.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#78716C' }}>
                Whether you are enrolling your child for the first time or transitioning from another school, our team is here to guide you warmly and clearly through every step.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '✅', label: 'Transparent Process' },
                  { icon: '🤝', label: 'Parent-Friendly Approach' },
                  { icon: '🎓', label: 'IB-Certified School' },
                  { icon: '🏠', label: 'Day & Boarding Options' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-stone-50 border transition-all hover:shadow-md"
                    style={{ border: '1px solid #F0EDEA' }}>
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-semibold" style={{ color: '#1C1917', fontFamily: 'var(--font-display)' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-2xl">
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=85&auto=format"
                alt="Parents and students at Mirai Experiential School admissions"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,10,8,0.4) 0%, transparent 60%)' }} />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-xs font-bold" style={{ color: '#1C1917' }}>Enrolments Open — 2026–27</p>
                <p className="text-xs mt-0.5" style={{ color: '#78716C' }}>Limited seats available. Apply early.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsBanner stats={admissionsStats} />

      {/* ── Section 2: Admission Process ─────────────────────────────── */}
      <section className="py-24" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Admission Process" title="4 Simple Steps to Join Mirai"
            subtitle="We've designed a clear, straightforward process so every family knows exactly what to expect." />
          {stepsLoading ? <LoadingSpinner /> : (
            <div className="relative mt-14">
              {/* Timeline connector */}
              <div className="absolute top-10 left-[12%] right-[12%] h-0.5 hidden lg:block"
                style={{ background: `linear-gradient(90deg, ${B}, ${F})` }} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {(stepsArr.length ? stepsArr : [
                  { step_number: 1, title: 'Registration', description: 'Complete the online enquiry form with your child\'s details, preferred programme, and contact information.', icon: '📝' },
                  { step_number: 2, title: 'Campus Visit', description: 'Schedule a campus tour. Experience the facilities and meet our academic team in person.', icon: '🏫' },
                  { step_number: 3, title: 'Interaction & Assessment', description: 'An informal interaction session with the child and parents to understand learning needs and school fit.', icon: '🤝' },
                  { step_number: 4, title: 'Admission Confirmation', description: 'Receive your official offer letter. Complete documentation and fee payment to confirm your child\'s place.', icon: '🎉' },
                ]).map((step, i) => (
                  <div key={step.step_number} className="text-center px-4 pt-2">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-5 relative"
                      style={{ background: i % 2 === 0 ? B : F, boxShadow: `0 0 0 4px white, 0 0 0 6px ${i % 2 === 0 ? B : F}33` }}>
                      {step.icon || step.step_number}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ color: i % 2 === 0 ? B : F, fontFamily: 'var(--font-display)' }}>
                      Step {step.step_number}
                    </div>
                    <h4 className="font-display font-800 text-lg mb-2"
                      style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{step.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-14 text-center">
            <Link to="/student-inquiry#academic-session-header"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-sm font-bold transition-all hover:shadow-xl hover:-translate-y-1"
              style={{ background: B, fontFamily: 'var(--font-display)', textDecoration: 'none' }}>
              📝 Start Your Application
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 3: Age Criteria ───────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Age Criteria" title="Which Programme Is Right for Your Child?"
            subtitle="Mirai offers three IB programmes covering different age groups. Find the right starting point for your child." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {ageCriteria.map((prog, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ border: '1.5px solid #F0EDEA' }}>
                <div className="h-2" style={{ background: i === 0 ? F : i === 1 ? B : `linear-gradient(90deg, ${B}, ${F})` }} />
                <div className="p-8">
                  <div className="text-5xl mb-5">{prog.icon}</div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4"
                    style={{ background: i % 2 === 0 ? `${F}12` : `${B}10`, color: i % 2 === 0 ? F : B }}>
                    {prog.short}
                  </div>
                  <h4 className="font-display font-800 text-xl mb-3"
                    style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{prog.programme}</h4>
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: '#FAFAF8', border: '1px solid #F0EDEA' }}>
                      <span className="text-sm">🎂</span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#A8A29E' }}>Age Eligibility</p>
                        <p className="text-sm font-bold" style={{ color: '#1C1917', fontFamily: 'var(--font-display)' }}>{prog.age}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: '#FAFAF8', border: '1px solid #F0EDEA' }}>
                      <span className="text-sm">📋</span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#A8A29E' }}>Classes</p>
                        <p className="text-sm font-bold" style={{ color: '#1C1917', fontFamily: 'var(--font-display)' }}>{prog.grades}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{prog.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 rounded-2xl text-center" style={{ background: `${F}08`, border: `1px solid ${F}20` }}>
            <p className="text-sm font-medium" style={{ color: '#44403C' }}>
              📌 Age is calculated as of <strong>31st March</strong> of the year of admission. If unsure, our admissions team will guide you to the correct programme.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 4: Fee Structure (Download Only) ─────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#1C1917' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `radial-gradient(circle at 20% 50%, ${B} 0%, transparent 40%), radial-gradient(circle at 80% 50%, ${F} 0%, transparent 40%)` }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="text-5xl mb-6">💰</div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6"
            style={{ background: `${F}25`, color: '#A8C79E', border: `1px solid ${F}30` }}>
            Fee Structure
          </div>
          <h2 className="font-display font-800 mb-5"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: 'white' }}>
            Transparent Investment in Your Child's Future
          </h2>
          <p className="text-base leading-relaxed mb-4 mx-auto max-w-2xl" style={{ color: '#A8A29E' }}>
            Mirai's fee structure is designed to reflect the quality of an IB-certified experiential education. Our fees are all-inclusive and transparent — covering tuition, activities, resources, and more.
          </p>
          <p className="text-sm leading-relaxed mb-10 mx-auto max-w-xl" style={{ color: '#78716C' }}>
            Download the official fee document to review the full breakdown for the 2026–27 academic year, including boarding and day scholar options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/fees-structure-2026-27.pdf"
              download="Statement of Fee 2026-27.pdf"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white text-sm font-bold transition-all hover:shadow-2xl hover:-translate-y-1 hover:scale-105"
              style={{ background: B, fontFamily: 'var(--font-display)', boxShadow: `0 4px 20px ${B}50` }}>
              📥 Download Fee Structure (2026–27)
            </a>
            <a href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold transition-all hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', fontFamily: 'var(--font-display)' }}>
              📞 Speak to Admissions Team
            </a>
          </div>
          <p className="text-xs mt-6" style={{ color: '#78716C' }}>
            PDF — Statement of Fee 2026–27 · Official Document · Mirai Experiential School
          </p>
        </div>
      </section>

      {/* ── Section 5: Scholarships ───────────────────────────────────── */}
      <section className="py-24" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Scholarships" title="Recognising & Supporting Excellence"
            subtitle="Mirai believes every deserving student should have access to world-class education, regardless of background." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {scholarships.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ border: '1.5px solid #F0EDEA' }}>
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 flex-shrink-0 rounded-2xl flex items-center justify-center text-3xl"
                    style={{ background: i % 2 === 0 ? `${B}10` : `${F}10` }}>
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h4 className="font-display font-800 text-lg"
                        style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{s.title}</h4>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ background: i % 2 === 0 ? `${B}12` : `${F}10`, color: i % 2 === 0 ? B : F }}>
                        {s.badge}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 p-8 rounded-2xl text-center" style={{ background: `linear-gradient(135deg, ${B}06, ${F}06)`, border: `1px solid ${F}20` }}>
            <p className="text-base font-display font-800 mb-2" style={{ color: '#1C1917', fontFamily: 'var(--font-display)' }}>
              🌟 Scholarship applications are reviewed as part of the standard admission process.
            </p>
            <p className="text-sm mb-6" style={{ color: '#78716C' }}>
              Indicate your interest in a scholarship when submitting your enquiry form. Our team will share the relevant criteria and timeline.
            </p>
            <a href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold transition-all hover:shadow-xl hover:-translate-y-1"
              style={{ background: F, fontFamily: 'var(--font-display)' }}>
              Apply for Scholarship
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 6: Campus Tour Booking ───────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-4" style={{ display: 'inline-flex' }}>Campus Tour</div>
              <h2 className="font-display font-800 leading-tight mb-5"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#1C1917' }}>
                See Mirai for Yourself — Book a Campus Visit
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#78716C' }}>
                The best way to experience Mirai is to walk through it. Our guided campus tours give families an up-close look at the classrooms, labs, sports facilities, boarding houses, and the people who make this school extraordinary.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: '🗓️', title: 'Flexible Scheduling', desc: 'Tours available Monday to Saturday, 9 AM – 1 PM. Weekend slots available on request.' },
                  { icon: '🏛️', title: 'Full Campus Experience', desc: 'Walk through classrooms, labs, sports zones, arts studios, and boarding facilities with a dedicated guide.' },
                  { icon: '👩‍🏫', title: 'Meet Our Faculty', desc: 'Interact with IB-trained teachers and our admissions coordinator during your visit.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-stone-50 rounded-2xl border"
                    style={{ border: '1px solid #F0EDEA' }}>
                    <div className="w-11 h-11 flex-shrink-0 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: i % 2 === 0 ? `${F}12` : `${B}10` }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-800 text-sm mb-1"
                        style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{item.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white text-sm font-bold transition-all hover:shadow-xl hover:-translate-y-1"
                  style={{ background: B, fontFamily: 'var(--font-display)' }}>
                  🗓️ Book a Campus Tour
                </a>
                <a href="tel:+919599931471"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold transition-all hover:-translate-y-1"
                  style={{ background: '#F5F3F0', color: '#1C1917', fontFamily: 'var(--font-display)' }}>
                  📞 Call Admissions
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-2xl">
                <img src="/mirai_reception3_image.jpeg"
                  alt="Modern reception and welcoming area for campus tours at Mirai Experiential School"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,10,8,0.4) 0%, transparent 60%)' }} />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                  <p className="text-xs font-bold" style={{ color: '#1C1917' }}>Free Campus Tour</p>
                  <p className="text-xs mt-0.5" style={{ color: '#78716C' }}>Mon–Sat · 9 AM – 1 PM</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl" style={{ background: `${B}08`, border: `1px solid ${B}20` }}>
                <p className="text-sm font-medium text-center" style={{ color: '#44403C' }}>
                  🎓 <strong>Demo Class Available</strong> — Request a complimentary trial class for your child during the campus visit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ, Lead Magnet & Inquiry Form ──────────────────────────── */}
      <FAQSection category="admissions" maxItems={5} />
      <LeadMagnet />

      <section id="admission-form" className="py-24" style={{ background: '#FAFAF8' }}>
        <div className="max-w-3xl mx-auto px-6">
          <InquiryForm />
        </div>
      </section>
    </>
  )
}

