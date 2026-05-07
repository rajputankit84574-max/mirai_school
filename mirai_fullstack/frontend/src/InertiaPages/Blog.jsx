import { Link, Head } from '@inertiajs/react'
import { useState } from 'react'
import PageHero from '../components/PageHero'


const B = '#AA4A44', F = '#77966D'

// Image map by category slug — keeps BlogCard pure
const CAT_IMAGES = {
  'sports-athletics':    'https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?w=800&q=80&auto=format',
  'global-exposure':     'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80&auto=format',
  'campus-life':         'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80&auto=format',
  'experiential-learning':'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80&auto=format',
}
const DEFAULT_IMG = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&auto=format'

/* ── Static fallback posts — shown instantly while API loads ── */
const FALLBACK_POSTS = [
  {
    id:'f1', slug:'benefits-of-residential-school-education', title:'10 Powerful Benefits of Residential School Education for Students',
    excerpt:'Residential schooling offers students an environment that nurtures academic growth, independence, and personal development.',
    image:'https://images.unsplash.com/photo-1560785496-3c9d27877182?w=800&q=80&auto=format',
    published_date:'2025-04-10', category:{ name:'Residential School', slug:'campus-life' },
  },
  {
    id:'f2', slug:'what-is-experiential-learning', title:'Experiential Learning: The Future of Modern Education',
    excerpt:'Experiential learning is an approach where students learn through hands-on experiences, projects, and real-world activities.',
    image:'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80&auto=format',
    published_date:'2025-05-05', category:{ name:'Experiential Learning', slug:'experiential-learning' },
  },
  {
    id:'f3', slug:'advantages-of-ib-curriculum', title:'Top Advantages of the IB Curriculum for Modern Students',
    excerpt:'The International Baccalaureate (IB) curriculum is globally respected for its emphasis on critical thinking and inquiry.',
    image:'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80',
    published_date:'2025-06-28', category:{ name:'IB Curriculum', slug:'experiential-learning' },
  },
  {
    id:'f4', slug:'why-sports-are-essential-in-schools', title:'Why Sports Are Essential for Student Development',
    excerpt:'Sports play a vital role in shaping students’ physical health, confidence, and character. Discover why it is essential.',
    image:'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
    published_date:'2025-07-20', category:{ name:'Sports & Athletics', slug:'sports-athletics' },
  },
  {
    id:'f5', slug:'boarding-school-vs-day-school', title:'Boarding School vs Day School: Which is Better for Your Child?',
    excerpt:'Parents often wonder whether a boarding school or a day school is the right choice for their child.',
    image:'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80&auto=format',
    published_date:'2025-03-15', category:{ name:'Boarding School vs Day School', slug:'campus-life' },
  },
  {
    id:'f6', slug:'21st-century-skills', title:'Essential Skills Students Need for the 21st Century',
    excerpt:'To succeed in today’s world, students must develop skills beyond academics — including critical thinking and creativity.',
    image:'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    published_date:'2025-08-05', category:{ name:'Essential Skills', slug:'experiential-learning' },
  },
  {
    id:'f7', slug:'residential-schools-independence', title:'How Residential Schools Help Students Become Independent',
    excerpt:'Residential schools provide an environment where students develop independence and self-confidence.',
    image:'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80&auto=format',
    published_date:'2025-09-25', category:{ name:'Residential Schools', slug:'campus-life' },
  },
  {
    id:'f8', slug:'inquiry-based-learning-explained', title:'Inquiry Based Learning Explained: Curiosity-Driven Education',
    excerpt:'Inquiry-based learning is an educational approach where students learn by asking questions and investigating problems.',
    image:'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80',
    published_date:'2025-10-18', category:{ name:'Curiosity-Driven Education', slug:'experiential-learning' },
  },
  {
    id:'f9', slug:'importance-of-holistic-education', title:'The Crucial Importance of Holistic Education in Today\'s World',
    excerpt:'Holistic education focuses on the complete development of students, including intellectual and emotional growth.',
    image:'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    published_date:'2025-11-10', category:{ name:'Holistic Education', slug:'experiential-learning' },
  },
  {
    id:'f10', slug:'boarding-schools-shape-leadership', title:'How Boarding Schools Shape Future Leaders',
    excerpt:'Boarding schools provide students with unique opportunities to develop leadership skills in multiple environments.',
    image:'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    published_date:'2025-12-02', category:{ name:'Future Leaders', slug:'campus-life' },
  },
  {
    id:'f11', slug:'role-of-arts-student-development', title:'The Vital Role of Arts in Student Development',
    excerpt:'Arts education helps students develop creativity, imagination, and emotional expression.',
    image:'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80&auto=format',
    published_date:'2026-01-25', category:{ name:'Student Development', slug:'campus-life' },
  },
  {
    id:'f12', slug:'how-schools-develop-critical-thinking', title:'How Schools Develop Strong Critical Thinking Skills',
    excerpt:'Critical thinking helps students evaluate information and solve problems. Learn the strategies used.',
    image:'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80',
    published_date:'2026-02-18', category:{ name:'Critical Thinking Skills', slug:'experiential-learning' },
  },
  {
    id:'f13', slug:'how-technology-enhances-education', title:'How Technology Enhances Modern Education in IB Schools',
    excerpt:'Technology has transformed education by making learning more interactive and personalized.',
    image:'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    published_date:'2026-03-10', category:{ name:'Modern Education', slug:'experiential-learning' },
  },
  {
    id:'f14', slug:'preparing-students-for-global-universities', title:'Preparing Students for Success in Global Universities',
    excerpt:'Students aspiring to study abroad must develop strong academic and personal skills.',
    image:'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&q=80&auto=format',
    published_date:'2026-04-05', category:{ name:'Global Universities', slug:'global-exposure' },
  },
  {
    id:'f15', slug:'best-curriculum-global-education', title:'Choosing the Best Curriculum for Global Education Success',
    excerpt:'Parents today look for education systems that prepare students for global opportunities.',
    image:'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&auto=format',
    published_date:'2025-01-01', category:{ name:'Best Curriculum', slug:'global-exposure' },
  },
  {
    id:'f16', slug:'benefits-of-multidisciplinary-learning', title:'Unlock Creativity: Benefits of Multidisciplinary Learning',
    excerpt:'Multidisciplinary learning connects different subjects to create deeper understanding.',
    image:'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
    published_date:'2024-12-25', category:{ name:'Multidisciplinary Learning', slug:'experiential-learning' },
  },
  {
    id:'f17', slug:'why-parents-prefer-international-schools', title:'Top Reasons Why Parents Prefer International Schools Today',
    excerpt:'International schools offer a learning environment that prepares students for global opportunities.',
    image:'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80&auto=format',
    published_date:'2024-11-18', category:{ name:'Global Exposure', slug:'global-exposure' },
  },
  {
    id:'f18', slug:'building-confidence-through-education', title:'Building Confidence in Children Through Dynamic Education',
    excerpt:'Confidence is an essential trait for success. Learn how schools build confidence through leadership.',
    image:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    published_date:'2024-10-10', category:{ name:'Dynamic Education', slug:'campus-life' },
  },
]

