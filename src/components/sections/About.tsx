import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useAnimeOnInView } from '../../hooks/useAnimeOnInView'

export function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useAnimeOnInView(sectionRef, {
    translateX: ['-32px', '0px'],
    opacity: [0, 1],
    duration: 1200,
    easing: 'easeOutExpo',
  })

  return (
    <section
      id="about"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-transparent px-6 py-24 sm:px-12 lg:px-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white/20" />
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-white/25 blur-3xl" />
      <div className="absolute right-12 bottom-10 h-56 w-56 rounded-full bg-[#bde5d1]/40 blur-3xl" />
      <motion.div
        ref={sectionRef}
        className="relative z-10 max-w-3xl rounded-3xl bg-white/70 p-10 shadow-xl backdrop-blur-xl"
      >
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute inset-x-0 -top-20 h-40 animate-pulse-soft bg-gradient-to-b from-white/50 to-transparent" />
          <div className="absolute left-8 top-0 h-full w-1 bg-gradient-to-b from-[#6fc2ba]/40 via-[#a5d6a7]/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 animate-river-flow bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.35)_40%,rgba(255,255,255,0)_70%)]" />
        </div>
        <div className="relative space-y-6">
          <span className="inline-flex items-center rounded-full bg-[#a7d8c9]/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#285c49]">
            Mountains &amp; Waterfalls
          </span>
          <h2 className="font-display text-4xl text-[#284a48] sm:text-5xl">About</h2>
          <p className="text-lg leading-relaxed text-[#2e4d3c]">
            I&apos;m Alexander Zhan, a Computer Engineering student passionate about blending hardware and software with creativity.
            I enjoy building tools, solving problems, and designing projects that feel alive and interactive.
          </p>
          <p className="text-base text-[#37594c]">
            Whether I&apos;m plotting thermistor heat maps for embedded systems or choreographing gesture-driven interfaces, I&apos;m driven
            by crafting experiences that respond, adapt, and delight.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

export default About
