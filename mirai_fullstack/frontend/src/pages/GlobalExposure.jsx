import { useSEO } from '../hooks/useSEO'
import { META, organizationSchema } from '../utils/seo'
import PageHero from '../components/PageHero'
import CTABanner from '../components/CTABanner'
import SectionHeader from '../components/SectionHeader'
import StatsBanner from '../components/StatsBanner'

const B = '#AA4A44', F = '#77966D'

const globalStats = [
  { value: 'Global', suffix: '', label: 'Presence on Campus' },
  { value: '120',    suffix: '+', label: 'University Pathways' },
  { value: '10',     suffix: '+', label: 'Global Study Programs' },
  { value: '200',    suffix: '+', label: 'MUN Delegates Annually' },
]

/* 9.1 International Collaborations */
const collaborations = [
  { icon: '🏫', title: 'International Academic Exposure', desc: 'Curriculum alignments and educational exchanges with schools in Singapore, the UK, Australia, Canada, and the USA — enabling shared learning and cross-cultural projects.' },
  { icon: '📡', title: 'Cross-Border Learning', desc: 'Virtual classrooms and co-taught units connect Mirai students with peers abroad, creating authentic cross-cultural academic experiences in real time.' },
  { icon: '🌐', title: 'Global Academic Practices', desc: 'Mirai adopts international pedagogy benchmarks — from IB standards to Harvard\'s project-based frameworks — keeping our students aligned with the world\'s best.' },
  { icon: '🎓', title: 'University Pathways', desc: 'Students gain access to global university prep, including early campus insights, mentorship programmes, and tailored admission pathways for Mirai graduates.' },
]

/* 9.2 Cultural Exchange Programs */
const exchangePrograms = [
  { icon: '✈️', title: 'Student Exchange Initiatives', desc: 'Students spend 2–4 weeks studying and living with families abroad, attending host schools and experiencing life in a new country and culture.' },
  { icon: '🏡', title: 'Cultural Immersion Experiences', desc: 'Structured homestay programmes, city immersion tours, and local school integration give students an unfiltered view of life beyond their own borders.' },
  { icon: '🗣️', title: 'Intercultural Understanding', desc: 'Weekly cultural dialogues, global perspectives assemblies, and multilingual days build deep empathy, respect, and appreciation for global diversity.' },
]

/* 9.3 Global Competitions */
const competitions = [
  { icon: '🧪', category: 'Academic', title: 'Science & Math Olympiads', desc: 'Students represent India in International Science Olympiads, World Mathematics Championships, and Harvard Model Congress Asia.' },
  { icon: '🏅', category: 'Sports', title: 'International Sports Events', desc: 'Our athletes compete in regional and global tournaments in football, swimming, athletics, and cricket across South and Southeast Asia.' },
  { icon: '💡', category: 'Innovation', title: 'Tech & Innovation Challenges', desc: 'Mirai teams participate in Google Science Fair, Microsoft Imagine Cup, and global robotics FIRST competitions, consistently reaching finals.' },
  { icon: '🎤', category: 'Leadership', title: 'Model United Nations (MUN)', desc: "Mirai hosts one of India's largest school-level MUN conferences and sends delegations to Oxford, Harvard, and Singapore MUN annually." },
  { icon: '✍️', category: 'Creative', title: 'Global Essay & Debate', desc: 'Participation in World Scholar\'s Cup, John Locke Essay competition, and International Debate Championships builds academic confidence and voice.' },
  { icon: '🌍', category: 'Service', title: 'Youth Global Action Projects', desc: 'Students submit solutions to UN SDG challenges and participate in international youth summits, representing India on the global stage.' },
]

