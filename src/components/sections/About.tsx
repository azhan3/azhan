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
      className="relative flex min-h-[90vh] items-center justify-center overflow-visible bg-transparent px-6 py-24 sm:px-12 lg:px-20"
    >
      <motion.div
        ref={sectionRef}
        className="relative z-10 max-w-3xl rounded-3xl bg-white/70 p-10 shadow-xl backdrop-blur-xl"
      >
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
