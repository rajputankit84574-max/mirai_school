import { Head, Link } from '@inertiajs/react'
import PageHero from '../components/PageHero'
import CTABanner from '../components/CTABanner'
import SectionHeader from '../components/SectionHeader'
import StatsBanner from '../components/StatsBanner'

const B = '#AA4A44', F = '#77966D'

/* 6.2 Boarding Facilities */
const facilities = [
  { icon: '🛏️', title: 'Private Rooms', desc: 'Comfortable private rooms with attached bathroom and toilet, individual study desks, wardrobes, and climate control.' },
  { icon: '📚', title: 'Dedicated Study Areas', desc: 'Quiet, well-lit study rooms with high-speed WiFi, printing facilities, and supervision during prep hours.' },
  { icon: '🎮', title: 'Recreation Spaces', desc: 'Indoor games rooms, reading corners, TV lounges, and outdoor gardens for rest and recreation.' },
  { icon: '🛏️', title: 'Dining Facilities', desc: 'Spacious, hygienic dining hall serving nutritious meals with residential staff supervision during mealtimes.' },
]

/* 6.3 Daily Routine */
const routine = [
  { time: '5:45 AM', label: 'Morning Fitness', icon: '🌅', desc: 'Wake-up, morning jog or yoga, and personal hygiene routine.' },
  { time: '7:00 AM', label: 'Breakfast', icon: '🍳', desc: 'Nutritious, balanced breakfast served in the dining hall.' },
  { time: '8:00 AM', label: 'School Classes', icon: '📖', desc: 'Full academic school day following the IB curriculum timetable.' },
  { time: '3:30 PM', label: 'Sports Training', icon: '⚽', desc: 'Structured sports sessions with trained coaches on campus facilities.' },
  { time: '5:30 PM', label: 'Supervised Study Hours', icon: '✏️', desc: 'Focused prep time under academic mentors in dedicated study halls.' },
  { time: '7:30 PM', label: 'Cultural & Recreational Activities', icon: '🎭', desc: 'Music, arts, house events, clubs, and free social time with peers.' },
  { time: '9:30 PM', label: 'Lights Out', icon: '🌙', desc: 'Winding-down routine, house meetings, and structured rest time.' },
]

/* 6.4 Student Care */
const careServices = [
  { icon: '🏠', title: 'Trained Wardens', desc: 'Experienced, full-time wardens live on campus and provide round-the-clock pastoral guidance and supervision.' },
  { icon: '🎓', title: 'Academic Mentors', desc: 'Dedicated mentors support learning during prep hours, track academic progress, and liaise with teachers.' },
  { icon: '🩺', title: 'Health Services', desc: '24/7 nursing station with visiting doctors, first aid, and emergency medical protocols in place.' },
  { icon: '💬', title: 'Counselling Support', desc: 'Qualified counsellors available for emotional, social, and psychological wellbeing support for all students.' },
]

/* 6.6 Safety & Security */
const safetyFeatures = [
  { icon: '👁️', title: '24-Hour Supervision', desc: 'Dedicated residential staff are on duty around the clock, ensuring every student is accounted for at all times.' },
  { icon: '📹', title: 'CCTV Monitoring', desc: 'Comprehensive CCTV coverage across campus, dormitories, and common areas with monitored security systems.' },
  { icon: '🔒', title: 'Controlled Campus Access', desc: 'All entry and exit points are secured with biometric and ID-based access control. No unauthorised entry permitted.' },
]

const residentialStats = [
  { value: '24/7', suffix: '', label: 'Campus Security' },
  { value: '1:8',  suffix: '', label: 'Warden-to-Student Ratio' },
  { value: '100',  suffix: '%', label: 'CCTV Coverage' },
  { value: '3',    suffix: '',  label: 'Meals Per Day' },
]