export default function GlobalExposure() {
  useSEO(META.globalExposure, [organizationSchema()])

  return (
    <>
      <PageHero
        title="Global Exposure"
        subtitle="We prepare students not just for universities — but for a complex, interconnected, and opportunity-filled world."
        breadcrumb={[{ label: 'Academics' }, { label: 'Global Exposure' }]}
      />

      {/* ── 9.1 International Collaborations ─────────────────────────── */}
      <section className="py-24" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="International Exposure" title="Pathways to the World's Best Institutions"
            subtitle="Mirai's global outlook and educational pathways open doors that extend far beyond the classroom." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {collaborations.map((item, i) => (
              <div key={i} className="flex items-start gap-6 p-8 bg-white rounded-2xl border transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ border: '1.5px solid #F0EDEA' }}>
                <div className="w-16 h-16 flex-shrink-0 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: i % 2 === 0 ? `${B}10` : `${F}10` }}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-display font-800 text-lg mb-2"
                    style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{item.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Partnership logos strip */}
          <div className="mt-14 p-8 rounded-2xl text-center" style={{ background: 'white', border: '1.5px solid #F0EDEA' }}>
            <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#A8A29E' }}>Popular Study Destinations</p>
            <div className="flex flex-wrap justify-center gap-4">
              {['🇬🇧 United Kingdom', '🇺🇸 United States', '🇸🇬 Singapore', '🇦🇺 Australia', '🇨🇦 Canada', '🇯🇵 Japan', '🇫🇷 France', '🇩🇪 Germany'].map((region, i) => (
                <span key={i} className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ background: '#F5F5F4', color: '#44403C', fontFamily: 'var(--font-body)' }}>
                  {region}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StatsBanner stats={globalStats} />

      {/* ── 9.2 Cultural Exchange Programs ───────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-4" style={{ display: 'inline-flex' }}>Cultural Exchange Programs</div>
              <h2 className="font-display font-800 leading-tight mb-5"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#1C1917' }}>
                Experiencing the World, Not Just Learning About It
              </h2>
              <p className="text-base leading-relaxed mb-10" style={{ color: '#78716C' }}>
                Mirai's cultural exchange programmes go beyond tourism. Students live, study, and connect with peers across the globe — developing intercultural empathy that no classroom can replicate.
              </p>
              <div className="space-y-6">
                {exchangePrograms.map((prog, i) => (
                  <div key={i} className="flex items-start gap-5 p-6 rounded-2xl transition-all hover:shadow-md"
                    style={{ border: '1px solid #F0EDEA', background: 'white' }}>
                    <div className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: `${F}12` }}>
                      {prog.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-800 text-base mb-1"
                        style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{prog.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{prog.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-2xl">
                <img src="https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=800&q=85&auto=format"
                  alt="Mirai students experiencing global cultural exchange"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,10,8,0.5) 0%, transparent 60%)' }} />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                  <p className="text-xs font-bold" style={{ color: '#1C1917' }}>Annual Exchange Programme</p>
                  <p className="text-xs mt-0.5" style={{ color: '#78716C' }}>International study opportunities across 5 continents</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Exchange Students Hosted', value: '50+' },
                  { label: 'Countries Represented', value: '20+' },
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-2xl text-center"
                    style={{ background: i === 0 ? B : F }}>
                    <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-xs text-white/80 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9.3 Global Competitions ──────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#1C1917' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: `radial-gradient(circle, ${B}, transparent)`, transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: `radial-gradient(circle, ${F}, transparent)`, transform: 'translate(-30%, 30%)' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader center label="Global Competitions" title="Showcasing Talent on the World Stage" light
            subtitle="Mirai students compete — and win — at the highest international levels across academics, sports, and innovation." />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {competitions.map((comp, i) => (
              <div key={i} className="rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] group"
                style={{ background: '#262220', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: i % 2 === 0 ? `${B}25` : `${F}25` }}>
                    {comp.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{ background: i % 2 === 0 ? `${B}20` : `${F}20`, color: i % 2 === 0 ? '#E8A49F' : '#A8C79E' }}>
                    {comp.category}
                  </span>
                </div>
                <h4 className="font-display font-800 text-lg mb-3"
                  style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{comp.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: '#A8A29E' }}>{comp.desc}</p>
              </div>
            ))}
          </div>

          {/* Competitions callout */}
          <div className="mt-14 p-8 rounded-2xl text-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white font-display font-800 text-xl mb-2">
              🏆 <span style={{ color: '#E8A49F' }}>Competing globally</span> — from robotics finals to MUN podiums
            </p>
            <p className="text-sm" style={{ color: '#A8A29E' }}>
              Every competition is an opportunity to grow, connect, and represent Mirai on the world stage.
            </p>
          </div>
        </div>
      </section>

      <CTABanner
        title="Give Your Child a Global Edge"
        subtitle="At Mirai, every student graduates ready to lead — in India and around the world. Secure their international future today."
        primaryText="Experience Global Learning"
        primaryTo="/contact"
      />
    </>
  )
}

