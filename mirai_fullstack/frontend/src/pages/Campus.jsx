import { useSEO } from '../hooks/useSEO'
import { META } from '../utils/seo'
import { useFacilities } from '../api'
import PageHero from '../components/PageHero'
import CTABanner from '../components/CTABanner'
import SectionHeader from '../components/SectionHeader'
import StatsBanner from '../components/StatsBanner'
import LoadingSpinner from '../components/LoadingSpinner'
import { FacilityTile } from '../components/BrandCard'

const B = '#AA4A44', F = '#77966D'

const campusStats = [
  { value: 'Green', suffix: '', label: 'Campus' },
  { value: '40',    suffix: '+', label: 'Specialist Spaces' },
  { value: '15k',   suffix: '+', label: 'Library Titles' },
  { value: '900',  suffix: '+', label: 'Seat Auditorium' },
]

/* Section 2 – Smart Classrooms */
const classroomFeatures = [
  { icon: '📺', title: 'Interactive Whiteboards', desc: 'Every classroom is equipped with large-format interactive displays enabling dynamic, touch-enabled lessons.' },
  { icon: '🥽', title: 'AR/VR Learning Tools', desc: 'Immersive augmented and virtual reality experiences bring complex concepts to life across subjects.' },
  { icon: '💡', title: 'Digital Integration', desc: '1 Gbps fibre internet, student devices, and learning management systems create seamless digital teaching environments.' },
  { icon: '🎙️', title: 'Smart Audio & Visual', desc: 'Crystal-clear sound systems, 4K projection, and wireless screen-sharing for collaborative and recorded sessions.' },
]

/* Section 3 – Science & Innovation Labs */
const labSpaces = [
  { icon: '🔬', title: 'Biology & Chemistry Labs', desc: 'Fully equipped labs with fume hoods, binocular microscopes, spectroscopes, and molecular modelling tools.' },
  { icon: '⚡', title: 'Physics Lab', desc: 'Precision instruments for optics, electronics, thermodynamics, and mechanics experiments aligned with IB standards.' },
  { icon: '🤖', title: 'Robotics & Innovation Studio', desc: 'Arduino kits, 3D printers, laser cutters, and electronics workbenches for project-based engineering challenges.' },
  { icon: '🧪', title: 'Experimentation Spaces', desc: 'Open-format maker spaces designed for unstructured, curiosity-driven hands-on experimentation and prototyping.' },
]

/* Section 4 – Sports Infrastructure */
const sportsSpaces = [
  { icon: '⚽', title: 'Outdoor Sports Grounds', desc: 'Multi-sport outdoor facility with football, cricket, athletics track, and field event areas.' },
  { icon: '🏀', title: 'Indoor Sports Hall', desc: 'Climate-controlled indoor hall with courts for basketball, badminton, futsal, pickleball, and volleyball.' },
  { icon: '🥋', title: 'Combat & Fitness Zones', desc: 'Dedicated dojo for taekwondo, boxing, and self-defence. Fully equipped fitness and conditioning training zone.' },
  { icon: '🎯', title: 'Speciality Sport Spaces', desc: 'Table tennis room, chess hall, air rifle shooting range, and skating rink for all-round student development.' },
]

/* Section 5 – Safety & Security */
const safetyMeasures = [
  { icon: '📹', title: 'CCTV Surveillance', desc: 'Over 200 high-definition CCTV cameras cover all campus zones — classrooms, corridors, sports areas, and entry points.' },
  { icon: '🔒', title: 'Controlled Campus Access', desc: 'Biometric and ID-card gated entry/exit systems ensure only authorised students, staff, and visitors may enter Mirai campus.' },
  { icon: '👮', title: 'Student Safety Protocols', desc: 'Trained security personnel on duty 24/7, emergency drills, and a clear crisis response framework in place at all times.' },
]

