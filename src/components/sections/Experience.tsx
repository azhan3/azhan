import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { useAnimeOnInView } from '../../hooks/useAnimeOnInView'

type ExperienceItem = {
  role: string
  company: string
  logoSrc: string
  logoAlt: string
  location: string
  period: string
  stack: string
  highlights: string[]
}

const experiences: ExperienceItem[] = [
    {
    role: 'Software Development Intern',
    company: 'RBC',
    logoSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxnYZQANBWQdJQ9IWBEppHxJFAUpC1W00yyQ&s',
    logoAlt: 'RBC logo',
    location: 'Toronto, ON',
    period: 'Jan 2026 – Apr 2026',
    stack: 'Typescript · Node.js · Swift · Docker · Kubernetes',
    highlights: [
      'US Wealth Management Mobility Team'
    ],
  },
  {
    role: 'Software and Hardware Development Intern',
    company: 'Ford Motor Company',
    logoSrc: 'https://substackcdn.com/image/fetch/$s_!HjPJ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbbb6e41d-83a8-4c23-9e33-8dfb96907236_1200x1200.jpeg',
    logoAlt: 'Ford logo',
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
      <div className="relative z-10 mx-auto max-w-5xl text-[#173730]">
        <header className="mb-12 text-center">
          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-[#8bc5b5] opacity-70" aria-hidden />
          <h2 className="font-display text-4xl text-[#12362b] sm:text-5xl">Experience</h2>
        </header>

        <div className="relative flex flex-col items-center">

          <div ref={timelineRef} className="flex w-full flex-col gap-12">
            {experiences.map((item, index) => (
              <motion.article
                key={`${item.company}-${item.period}`}
                className="relative rounded-3xl border border-white/55 bg-white/42 p-8 shadow-[0_24px_55px_-28px_rgba(17,54,45,0.65)] backdrop-blur-2xl"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/45" aria-hidden />
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl bg-[linear-gradient(145deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.16)_46%,rgba(198,231,246,0.2)_100%)]"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-x-6 top-4 h-10 rounded-full bg-white/35 blur-xl"
                  aria-hidden
                />
                <div className="absolute -left-10 top-10 h-5 w-5 rounded-full border-2 border-[#9eddd0] bg-[#5ca08b] shadow-[0_0_20px_rgba(148,222,201,0.55)]" aria-hidden />
                <div className="relative z-10">
                  <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <img
                        src={item.logoSrc}
                        alt={item.logoAlt}
                        loading="lazy"
                        decoding="async"
                        className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-display text-2xl text-[#143d33] sm:text-[2rem]">{item.role}</h3>
                        <p className="text-sm uppercase tracking-[0.18em] text-[#2f6759] sm:text-[0.95rem]">
                          {item.company} · {item.location}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full border border-white/50 bg-white/55 px-4 py-1 text-sm font-semibold text-[#275f52] shadow-[0_12px_30px_-18px_rgba(32,102,79,0.55)] backdrop-blur-sm">
                      {item.period}
                    </span>
                  </header>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#2f6759]">
                    {item.stack}
                  </p>
                  <ul className="mt-4 space-y-3 text-left text-base text-[#173730]">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#56b79a]" aria-hidden />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
