import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { useAnimeOnInView } from '../../hooks/useAnimeOnInView'

type ExperienceItem = {
  role: string
  company: string
  location: string
  period: string
  stack: string
  highlights: string[]
}

const experiences: ExperienceItem[] = [
  {
    role: 'Software/Hardware Development Intern',
    company: 'Ford Motor Company',
    location: 'Ottawa, ON',
    period: 'May 2025 – Aug 2025',
    stack: 'Python · C++ · Flask · Jenkins · JavaScript · LTspice',
    highlights: [
      'Built a Bootstrap + Flask thermistor heatmap portal powering daily diagnostics for 30+ engineers.',
      'Automated CAN routing with an Arduino-based multiplexer, eliminating manual rewiring and setup errors.',
      'Drove down deep-sleep leakage from 600µA to 20µA through embedded validation across GPIO, UART, I2C, and CAN.',
      'Modeled pre-production hardware flaws in LTspice and coordinated fixes with senior design engineers.',
    ],
  },
]

export function Experience() {
  const timelineRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    anime({
      targets: '.vine-path',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 3600,
      easing: 'easeInOutQuart',
      delay: 300,
    })
  }, [])

  useAnimeOnInView(timelineRef, {
    translateY: [48, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutExpo',
  })

  return (
    <section id="experience" className="relative min-h-[90vh] overflow-hidden px-6 py-24 sm:px-12 lg:px-24 bg-anchor-forest" style={{ backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=120 height=200 viewBox=\'0 0 120 200\' %3E%3Cpath d=\'M60 0 Q70 40 60 80 T60 160 T60 200\' stroke=\'%234caf50\' stroke-width=4 fill=\'none\' stroke-linecap=\'round\' opacity=\'0.15\'/%3E%3C/svg%3E')] opacity-40" />
      <div className="relative z-10 mx-auto max-w-5xl text-white">
        <header className="mb-12 text-center">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#b9f6ca]">
            Forest Canopy
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">Experience</h2>
          <p className="mt-4 text-lg text-[#d2fbe0]/80">
            A timeline carved into a towering trunk, each branch blooming as new lessons take root.
          </p>
        </header>

        <div className="relative flex flex-col items-center">
          <svg className="pointer-events-none absolute left-1/2 -translate-x-1/2" width="14" height={experiences.length * 260}>
            <path
              className="vine-path"
              d={`M7 0 C2 ${experiences.length * 60}, 12 ${experiences.length * 120}, 7 ${experiences.length * 220}`}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8 12"
              strokeLinecap="round"
            />
          </svg>

          <div ref={timelineRef} className="flex w-full flex-col gap-12">
            {experiences.map((item, index) => (
              <motion.article
                key={`${item.company}-${item.period}`}
                className="relative rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
              >
                <div className="absolute -left-10 top-10 h-5 w-5 rounded-full border-2 border-[#c8e6f9] bg-[#a5d6a7] shadow-glow" />
                <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-[#c8f8e4]">{item.role}</h3>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#81c784]">
                      {item.company} · {item.location}
                    </p>
                  </div>
                  <span className="rounded-full bg-white/10 px-4 py-1 text-sm text-[#b2f7d1]">{item.period}</span>
                </header>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.32em] text-[#b9f6ca]/80">
                  {item.stack}
                </p>
                <ul className="mt-4 space-y-3 text-left text-base text-[#e3ffee]/90">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#b2f7d1]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
