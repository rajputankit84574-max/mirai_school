import { useSEO } from '../hooks/useSEO'
import { META, organizationSchema } from '../utils/seo'
import PageHero from '../components/PageHero'
import CTABanner from '../components/CTABanner'
import SectionHeader from '../components/SectionHeader'
import StatsBanner from '../components/StatsBanner'

const B = '#AA4A44', F = '#77966D'

/* 4.1 Learning Cycle */
const learningCycle = [
  { step: '01', icon: '🔍', label: 'Inquiry',       desc: 'Students ask meaningful questions and define what they want to understand.' },
  { step: '02', icon: '🌿', label: 'Exploration',   desc: 'Hands-on fieldwork, research, and investigation bring concepts to life.' },
  { step: '03', icon: '🤝', label: 'Collaboration', desc: 'Teams share ideas, challenge assumptions, and build on each other\'s strengths.' },
  { step: '04', icon: '🛠️', label: 'Creation',      desc: 'Students design, build, and present real solutions to real-world challenges.' },
  { step: '05', icon: '🪞', label: 'Reflection',    desc: 'Thoughtful review deepens learning and prepares students for the next cycle.' },
]

/* 4.2 Project-Based Learning examples */
const pblProjects = [
  { icon: '🌊', title: 'Water Sustainability Challenge', desc: 'Students engineer low-cost water filtration systems for underserved communities, merging science, economics, and human geography.' },
  { icon: '🌆', title: 'Smart City Design Sprint', desc: 'Cross-disciplinary teams plan a sustainable urban neighbourhood, applying concepts from maths, physics, and social studies.' },
  { icon: '🌱', title: 'School Farm to Table', desc: 'Students grow, harvest, and market organic produce from our school farm — integrating biology, business, and environmental science.' },
]

/* 4.3 Innovation & Technology */
const techStreams = [
  { icon: '🤖', title: 'Robotics', desc: 'Design, program, and compete with autonomous robots using LEGO Mindstorms and Arduino-based kits.' },
  { icon: '💻', title: 'Coding', desc: 'From Python and JavaScript to app development — students learn computational thinking and real programming.' },
  { icon: '🎨', title: 'Digital Design', desc: 'Graphic design, UI/UX prototyping, and 3D modelling using industry-standard tools like Figma and Blender.' },
  { icon: '🎬', title: 'Media Production', desc: 'Documentary filmmaking, podcast creation, and broadcast journalism with professional studio equipment.' },
]

/* Stats */
const expStats = [
  { value: '40',  suffix: '+',  label: 'Annual Field Trips' },
  { value: '15',  suffix: '+',  label: 'Community Collaborations' },
  { value: '100', suffix: '%',  label: 'Students in CAS Projects' },
  { value: '3',   suffix: '',   label: 'Annual Expeditions' },
]