export default function Campus() {
  useSEO(META.campus)
  const { data: facilities, isLoading } = useFacilities()

  return (
    <>
      <PageHero
        title="Campus & Facilities"
        subtitle="A Green Campus purposefully designed for inspiring learning — where every corner encourages curiosity, creativity, and growth."
        breadcrumb={[{ label: 'Campus & Facilities' }]}
      />

      {/* ── Section 1: Campus Overview ───────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-4" style={{ display: 'inline-flex' }}>Campus Overview</div>
              <h2 className="font-display font-800 leading-tight mb-5"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#1C1917' }}>
                A World-Class Campus Designed for Inspired Learning
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: '#78716C' }}>
                Mirai's campus is a living, breathing learning environment. Every space — from the Smart Classrooms to the STEM Innovation Labs, the Multi-Purpose Auditorium to the sports arena — has been intentionally designed to stimulate curiosity and support different ways of learning.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#78716C' }}>
                Built on a green, expansive campus, Mirai's infrastructure reflects its pedagogical philosophy: that the environment itself is a teacher.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🌿', label: 'Green Campus Environment' },
                  { icon: '🏛️', label: 'Modern Infrastructure' },
                  { icon: '📐', label: 'Student-Friendly Design' },
                  { icon: '✨', label: 'Inspiring Learning Spaces' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white border transition-all hover:shadow-md"
                    style={{ border: '1px solid #F0EDEA' }}>
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-semibold" style={{ color: '#1C1917', fontFamily: 'var(--font-display)' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-2xl">
                <img src="/mirai_activity_3_image.jpeg"
                  alt="Mirai Experiential School green campus modern infrastructure and activity spaces"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,10,8,0.4) 0%, transparent 60%)' }} />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                  <p className="text-xs font-bold" style={{ color: '#1C1917' }}>Green Campus</p>
                  <p className="text-xs mt-0.5" style={{ color: '#78716C' }}>specialist learning spaces</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Specialist Spaces', value: 'A+' },
                  { label: 'Auditorium', value: '🏛️' },
                ].map((s, i) => (
                  <div key={i} className="p-5 rounded-2xl text-center"
                    style={{ background: i === 0 ? B : F }}>
                    <p className="text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-xs text-white/80 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsBanner stats={campusStats} />

      {/* ── Section 2: Smart Classrooms ──────────────────────────────── */}
      <section className="py-24" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-2xl">
              <img src="/mirai_school4_image.jpeg"
                alt="Smart technology-enabled classrooms at Mirai Experiential School"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,10,8,0.4) 0%, transparent 60%)' }} />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-xs font-bold" style={{ color: '#1C1917' }}>Smart Classrooms</p>
                <p className="text-xs mt-0.5" style={{ color: '#78716C' }}>Technology-enabled learning environments</p>
              </div>
            </div>
            <div>
              <div className="section-label mb-4" style={{ display: 'inline-flex' }}>Smart Classrooms</div>
              <h2 className="font-display font-800 leading-tight mb-5"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#1C1917' }}>
                Where Technology Transforms Every Lesson
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#78716C' }}>
                Every classroom at Mirai is a technology-rich environment. Interactive tools, digital integration, and high-speed connectivity ensure that teachers can deliver engaging, modern lessons across every subject and grade.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {classroomFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border transition-all hover:shadow-md"
                    style={{ border: '1px solid #F0EDEA' }}>
                    <div className="w-11 h-11 flex-shrink-0 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: i % 2 === 0 ? `${B}10` : `${F}10` }}>
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-800 text-sm mb-1"
                        style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{f.title}</h4>
                      <p className="text-xs leading-relaxed" style={{ color: '#78716C' }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Science & Innovation Labs ─────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Science & Innovation Labs" title="Hands-On Learning in World-Class Facilities"
            subtitle="Our labs are more than rooms with equipment — they are spaces where students ask questions, conduct experiments, and make discoveries." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {labSpaces.map((lab, i) => (
              <div key={i} className="flex items-start gap-6 p-8 bg-white rounded-2xl border transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ border: '1.5px solid #F0EDEA' }}>
                <div className="w-16 h-16 flex-shrink-0 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: i % 2 === 0 ? `${B}10` : `${F}10` }}>
                  {lab.icon}
                </div>
                <div>
                  <h4 className="font-display font-800 text-lg mb-2"
                    style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{lab.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{lab.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 p-8 rounded-2xl" style={{ background: `linear-gradient(135deg, ${B}06, ${F}06)`, border: `1px solid ${F}20` }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { icon: '🔬', label: '4 Dedicated Science Labs' },
                { icon: '🛠️', label: 'Full Maker Space & Studio' },
                { icon: '📐', label: 'IB-Compliant Equipment' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold text-sm" style={{ color: '#44403C', fontFamily: 'var(--font-display)' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Sports Infrastructure ─────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#1C1917' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `radial-gradient(circle at 20% 50%, ${B} 0%, transparent 40%), radial-gradient(circle at 80% 50%, ${F} 0%, transparent 40%)` }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader center label="Sports Infrastructure" title="Built for Athletes of Every Level" light
            subtitle="Mirai's sports infrastructure supports a multi-sport culture integrated with the IB physical education programme." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {sportsSpaces.map((s, i) => (
              <div key={i} className="rounded-2xl p-7 transition-all duration-300 hover:scale-[1.03]"
                style={{ background: '#262220', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
                  style={{ background: i % 2 === 0 ? `${B}30` : `${F}30` }}>
                  {s.icon}
                </div>
                <h4 className="font-display font-800 text-base mb-2"
                  style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{s.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: '#A8A29E' }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-7 rounded-2xl text-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white font-display font-800 text-lg mb-1">
              🏅 Sports integrated with the <span style={{ color: '#A8C79E' }}>IB Physical Education</span> programme
            </p>
            <p className="text-sm" style={{ color: '#A8A29E' }}>
              All facilities available to curricular, co-curricular, and elite sports academy students year-round.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 5: Safety & Security ─────────────────────────────── */}
      <section className="py-24" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-4" style={{ display: 'inline-flex' }}>Safety & Security</div>
              <h2 className="font-display font-800 leading-tight mb-5"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#1C1917' }}>
                A Secure Campus Where Students Can Focus on Learning
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#78716C' }}>
                At Mirai, student safety is non-negotiable. Our campus operates with a multi-layered security system combining technology, trained personnel, and clear protocols to create a safe environment for every student, every day.
              </p>
              <div className="space-y-5">
                {safetyMeasures.map((item, i) => (
                  <div key={i} className="flex items-start gap-5 p-6 bg-white rounded-2xl border transition-all hover:shadow-md"
                    style={{ border: '1px solid #F0EDEA' }}>
                    <div className="w-14 h-14 flex-shrink-0 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: i % 2 === 0 ? `${B}10` : `${F}10` }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-800 text-base mb-1"
                        style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{item.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-2xl">
                <img src="/mirai_activity_book_image.jpeg"
                  alt="Safe and secure learning environment at Mirai Experiential School"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,10,8,0.4) 0%, transparent 60%)' }} />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                  <p className="text-xs font-bold" style={{ color: '#1C1917' }}>24/7 Campus Security</p>
                  <p className="text-xs mt-0.5" style={{ color: '#78716C' }}>200+ CCTV cameras on campus</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'CCTV Cameras', value: '200+' },
                  { label: 'Security Cover', value: '24/7' },
                  { label: 'Secure Zones', value: '100%' },
                ].map((s, i) => (
                  <div key={i} className="p-4 rounded-2xl text-center bg-white border" style={{ border: '1px solid #F0EDEA' }}>
                    <p className="text-lg font-bold" style={{ color: i % 2 === 0 ? B : F }}>{s.value}</p>
                    <p className="text-[10px] mt-0.5 font-medium" style={{ color: '#78716C' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dynamic Facilities from API ───────────────────────────────── */}
      {isLoading ? (
        <section className="py-16"><LoadingSpinner /></section>
      ) : facilities?.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader center label="Full Inventory" title="All Campus Facilities" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {facilities.map(f => <FacilityTile key={f.id} {...f} />)}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        title="See It for Yourself"
        subtitle="Schedule a guided campus tour and experience Mirai's world-class facilities firsthand."
        primaryText="Book a Campus Visit"
        primaryTo="/contact"
        secondaryText="Enroll Now"
        secondaryTo="/student-inquiry#academic-session-header"
      />
    </>
  )
}

