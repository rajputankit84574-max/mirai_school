/**
 * seo.js
 * Audit fixes:
 *   §1.2 — Add schema markup (Organization, Course, FAQ)
 *   §2.2 — Optimized meta titles with keywords for CTR
 *   §2.5 + §5 — FAQ schema for AI SEO (Google SGE / ChatGPT visibility)
 */

const SITE = {
  name:        'Mirai Experiential School',
  url:         'https://miraischool.in',
  phone:       '+91 95999 31471',
  email:       'admit@miraischool.in',
  address:     'DOO/BKL, Ansal Avantika, Ghaziabad, Delhi NCR, India, 201002',
  description: 'Mirai Experiential School is an IB World School in Delhi NCR offering skill-based, experiential education with residential boarding for grades EYP to Diploma.',
  logo:        'https://miraischool.in/logo.png',
}

// Audit §1.2: Organization schema
export function organizationSchema() {
  return {
    '@context':  'https://schema.org',
    '@type':     'EducationalOrganization',
    name:        SITE.name,
    url:         SITE.url,
    logo:        SITE.logo,
    description: SITE.description,
    telephone:   SITE.phone,
    email:       SITE.email,
    address: {
      '@type':         'PostalAddress',
      streetAddress:   '',
      addressLocality: 'Delhi NCR',
      addressRegion:   '',
      postalCode:      '',
      addressCountry:  'IN',
    },
    sameAs: [
      'https://www.instagram.com/miraischool',
      'https://www.facebook.com/miraischool',
      'https://www.youtube.com/@miraischool',
    ],
  }
}

// Audit §1.2: Course schema
export function courseSchema(programs) {
  if (!programs?.length) return null
  return programs.map(prog => ({
    '@context':  'https://schema.org',
    '@type':     'Course',
    name:        prog.program_type_display,
    description: prog.description,
    provider: {
      '@type': 'EducationalOrganization',
      name:    SITE.name,
      url:     SITE.url,
    },
    educationalLevel: prog.age_range,
    courseMode:       'In-person',
    url:              `${SITE.url}/programmes`,
    hasCourseInstance: {
      '@type':    'CourseInstance',
      courseMode: 'Onsite',
      location: {
        '@type': 'Place',
        name:    SITE.name,
        address: SITE.address,
      },
    },
  }))
}

// Audit §1.2 + §2.5 + §5: FAQ schema for Google rich snippets and AI SEO
export function faqSchema(faqs) {
  if (!faqs?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type':        'Question',
      name:           faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    faq.answer,
      },
    })),
  }
}

export function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type':  'ListItem',
      position: i + 1,
      name:     c.name,
      item:     `${SITE.url}${c.path}`,
    })),
  }
}

// Audit §2.4: Article schema for blog posts
export function articleSchema(post) {
  if (!post) return null
  return {
    '@context':      'https://schema.org',
    '@type':         'BlogPosting',
    headline:        post.title,
    description:     post.meta_description || post.excerpt,
    image:           post.featured_image || post.image || SITE.logo,
    author: {
      '@type': 'Person',
      name:    post.author || 'Mirai Team',
    },
    publisher: {
      '@type': 'Organization',
      name:    SITE.name,
      logo: {
        '@type': 'ImageObject',
        url:     SITE.logo,
      },
    },
    datePublished:   post.published_date,
    dateModified:    post.updated_at || post.published_date,
    mainEntityOfPage: {
      '@type': '@id',
      id:      `${SITE.url}/blog/${post.slug}`,
    },
  }
}

