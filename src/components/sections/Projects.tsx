import { motion } from 'framer-motion'
import ProjectShowcase from '../projects/ProjectShowcase'

export function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-[100vh] overflow-hidden px-6 py-24 sm:px-12 lg:px-24"
      style={{ containIntrinsicSize: '960px' }}
    >
      <div className="relative mx-auto max-w-5xl text-white">
        <header className="mb-12 text-center">
          <h2 className="font-display text-4xl sm:text-5xl">Projects</h2>
        </header>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative rounded-[3rem] border border-white/20 bg-white/[0.12] p-10 shadow-2xl shadow-black/30 backdrop-blur-2xl"
        >
          <div className="absolute inset-0 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.35),transparent_60%)]" />
          <ProjectShowcase />
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
