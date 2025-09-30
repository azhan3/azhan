import { useScroll } from 'framer-motion'
import Background from './components/background/Background'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'

function App() {
  const { scrollYProgress } = useScroll()

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-body text-[#123f52]">
      <a
        href="#hero"
        className="absolute left-4 top-4 z-[240] -translate-y-20 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#123f52] shadow transition focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-sky"
      >
        Skip to content
      </a>
      <Background scrollYProgress={scrollYProgress} />
      <main className="relative z-[220] flex flex-col divide-y divide-white/5">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <div className="grain-overlay" aria-hidden="true" />
    </div>
  )
}

export default App