export default function Experiential() {
  useSEO(META.experiential, [organizationSchema()])

  return (
    <>
      <PageHero
        title="Experiential Learning"
        subtitle="We believe the most powerful learning happens when students engage with the world — not just read about it."
        breadcrumb={[{ label: 'Academics' }, { label: 'Experiential Learning' }]}
      />

      {/* ── 4.1 Mirai Experiential Framework ─────────────────────────── */}
      <section className="py-24" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Experiential Framework" title="The Mirai Learning Cycle"
            subtitle="Every unit of learning at Mirai follows a five-stage cycle that transforms curiosity into action." />

          {/* Visual cycle strip */}
          <div className="mt-14 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5"
              style={{ background: `linear-gradient(90deg, ${B}40, ${F}, ${B}40)` }} />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {learningCycle.map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center relative z-10">
                  {/* Circle node */}
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-5 shadow-lg ring-4 ring-white"
                    style={{ background: i % 2 === 0
                      ? `linear-gradient(135deg, ${B}, ${B}CC)`
                      : `linear-gradient(135deg, ${F}, ${F}CC)` }}>
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1"
                    style={{ color: i % 2 === 0 ? B : F }}>{item.step}</span>
                  <h4 className="font-display font-800 text-lg mb-2"
                    style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{item.label}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: '#78716C' }}>{item.desc}</p>

                  {/* Arrow between steps */}
                  {i < learningCycle.length - 1 && (
                    <span className="hidden sm:block lg:hidden absolute -right-3 top-8 text-xl" style={{ color: F }}>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-base font-medium" style={{ color: '#44403C' }}>
              <span style={{ color: B }}>Inquiry</span> → <span style={{ color: F }}>Exploration</span> → <span style={{ color: B }}>Collaboration</span> → <span style={{ color: F }}>Creation</span> → <span style={{ color: B }}>Reflection</span>
            </p>
            <p className="text-sm mt-2" style={{ color: '#78716C' }}>
              This cycle repeats across every subject, every grade — making learning an ongoing, living process.
            </p>
          </div>
        </div>
      </section>

      <StatsBanner stats={expStats} />

      {/* ── 4.2 Project-Based Learning ───────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <div className="section-label mb-4" style={{ display: 'inline-flex' }}>Project-Based Learning</div>
              <h2 className="font-display font-800 leading-tight mb-5"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#1C1917' }}>
                Students Solve Real-World Challenges
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#78716C' }}>
                At Mirai, project-based learning is the backbone of the curriculum. Rather than textbook exercises, students tackle genuine problems — applying knowledge with purpose, creativity, and innovation.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Solve challenges that matter to real communities',
                  'Focus on innovation and practical application',
                  'Encourage problem-solving and creative thinking',
                  'Work cross-functionally across subjects and disciplines',
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-sm mt-1" style={{ color: F }}>✦</span>
                    <span className="text-sm" style={{ color: '#44403C' }}>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-2xl">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=85&auto=format"
                alt="Students collaborating on a real-world project at Mirai"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,10,8,0.5) 0%, transparent 60%)' }} />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-xs font-bold" style={{ color: '#1C1917' }}>Project-Based Learning</p>
                <p className="text-xs mt-0.5" style={{ color: '#78716C' }}>Integrated across all IB subjects</p>
              </div>
            </div>
          </div>

          {/* PBL project examples */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pblProjects.map((proj, i) => (
              <div key={i} className="p-8 rounded-2xl border bg-white transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ border: '1.5px solid #F0EDEA' }}>
                <div className="text-4xl mb-5">{proj.icon}</div>
                <h4 className="font-display font-800 text-lg mb-3"
                  style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{proj.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{proj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4.3 Innovation & Technology ──────────────────────────────── */}
      <section className="py-24" style={{ background: '#1C1917', color: 'white' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Innovation & Technology" title="Where Technology Meets Creativity" light
            subtitle="Students explore cutting-edge disciplines that prepare them for an increasingly digital, interconnected world." />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {techStreams.map((tech, i) => (
              <div key={i} className="rounded-2xl p-8 group transition-all duration-300 hover:scale-105 cursor-default"
                style={{ background: i % 2 === 0 ? '#262220' : '#2A2520', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6"
                  style={{ background: i % 2 === 0 ? `${B}30` : `${F}30` }}>
                  {tech.icon}
                </div>
                <h4 className="font-display font-800 text-xl mb-3"
                  style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{tech.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: '#A8A29E' }}>{tech.desc}</p>
              </div>
            ))}
          </div>

          {/* Highlight strip */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Robotics Lab', 'Coding Studio', 'Design Suite', 'Media Broadcast Room'].map((room, i) => (
              <div key={i} className="text-center py-5 px-4 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-sm font-semibold" style={{ color: '#E7E5E4', fontFamily: 'var(--font-display)' }}>{room}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4.4 Research & Inquiry ───────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-2xl">
              <img src="/mirai_playground4_image.jpeg"
                alt="Students engaged in academic research and inquiry at Mirai Experiential School"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,10,8,0.5) 0%, transparent 60%)' }} />
              <div className="absolute bottom-6 left-6 bg-white/95 rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-xs font-bold" style={{ color: '#1C1917' }}>Annual Research Symposium</p>
                <p className="text-xs mt-0.5" style={{ color: '#78716C' }}>Each senior student presents original research</p>
              </div>
            </div>
            <div>
              <div className="section-label mb-4" style={{ display: 'inline-flex' }}>Research & Inquiry</div>
              <h2 className="font-display font-800 leading-tight mb-5"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#1C1917' }}>
                Building Scholars from the Ground Up
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#78716C' }}>
                At Mirai, every student is a researcher. From primary students investigating local ecosystems to seniors presenting original studies, inquiry is the engine of every learning experience.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  { icon: '📚', title: 'Academic Research Skills', desc: 'Students learn to source, evaluate, and cite information using recognised academic standards.' },
                  { icon: '🧠', title: 'Analytical Thinking', desc: 'Data interpretation, logical reasoning, and evidence-based conclusions form the core of every inquiry.' },
                  { icon: '🔭', title: 'Independent Inquiry', desc: 'Self-directed investigation allows students to pursue topics they are genuinely passionate about.' },
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl text-center transition-all hover:shadow-lg hover:-translate-y-1"
                    style={{ border: '1.5px solid #F0EDEA', background: 'white' }}>
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h4 className="font-display font-800 text-sm mb-2"
                      style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{item.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: '#78716C' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Learn by Doing at Mirai"
        subtitle="Join a school where every day is an opportunity to explore, create, and make a difference."
        primaryText="Experience Experiential Learning"
        primaryTo="/contact"
      />
    </>
  )
}