export default function Residential() {
  return (
    <>
      <Head>
        <title>Residential Life (Boarding) | Mirai Experiential School</title>
        <meta name="description" content="A safe, nurturing home away from home — where students grow in independence, character, and community at Mirai boarding school." />
      </Head>

      <PageHero
        title="Residential Life (Boarding)"
        subtitle="A safe, nurturing home away from home — where students grow in independence, character, and community."
        breadcrumb={[{ label: 'Campus & Life' }, { label: 'Residential Life' }]}
      />

      {/* ── 6.1 Residential School Overview ──────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-4" style={{ display: 'inline-flex' }}>Residential School Overview</div>
              <h2 className="font-display font-800 leading-tight mb-5"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#1C1917' }}>
                A Boarding School Where Every Student Thrives
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: '#78716C' }}>
                Mirai Experiential School is a premier <strong style={{ color: '#44403C' }}>residential school with an IB curriculum</strong>, offering students a safe, structured, and inspiring environment where learning continues beyond the classroom. As a leading <strong style={{ color: '#44403C' }}>boarding school with sports</strong>, Mirai combines academic rigour with physical excellence under one roof.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#78716C' }}>
                The residential experience at Mirai promotes independence, discipline, and lifelong friendships. Students are not just educated — they are prepared for life.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '📝', label: 'Supervised Study Hours' },
                  { icon: '👑', label: 'Leadership Development' },
                  { icon: '🎭', label: 'Social & Cultural Activities' },
                  { icon: '⚽', label: 'Sports Training' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white border"
                    style={{ border: '1px solid #F0EDEA' }}>
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-semibold" style={{ color: '#1C1917', fontFamily: 'var(--font-display)' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-2xl">
              <img src="/mirai_school6_image.jpeg"
                alt="Students in boarding at Mirai Residential School with IB curriculum"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(45,18,16,0.4) 0%, transparent 60%)' }} />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-xs font-bold" style={{ color: '#1C1917' }}>Residential School with IB Curriculum</p>
                <p className="text-xs mt-0.5" style={{ color: '#78716C' }}>A home away from home since 2018</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsBanner stats={residentialStats} />

      {/* ── 6.2 Boarding Facilities ───────────────────────────────────── */}
      <section className="py-24" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Boarding Facilities" title="A Home-Like Environment on Campus"
            subtitle="Modern residential infrastructure designed for comfort, learning, and community living." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {facilities.map((f, i) => (
              <div key={i} className="flex items-start gap-6 p-8 bg-white rounded-2xl border transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ border: '1.5px solid #F0EDEA' }}>
                <div className="w-16 h-16 flex-shrink-0 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: i % 2 === 0 ? `${B}10` : `${F}10` }}>
                  {f.icon}
                </div>
                <div>
                  <h4 className="font-display font-800 text-lg mb-2"
                    style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{f.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6.3 Hostel Life & Daily Routine ──────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Hostel Life & Daily Routine" title="Structure That Sets Students Free"
            subtitle="Every day at Mirai Boarding is purposeful, balanced, and energising." />
          <div className="mt-12 relative">
            <div className="hidden lg:block absolute left-[calc(50%-1px)] top-6 bottom-6 w-0.5"
              style={{ background: `linear-gradient(to bottom, ${B}40, ${F}, ${B}40)` }} />
            <div className="space-y-6">
              {routine.map((item, i) => (
                <div key={i} className={`flex items-start gap-6 lg:gap-0 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                    <div className="inline-flex items-center gap-3 p-5 bg-white rounded-2xl shadow-sm border transition-all hover:shadow-lg"
                      style={{ border: '1.5px solid #F0EDEA' }}>
                      <span className="text-2xl">{item.icon}</span>
                      <div className={i % 2 === 0 ? 'lg:text-right' : ''}>
                        <p className="text-xs font-bold uppercase tracking-widest mb-0.5"
                          style={{ color: i % 2 === 0 ? B : F }}>{item.time}</p>
                        <h4 className="font-display font-800 text-base"
                          style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{item.label}</h4>
                        <p className="text-xs leading-relaxed mt-1" style={{ color: '#78716C' }}>{item.desc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:flex flex-shrink-0 w-6 h-6 rounded-full items-center justify-center shadow-md mt-4 z-10"
                    style={{ background: i % 2 === 0 ? B : F }}>
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6.4 Residential Student Care ─────────────────────────────── */}
      <section className="py-24" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Residential Student Care" title="Every Student — Seen, Heard & Supported"
            subtitle="Our residential care model ensures no student feels alone. Well-being is built into every aspect of boarding life." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {careServices.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 text-center transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ border: '1.5px solid #F0EDEA' }}>
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl mb-5"
                  style={{ background: i % 2 === 0 ? `${B}10` : `${F}10` }}>
                  {c.icon}
                </div>
                <h4 className="font-display font-800 text-base mb-3"
                  style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{c.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6.6 Safety & Security ────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#1C1917' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `radial-gradient(circle at 15% 50%, ${B} 0%, transparent 40%), radial-gradient(circle at 85% 50%, ${F} 0%, transparent 40%)` }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader center label="Safety & Security" title="Your Child's Safety is Our First Priority" light
            subtitle="Mirai's residential campus operates under the highest standards of safety, supervision, and child protection." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {safetyFeatures.map((s, i) => (
              <div key={i} className="rounded-2xl p-8 text-center transition-all duration-300 hover:scale-[1.03]"
                style={{ background: '#262220', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-6"
                  style={{ background: i % 2 === 0 ? `${B}30` : `${F}30` }}>
                  {s.icon}
                </div>
                <h4 className="font-display font-800 text-xl mb-3"
                  style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{s.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: '#A8A29E' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Secure Your Child's Boarding Place"
        subtitle="Boarding spots are limited. Apply early for the 2026–27 session and give your child a truly transformative residential experience."
        primaryText="Enroll Now"
        primaryTo="/student-inquiry#academic-session-header"
        secondaryText="Book Free Consultation"
        secondaryTo="/contact"
      />
    </>
  )
}
