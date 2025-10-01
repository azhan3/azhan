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
    role: 'Software and Hardware Development Intern',
    company: 'Ford Motor Company',
    location: 'Ottawa, ON',
    period: 'May 2025 – Aug 2025',
    stack: 'Python · C++ · Flask · Jenkins · JavaScript · LTspice',
    highlights: [
      'TCU Team'
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
    <section
      id="experience"
      className="relative min-h-[90vh] overflow-hidden px-6 py-24 sm:px-12 lg:px-24 bg-anchor-forest content-visibility-auto"
      style={{ backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', containIntrinsicSize: '900px' }}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=120 height=200 viewBox=\'0 0 120 200\' %3E%3Cpath d=\'M60 0 Q70 40 60 80 T60 160 T60 200\' stroke=\'%234caf50\' stroke-width=4 fill=\'none\' stroke-linecap=\'round\' opacity=\'0.15\'/%3E%3C/svg%3E')] opacity-40" />
      <div className="relative z-10 mx-auto max-w-5xl text-[#1f3a32]">
        <header className="mb-12 text-center">
          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-[#8bc5b5] opacity-70" aria-hidden />
          <h2 className="font-display text-4xl text-[#12362b] sm:text-5xl">Experience</h2>
        </header>

        <div className="relative flex flex-col items-center">

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
                <div className="absolute -left-10 top-10 h-5 w-5 rounded-full border-2 border-[#9eddd0] bg-[#5ca08b] shadow-[0_0_20px_rgba(148,222,201,0.55)]" aria-hidden />
                <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-[#134436]">{item.role}</h3>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#3f8570]">
                      {item.company} · {item.location}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#dff5ec] px-4 py-1 text-sm text-[#226552] shadow-[0_12px_30px_-18px_rgba(32,102,79,0.55)]">
                    {item.period}
                  </span>
                </header>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.32em] text-[#3a7c69]/80">
                  {item.stack}
                </p>
                <ul className="mt-4 space-y-3 text-left text-base text-[#1f3a32]/90">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#6ac6aa]" aria-hidden />
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
