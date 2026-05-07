import { Head, Link } from '@inertiajs/react'
import PageHero from '../components/PageHero'
import CTABanner from '../components/CTABanner'
import SectionHeader from '../components/SectionHeader'
import StatsBanner from '../components/StatsBanner'

const B = '#AA4A44', F = '#77966D'

/* Section 1 – Clubs & Activities */
const clubs = [
  { icon: '🤖', title: 'Robotics & Coding Club', desc: 'Students design, build, and program robots and applications, competing in national and international hackathons.' },
  { icon: '🎙️', title: 'Debate & Public Speaking', desc: 'Weekly sessions develop argumentation, research, and confident communication skills before diverse audiences.' },
  { icon: '🌿', title: 'Sustainability Club', desc: 'Student-led environmental initiatives including composting, campus gardens, and zero-waste campaigns.' },
  { icon: '📽️', title: 'Film-Making Club', desc: 'Students script, shoot, and edit short films screened at the annual Mirai Film Festival each December.' },
  { icon: '🔭', title: 'Astronomy Club', desc: 'Night-sky observations, telescope sessions, and astrophysics workshops for curious minds.' },
  { icon: '📰', title: 'Student Magazine & Radio', desc: 'The Mirai Voices magazine and campus radio station are entirely student-run — reporting and broadcasting weekly.' },
]

/* Section 2 – Arts & Creativity */
const artsStreams = [
  { icon: '🎨', title: 'Visual Arts', desc: 'Painting, sculpture, ceramics, printmaking, and photography — explored in dedicated studios with professional materials.' },
  { icon: '🎭', title: 'Drama & Theatre', desc: 'Annual school productions, drama workshops, and improv sessions build confidence, empathy, and stagecraft.' },
  { icon: '🎵', title: 'Music', desc: 'Vocal training, instrument lessons, ensemble performances, and a fully-equipped recording studio for student compositions.' },
  { icon: '💃', title: 'Dance', desc: 'Classical, contemporary, and folk dance forms taught by specialist instructors and performed at school events.' },
  { icon: '🖥️', title: 'Digital Design', desc: 'Graphic design, motion graphics, and UX/UI prototyping using industry tools like Adobe Suite and Figma.' },
  { icon: '🏺', title: 'Craft & Design', desc: 'Ceramics, textile arts, woodwork, and product design developed in dedicated maker studios and craft spaces.' },
]

/* Section 3 – Leadership Development */
const leadershipPaths = [
  { icon: '🏛️', title: 'Student Council', desc: 'Elected student representatives manage school events, raise peer concerns, and collaborate directly with Mirai leadership on policies.' },
  { icon: '🌍', title: 'Model United Nations', desc: 'Students develop diplomacy, research, and negotiation skills by representing countries in complex international debates.' },
  { icon: '🎖️', title: 'House Captaincy & Prefect System', desc: 'Senior students serve as House Captains and Prefects, taking ownership of discipline, mentoring, and school traditions.' },
  { icon: '🚀', title: 'Entrepreneurship Cell', desc: 'Student-led startup incubator where ideas are pitched, tested, and developed with mentor guidance and seed resources.' },
]

/* Section 4 – Community Service */
const serviceInitiatives = [
  { icon: '🤝', title: 'NGO Collaborations', desc: 'Students collaborate with 15+ local NGOs on education, health, and environment projects as part of the IB CAS programme.' },
  { icon: '🏘️', title: 'Village Outreach', desc: 'Regular visits to local villages where students teach literacy, run hygiene workshops, and support infrastructure projects.' },
  { icon: '♻️', title: 'Campus Sustainability Drives', desc: 'School-wide initiatives for waste segregation, tree planting, water conservation, and reducing the campus carbon footprint.' },
  { icon: '❤️', title: 'Fundraising Campaigns', desc: 'Annual charity events and student-organised drives raise funds for identified causes within the local and national community.' },
]

/* Section 5 – School Events */
const events = [
  { icon: '🌐', month: 'September', title: 'Annual Cultural Festival', desc: 'A three-day celebration of global cultures featuring food, dance, music, and art — representing 35+ nationalities on campus.' },
  { icon: '🏆', month: 'November', title: 'Inter-House Championships', desc: 'Year-round competition in academics, sports, arts, and general knowledge culminates in a grand final celebration.' },
  { icon: '🔬', month: 'January', title: 'Research Symposium', desc: 'Senior students present original research projects to educators, parents, and industry professionals at this flagship event.' },
  { icon: '🎬', month: 'December', title: 'Mirai Film Festival', desc: 'Student-produced films screened at an evening gala — celebrating creativity, storytelling, and technical excellence.' },
  { icon: '🎓', month: 'April', title: 'Graduation Ceremony', desc: 'A formal and joyful celebration of student achievement, marking the transition from learner to global changemaker.' },
  { icon: '🏅', month: 'March', title: 'Sports Day & Awards', desc: 'School-wide athletics day followed by the annual sports awards recognising individual and team excellence across all disciplines.' },
]

