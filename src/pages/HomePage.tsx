import { useScroll } from 'framer-motion'
import React, { Suspense } from 'react'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Experience from '../components/sections/Experience'
import Contact from '../components/sections/Contact'

const Background = React.lazy(() => import('../components/background/Background'))
const Projects = React.lazy(() => import('../components/sections/Projects'))

export function HomePage() {
  const { scrollYProgress } = useScroll()

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-body text-[#123f52]">
      <a
        href="#hero"
        className="absolute left-4 top-4 z-[240] -translate-y-20 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#123f52] shadow transition focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-sky"
      >
        Skip to content
      </a>
      <Suspense fallback={<div aria-hidden className="pointer-events-none fixed inset-0 z-0" />}>
        <Background scrollYProgress={scrollYProgress} />
      </Suspense>
      <main className="relative z-[220] flex flex-col divide-y divide-white/5">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Suspense fallback={<div className="py-20 text-center text-sm text-white/60">Loading projects...</div>}>
          <Projects />
        </Suspense>
        <Contact />
      </main>
      <div className="grain-overlay" aria-hidden="true" />
    </div>
  )
}

export default HomePage
