import { BrowserRouter, Routes, Route, ScrollRestoration, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'

import Home           from './pages/Home'
import About          from './pages/About'
import Programmes     from './pages/Programmes'
import Experiential   from './pages/Experiential'
import Sports         from './pages/Sports'
import Residential    from './pages/Residential'
import Campus         from './pages/Campus'
import StudentLife    from './pages/StudentLife'
import GlobalExposure from './pages/GlobalExposure'
import Admissions     from './pages/Admissions'
import Blog           from './pages/Blog'
import BlogDetail     from './pages/BlogDetail'
// import News           from './pages/News'
import Gallery        from './pages/Gallery'
import Contact        from './pages/Contact'
import StudentInquiry from './pages/StudentInquiry'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/"                    element={<Home />} />
          <Route path="/about"               element={<About />} />
          <Route path="/programmes"          element={<Programmes />} />
          <Route path="/experiential-learning" element={<Experiential />} />
          <Route path="/sports"              element={<Sports />} />
          <Route path="/residential"         element={<Residential />} />
          <Route path="/campus"              element={<Campus />} />
          <Route path="/student-life"        element={<StudentLife />} />
          <Route path="/global-exposure"     element={<GlobalExposure />} />
          <Route path="/admissions"          element={<Admissions />} />
          <Route path="/student-inquiry"    element={<StudentInquiry />} />
          <Route path="/blog"                element={<Blog />} />
          <Route path="/blog/:slug"          element={<BlogDetail />} />
          {/* <Route path="/news"                element={<News />} /> */}
          <Route path="/gallery"             element={<Gallery />} />
          <Route path="/contact"             element={<Contact />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center text-center px-6" style={{ paddingTop: 80 }}>
              <div>
                <div className="font-display text-8xl font-bold mb-4" style={{ color: '#e8e3d8' }}>404</div>
                <h2 className="font-display text-2xl font-semibold mb-3" style={{ color: '#0d2137' }}>Page Not Found</h2>
                <p className="text-slate-400 text-sm mb-6">The page you're looking for doesn't exist.</p>
                <a href="/" className="px-6 py-3 rounded-full text-sm font-semibold text-white" style={{ background: '#0d2137' }}>Go Home</a>
              </div>
            </div>
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
