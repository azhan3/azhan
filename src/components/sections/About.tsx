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

  const portraitIllustration = '/images/pfp.png'

  return (
    <section
      id="about"
      className="relative flex min-h-[90vh] items-center justify-center overflow-visible bg-transparent px-6 py-24 sm:px-12 lg:px-20 content-visibility-auto"
      style={{ containIntrinsicSize: '820px' }}
    >
      <motion.div
        ref={sectionRef}
        className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[3rem] border border-white/40 bg-white/85 p-10 shadow-[0_45px_120px_-40px_rgba(21,70,80,0.28)] backdrop-blur"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-center">
          <div className="relative mx-auto flex h-full w-full max-w-sm items-center justify-center">
            <div className="absolute inset-0 scale-110 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(117,184,196,0.35),rgba(18,71,82,0))] blur-[72px]" aria-hidden />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white p-4 shadow-[0_35px_90px_-45px_rgba(20,60,90,0.55)]">
              <div className="absolute inset-3 rounded-[1.9rem] border border-[#c8e6f9]/60" aria-hidden />
              <img
                src={portraitIllustration}
                alt="Photo of Alexander Zhan"
                className="relative z-10 w-full rounded-[2rem] object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute -bottom-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full border border-[#a5d6a7]/40" aria-hidden />
            </div>
          </div>

          <div className="relative space-y-6 text-[#2e4d3c]">
            <div className="absolute -top-10 right-12 h-24 w-24 rounded-full bg-[#7dd3fc]/25 blur-3xl" aria-hidden />
            <h2 className="font-display text-4xl text-[#1f4238] sm:text-5xl">About</h2>
            <p className="text-lg leading-relaxed text-[#2e4d3c]">
              I&apos;m Alexander Zhan, a Computer Engineering student passionate about blending hardware and software with creativity.
              I enjoy building tools, solving problems, and designing projects that feel alive and interactive.
            </p>
            <p className="text-base text-[#345043]">
              Whether I&apos;m plotting thermistor heat maps for embedded systems or choreographing gesture-driven interfaces, I&apos;m driven by
              crafting experiences that respond, adapt, and delight. My favourite builds live at the intersection of whimsical aesthetics
              and engineering rigor—things that feel like they belong in a studio Ghibli lab.
            </p>
            <ul className="grid gap-4 text-sm text-[#2e4d3c] sm:grid-cols-2">
              <li className="rounded-2xl border border-[#c8e6f9]/80 bg-[#f1fbff] p-4 shadow-inner">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#56827c]">Focus</span>
                <p className="mt-2 text-base text-[#2e4d3c]">Human-centric tooling, playful interaction design, embedded experiences.</p>
              </li>
              <li className="rounded-2xl border border-[#c8e6f9]/80 bg-[#f1fbff] p-4 shadow-inner">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#56827c]">Currently exploring</span>
                <p className="mt-2 text-base text-[#2e4d3c]">Spatial UIs, computer vision-assisted input, and studio-quality developer tooling.</p>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default About