function BlogCard({ post }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden card-hover"
         style={{border:'1.5px solid #F0EDEA',boxShadow:'0 2px 16px rgba(170,74,68,0.05)'}}>
      <div className="aspect-[16/9] overflow-hidden relative">
        <img
          src={post.image || CAT_IMAGES[post.category?.slug] || DEFAULT_IMG}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width="600" height="338"
        />
        <div className="absolute inset-0" style={{background:'rgba(45,18,16,0.42)'}} />
        {post.category && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold"
                style={{background:'rgba(255,255,255,0.2)',color:'white',fontFamily:'var(--font-display)'}}>
            {post.category.name}
          </span>
        )}
      </div>
      <div className="p-6">
        <p className="text-xs mb-2" style={{color:'#A8A29E',fontFamily:'var(--font-body)'}}>
          {new Date(post.published_date).toLocaleDateString('en-IN',{month:'long',year:'numeric'})}
        </p>
        <h3 className="font-display font-800 text-xl leading-snug mb-2"
            style={{fontFamily:'var(--font-display)',fontWeight:800,color:'#1C1917'}}>{post.title}</h3>
        <p className="text-sm leading-relaxed mb-5 line-clamp-2" style={{color:'#78716C',fontFamily:'var(--font-body)'}}>{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-3"
          style={{color:B,fontFamily:'var(--font-display)'}}>Read Article →</Link>
      </div>
    </div>
  )
}

export default function Blog({ blogData, catData }) {
  const [selectedCat, setSelectedCat] = useState('')
  
  // FIX: API returns paginated {count, results:[]} — unwrap .results; fall back to array
  const categories = catData?.results ?? (Array.isArray(catData) ? catData : [])

  // In a real app with Inertia, filtering often happens at the server level via partial reloads.
  // For now, we'll do client-side filtering if you want, but the 'posts' prop is our source of truth.
  let posts = blogData?.results ?? (Array.isArray(blogData) ? blogData : [])
  
  if (selectedCat) {
    posts = posts.filter(p => p.category?.slug === selectedCat)
  }

  return (
    <>
      <Head>
        <title>Insights & News | Mirai Experiential School Blog</title>
        <meta name="description" content="Explore stories, educational insights, and community updates from Mirai Experiential School. Stay informed about the future of learning." />
      </Head>
      <PageHero title="School Blog & News" subtitle="Stories, insights, and updates from the Mirai community." breadcrumb={[{label:'Blog'}]}/>
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">

          {/* Category filter — only shown when categories exist */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2.5 mb-12 items-center">
              <span className="text-xs font-bold uppercase tracking-widest mr-2" style={{color:'#A8A29E',fontFamily:'var(--font-display)'}}>Filter:</span>
              {[{id:0, name:'All Posts', slug:''}, ...categories].map(cat => (
                <button key={cat.slug ?? cat.id} onClick={() => setSelectedCat(cat.slug)}
                  className="px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all"
                  style={{
                    fontFamily:'var(--font-display)',
                    background: selectedCat === cat.slug ? B : '#F7F5F2',
                    color:      selectedCat === cat.slug ? 'white' : '#78716C',
                    border:'none', cursor:'pointer',
                  }}>
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Always render grid — API data or fallback */}
          <div className="transition-opacity duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {posts.length > 0 ? posts.map(p => <BlogCard key={p.id} post={p}/>) : FALLBACK_POSTS.map(p => <BlogCard key={p.id} post={p}/>)}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
