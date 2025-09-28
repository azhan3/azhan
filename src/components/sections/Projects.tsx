import { motion } from 'framer-motion'
import ProjectShowcase from '../projects/ProjectShowcase'

export function Projects() {
  return (
    <section id="projects" className="relative min-h-[100vh] overflow-hidden bg-transparent px-6 py-24 sm:px-12 lg:px-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f3d46]/90 via-[#0f5454]/85 to-[#102a2f]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_45%),radial-gradient(circle_at_80%_35%,rgba(208,255,249,0.18),transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-5xl text-white">
        <header className="mb-12 text-center">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#c8f8ff]">
            Forest Floor &amp; River
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">Projects</h2>
          <p className="mt-4 text-lg text-[#d5fff5]/80">
            Follow the river&apos;s current—each visit rearranges the rafts, cubes, and constellations to reveal my builds anew.
          </p>
        </header>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative rounded-[3rem] bg-white/5 p-10 shadow-2xl shadow-black/40 backdrop-blur"
        >
          <div className="absolute inset-0 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.35),transparent_60%)]" />
          <ProjectShowcase />
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