const lifeStats = [
  { value: '40',  suffix: '+', label: 'Student Clubs' },
  { value: '15',  suffix: '+', label: 'NGO Collaborations' },
  { value: '10',  suffix: '+', label: 'Annual Events' },
  { value: '100', suffix: '%', label: 'Student Participation' },
]

export default function StudentLife() {
  return (
    <>
      <Head>
        <title>Student Life at Mirai | Clubs, Arts & Leadership</title>
        <meta name="description" content="Explore the vibrant student life at Mirai Experiential School — 40+ clubs, arts, leadership development, and community service." />
      </Head>

      <PageHero
        title="Student Life at Mirai"
        subtitle="Vibrant, purposeful, and rich with opportunity — life at Mirai is truly one of a kind."
        breadcrumb={[{ label: 'Campus & Life' }, { label: 'Student Life' }]}
      />

      {/* ── Section 1: Clubs & Activities ───────────────────────────── */}
      <section className="py-24" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader center label="Clubs & Activities" title="40+ Ways to Explore Your Passion"
            subtitle="Beyond academics, Mirai students develop real skills through an extraordinary range of clubs, teams, and student-led initiatives." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {clubs.map((club, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ border: '1.5px solid #F0EDEA' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
                  style={{ background: i % 2 === 0 ? `${B}10` : `${F}10` }}>
                  {club.icon}
                </div>
                <h4 className="font-display font-800 text-lg mb-2"
                  style={{ color: '#1C1917', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{club.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{club.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsBanner stats={lifeStats} />

      {/* ── Section 2: Arts & Creativity ─────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-4" style={{ display: 'inline-flex' }}>Arts & Creativity</div>
              <h2 className="font-display font-800 leading-tight mb-5"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#1C1917' }}>
                Creative Expression is at the Heart of Mirai
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#78716C' }}>
                At Mirai, creativity is not a subject — it is a way of thinking. Visual arts, performing arts, music, dance, drama, and design are woven into everyday school life, giving every student a medium to express who they are.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {artsStreams.map((art, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-stone-50 border transition-all hover:shadow-md"
                    style={{ border: '1px solid #F0EDEA' }}>
                    <span className="text-2xl">{art.icon}</span>
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#1C1917', fontFamily: 'var(--font-display)' }}>{art.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-2xl">
                <img src="/mirai_activity_7_image.jpeg"
                  alt="Students engaged in performing arts and creative expression at Mirai"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,10,8,0.4) 0%, transparent 60%)' }} />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                  <p className="text-xs font-bold" style={{ color: '#1C1917' }}>Arts & Creativity</p>
                  <p className="text-xs mt-0.5" style={{ color: '#78716C' }}>Visual, performing, and digital arts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Leadership Development ───────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#1C1917' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `radial-gradient(circle at 20% 40%, ${B} 0%, transparent 40%), radial-gradient(circle at 80% 60%, ${F} 0%, transparent 40%)` }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader center label="Leadership Development" title="Every Student Has a Leader Inside" light
            subtitle="Mirai's leadership programmes build confidence, initiative, and a deep sense of personal responsibility in every student." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
            {leadershipPaths.map((path, i) => (
              <div key={i} className="flex items-start gap-6 p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{ background: '#262220', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-16 h-16 flex-shrink-0 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: i % 2 === 0 ? `${B}30` : `${F}30` }}>
                  {path.icon}
                </div>
                <div>
                  <h4 className="font-display font-800 text-lg mb-2"
                    style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{path.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#A8A29E' }}>{path.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Community Service ─────────────────────────────── */}
      <section className="py-24" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-2xl">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=85&auto=format"
                alt="Mirai students engaged in community service and outreach"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,10,8,0.4) 0%, transparent 60%)' }} />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-xs font-bold" style={{ color: '#1C1917' }}>Community Service</p>
                <p className="text-xs mt-0.5" style={{ color: '#78716C' }}>100% students participate in CAS</p>
              </div>
            </div>
            <div>
              <div className="section-label mb-4" style={{ display: 'inline-flex' }}>Community Service</div>
              <h2 className="font-display font-800 leading-tight mb-5"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#1C1917' }}>
                Students Who Give Back — Meaningfully
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#78716C' }}>
                Social responsibility is a core value at Mirai. Every student participates in community service as part of the IB Creativity, Activity, Service (CAS) framework — engaging with causes that matter and communities that need them.
              </p>
              <div className="space-y-4">
                {serviceInitiatives.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border transition-all hover:shadow-md"
                    style={{ border: '1px solid #F0EDEA' }}>
                    <div className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center text-xl"
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
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Join the Mirai Community"
        subtitle="Become part of a school where every student finds their place, their passion, and their people."
        primaryText="Experience Student Life"
        primaryTo="/contact"
      />
    </>
  )
}