// Audit §2.2: Keyword-optimised meta titles and descriptions
export const META = {
  home: {
    title:       'Best IB School with Boarding in India | Mirai Experiential School Delhi NCR',
    description: "India's leading IB World School in Delhi NCR offering skill-based experiential learning, residential boarding, and global university preparation for EYP to Diploma Programme.",
    keywords:    'IB school India, IB school Delhi NCR, experiential learning school, IB boarding school, best international school India, skill-based education, IB School with Boarding, Experiential Learning School, International School with Sports Facilities',
  },
  about: {
    title:       'About Mirai Experiential School | IB World School Delhi NCR India',
    description: "Discover Mirai's vision, IB Learner Profile, and skill-based experiential education approach. An IB World School committed to nurturing globally-minded, compassionate leaders.",
    keywords:    'about Mirai school, IB school mission, international school Delhi NCR, IB World School India',
  },
  programmes: {
    title:       'IB Programmes EYP, PYP, MYP & Diploma | Best IB School India | Mirai',
    description: "Explore Mirai's IB academic programmes — Early Years, Primary, Middle Years, and Diploma. Skill-based learning with 98% global pathway.",
    keywords:    'IB curriculum India, IB Diploma school, PYP school Delhi NCR, MYP school India, IB school programmes, AI learning school',
  },
  admissions: {
    title:       'Admissions 2026-27 | Enroll at Mirai IB School | Book Free Demo Class',
    description: 'Join the leading IB experiential school. Admissions open for academic session 2026-27. Comprehensive student development through inquiry-based learning.',
    keywords:    'IB school admissions 2026, school admissions Delhi NCR, international school apply, boarding school admission India, free demo class',
  },
  blog: {
    title:       'School Blog | IB Education, Skill-Based Learning & AI Courses | Mirai',
    description: 'Read insights on IB education, skill-based learning, AI in education, career guidance, digital marketing courses, and student success stories from Mirai School.',
    keywords:    'IB education blog, experiential learning articles, AI course students, digital marketing course, career skills blog, school news',
  },
  contact: {
    title:       'Contact Mirai School | Book Free Campus Tour | IB School Delhi NCR',
    description: 'Contact Mirai Experiential School admissions team. Book a free campus visit, WhatsApp us, or schedule a free consultation. IB school in Delhi NCR.',
    keywords:    'contact Mirai school, school campus visit, IB school Delhi NCR contact, admissions enquiry, free consultation',
  },
  experiential: {
    title:       'Experiential Learning School | Skill-Based Education India | Mirai',
    description: "Mirai's hands-on, project-based learning prepares students for the real world — farm projects, maker spaces, outdoor expeditions, and community service integrated into the IB curriculum.",
    keywords:    'experiential learning school India, skill-based education, project-based learning, outdoor education school, AI learning school',
  },
  sports: {
    title:       'Sports & Athletics | 20+ Disciplines | IB School Delhi NCR | Mirai',
    description: 'World-class sports at Mirai — cricket, swimming, football, tennis, and 20+ disciplines with professional coaching. Elite sports academies alongside IB academics.',
    keywords:    'school sports Delhi NCR, IB school cricket academy, swimming school India, boarding school sports, school athletics India',
  },
  campus: {
    title:       'Campus & Facilities | Green Campus IB School | Mirai Delhi NCR',
    description: 'Explore Mirai\'s Green Campus world-class facilities — STEM labs, smart classrooms, auditorium, sports facilities, and residential boarding on one connected campus.',
    keywords:    'IB school Green Campus, school facilities India, STEM lab school, boarding school campus, smart classrooms school',
  },
  residential: {
    title:       'Residential Boarding & Pastoral Care | IB School India | Mirai',
    description: 'A safe, nurturing home away from home. Mirai\'s residential boarding offers 24/7 pastoral care, separate hostels for boys and girls, and a structured, enriching routine.',
    keywords:    'boarding school India, school hostel Delhi NCR, residential school India, pastoral care, student boarding life',
  },
  studentLife: {
    title:       'Student Life & Activities | IB World School Delhi NCR | Mirai',
    description: 'Discover vibrant student life at Mirai — A+ 40+ clubs, student government, cultural festivals, and community service. A holistic environment for growth and leadership.',
    keywords:    'student life school, school clubs Delhi NCR, student events, school magazine, community service school India',
  },
  globalExposure: {
    title:       'Global Exposure & International Exchanges | IB School India | Mirai',
    description: 'Mirai students gain global perspectives through international exchange programmes, Model UN, global academic competitions, and pathways to 120+ universities.',
    keywords:    'global exposure school, international exchange school, Model UN India, global university pathways, international mindedness',
  },
  news: {
    title:       'News & Events | Mirai Experiential School Delhi NCR',
    description: 'Stay updated with the latest news, events, and achievements at Mirai Experiential School. From campus festivals to student success stories.',
    keywords:    'school news, school events Delhi NCR, Mirai school updates, campus events',
  },
  gallery: {
    title:       'Photo Gallery | Life at Mirai Experiential School',
    description: 'Tour Mirai through our photo gallery — campus facilities, classroom activities, sports events, and student life in pictures.',
    keywords:    'school gallery, school photos, campus pictures, Mirai school life gallery',
  },
}

// Inject JSON-LD schema into document head
export function injectSchema(schemaObj) {
  if (!schemaObj) return
  const schemas = Array.isArray(schemaObj) ? schemaObj : [schemaObj]
  schemas.forEach(schema => {
    // Remove existing schema of same type to avoid duplicates
    const existing = document.querySelector(`script[data-schema="${schema['@type']}"]`)
    if (existing) existing.remove()

    const script       = document.createElement('script')
    script.type        = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    script.setAttribute('data-schema', schema['@type'] || 'schema')
    document.head.appendChild(script)
  })
}

export function setPageMeta({ title, description, keywords }) {
  if (title)       document.title = title
  const setMeta = (name, content) => {
    if (!content) return
    let el = document.querySelector(`meta[name="${name}"]`)
    if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el) }
    el.setAttribute('content', content)
    // Also set OG tags
    let og = document.querySelector(`meta[property="og:${name === 'description' ? 'description' : name}"]`)
    if (!og) { og = document.createElement('meta'); og.setAttribute('property', `og:${name === 'description' ? 'description' : name}`); document.head.appendChild(og) }
    og.setAttribute('content', content)
  }
  setMeta('description', description)
  setMeta('keywords', keywords)
}
