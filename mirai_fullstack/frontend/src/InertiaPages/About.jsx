import { Link, Head } from '@inertiajs/react'
import { useEffect } from 'react'
import { useSEO } from '../hooks/useSEO'
import { META, organizationSchema } from '../utils/seo'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'

const B = '#AA4A44', F = '#77966D'

const coreValues = [
  { icon: '⚖️', title: 'Integrity', desc: 'Acting with honesty, fairness, and a strong sense of ethics in all we do.' },
  { icon: '🔍', title: 'Curiosity', desc: 'Nurturing intellectual curiosity and a lifelong passion for inquiry and discovery.' },
  { icon: '🤝', title: 'Respect', desc: 'Valuing diverse perspectives, cultures, and the inherent dignity of every individual.' },
  { icon: '🌱', title: 'Responsibility', desc: 'Taking ownership of our actions and contributing positively to our community.' },
  { icon: '🙌', title: 'Collaboration', desc: 'Working together across disciplines to solve complex problems and achieve shared goals.' },
]

export default function About() {
  useSEO(META.about, [organizationSchema()])

  return (
    <>
      <PageHero title="About Mirai Experiential School"
        subtitle="Bridging the gap between knowledge and action through inquiry-driven, experiential education."
        breadcrumb={[{ label: 'About' }]} />

      {/* 2.1 About the School */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-4" style={{ display: 'inline-flex' }}>Progressive Learning</div>
              <h2 className="font-display font-800 leading-tight mb-5"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#1C1917' }}>
                Dedicated to Inquiry and Experience
              </h2>
              <p className="leading-relaxed mb-4 text-base" style={{ color: '#78716C', fontFamily: 'var(--font-body)' }}>
                Mirai Experiential School is a progressive learning institution dedicated to inquiry-driven education, experiential learning, and global citizenship. We believe that learning is most powerful when it is rooted in real-world contexts and driven by curiosity.
              </p>
              <p className="leading-relaxed mb-8 text-base" style={{ color: '#78716C', fontFamily: 'var(--font-body)' }}>
                Our students grow through a framework that emphasizes holistic development and prepares them for the complexities of a globalized world:
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Intellectual Curiosity', icon: '✨' },
                  { label: 'Creativity', icon: '🎨' },
                  { label: 'Leadership Development', icon: '👑' },
                  { label: 'Social Responsibility', icon: '🌍' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl shadow-sm border border-stone-100 bg-white">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-semibold" style={{ color: '#1C1917' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/5] relative shadow-2xl">
              <img src="/mirai_reception2_image.jpeg"
                alt="Mirai Experiential School modern reception and welcoming area"
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <blockquote className="text-lg font-medium italic mb-2">
                  "Education is not preparation for life; education is life itself."
                </blockquote>
                <cite className="text-sm opacity-80">— John Dewey</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.2 Vision & Mission */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Our Purpose" title="Vision & Mission"
            subtitle="The compass that guides our educational journey." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="p-10 rounded-3xl bg-white border border-stone-200 shadow-sm">
              <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-3xl" style={{ border: `1px solid ${B}33`, color: B, background: `${B}08` }}>👁️</div>
              <h3 className="font-display font-800 text-2xl mb-4" style={{ color: '#1C1917' }}>Vision</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#44403C' }}>
                To develop globally minded learners who lead with knowledge, innovation, and compassion.
              </p>
            </div>
            <div className="p-10 rounded-3xl bg-white border border-stone-200 shadow-sm">
              <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-3xl" style={{ border: `1px solid ${F}33`, color: F, background: `${F}08` }}>🚀</div>
              <h3 className="font-display font-800 text-2xl mb-4" style={{ color: '#1C1917' }}>Mission</h3>
              <ul className="space-y-4">
                {[
                  'Deliver world-class experiential education',
                  'Promote holistic development',
                  'Encourage innovation and creativity',
                  'Foster global perspectives'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-forest-green mt-1 text-sm">✦</span>
                    <span className="text-base" style={{ color: '#44403C' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2.3 Why Choose Mirai */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Differentiators" title="Why Choose Mirai"
            subtitle="What sets our learning environment apart." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { title: 'Experiential IB Curriculum', icon: '🎓', desc: 'A rigorous academic framework combined with hands-on, project-based learning.' },
              { title: 'Residential Learning', icon: '🏠', desc: 'A safe, nurturing environment that fosters independence and community living.' },
              { title: 'Extensive Sports', icon: '⚽', desc: 'World-class facilities and coaching for comprehensive physical development.' },
              { title: 'Leadership & Life-skills', icon: '⭐', desc: 'Developing the soft skills and resilience needed for future success.' },
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl border border-stone-100 transition-all hover:shadow-xl hover:-translate-y-1 bg-white">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h4 className="font-display font-800 text-lg mb-3" style={{ color: '#1C1917' }}>{item.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.4 School Leadership */}
      <section className="py-24 bg-stone-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-800/30 -skew-x-12 translate-x-32" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader label="Leadership" title="Messages from our Leaders" light
            subtitle="Guiding the Mirai community with vision and purpose." />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
            {[
              { role: 'Chairman Sir', name: 'Dr. KP Singh', image: '/chairmansir_photo.jpeg', msg: 'Our goal is to create a legacy of learners who are not just academically brilliant, but humanely compassionate.' },
              { role: 'Managing Director', name: 'Siddhant Singh', image: null, msg: 'We bridge the gap between traditional excellence and modern innovation to provide a truly global education.' },
              { role: 'Principal', name: 'Pankaj Kumar', image: '/principal_sir_photo.jpeg', msg: 'Every child at Mirai is seen, heard, and encouraged to explore their unique potential in a supportive environment.' },
            ].map((leader, i) => (
              <div key={i} className="flex flex-col">
                <div className="mb-6 relative group">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-stone-800 shadow-2xl relative">
                    {leader.image ? (
                      <img 
                        src={leader.image} 
                        alt={leader.name} 
                        className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:rotate-1" 
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-stone-800 border-2 border-dashed border-stone-700">
                        <div className="w-20 h-20 rounded-full bg-stone-700/50 flex items-center justify-center mb-4">
                          <svg className="w-10 h-10 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="text-stone-500 font-display font-bold text-xs uppercase tracking-widest">Coming Soon</span>
                      </div>
                    )}
                    {/* Role Badge Overlay */}
                    <div className="absolute bottom-6 left-6 bg-white text-stone-900 px-4 py-2 rounded-xl font-display font-bold text-[10px] uppercase tracking-widest shadow-xl z-20"
                         style={{ color: '#1C1917' }}>
                      {leader.role}
                    </div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-60" />
                  </div>
                </div>
                <h4 className="font-display font-800 text-xl mb-3">{leader.name}</h4>
                <p className="text-stone-400 text-sm leading-relaxed italic">"{leader.msg}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 Core Values (ICR-RC) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Our DNA" title="Core Values (ICR-RC)"
            subtitle="The fundamental principles that define our culture and actions." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0.5 mt-12 rounded-3xl overflow-hidden border border-stone-200">
            {coreValues.map((v, i) => (
              <div key={i} className="p-8 text-center transition-all hover:bg-stone-50 cursor-default bg-white border-r border-b border-stone-100 last:border-r-0">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h4 className="font-display font-800 text-lg mb-3" style={{ color: '#1C1917' }}>{v.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#78716C' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title="Experience Mirai Firsthand"
        subtitle="Schedule a campus tour to see our experiential learning methodology in action." />
    </>
  )
}

