import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import anime from 'animejs'
import { useAnimeOnInView } from '../../hooks/useAnimeOnInView'

const heroVariants = {
  fadeInUp: { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 } },
  floatIn: { initial: { opacity: 0, y: 48 }, animate: { opacity: 1, y: -4 } },
  driftIn: { initial: { opacity: 0, x: -32 }, animate: { opacity: 1, x: 0 } },
}

type VariantKey = keyof typeof heroVariants

const buttons = [
  { label: 'Explore My Journey', link: '#about' },
  { label: 'View Projects', link: '#projects' },
  { label: 'GitHub', link: 'https://github.com/azhan3' },
]

const gradientSteps = [
  ['#c8e6f9', '#a5d6a7'],
  ['#cce7ff', '#b2dfdb'],
  ['#bbdefb', '#81c784'],
]

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)

  const variant = useMemo<VariantKey>(() => {
    const variants: VariantKey[] = ['fadeInUp', 'floatIn', 'driftIn']
    return variants[Math.floor(Math.random() * variants.length)]
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    const gradientAnimation = anime({
      targets: '.sky-gradient',
      background: gradientSteps.map(([from, to]) => ({ value: `linear-gradient(180deg, ${from}, ${to})` })),
      easing: 'linear',
      duration: 16000,
      loop: true,
    })

    const cloudAnimation = anime({
      targets: '.hero-cloud',
      translateX: [0, 48],
      duration: 18000,
      direction: 'alternate',
      easing: 'easeInOutSine',
      loop: true,
      delay: (_element: Element, index: number) => index * 1400,
    })

    return () => {
      ;(gradientAnimation as { pause?: () => void }).pause?.()
      ;(cloudAnimation as { pause?: () => void }).pause?.()
    }
  }, [])

  useAnimeOnInView(headlineRef, {
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 1200,
    easing: 'easeOutExpo',
  })

  useAnimeOnInView(subheadlineRef, {
    opacity: [0, 1],
    translateY: [32, 0],
    duration: 1600,
    easing: 'easeOutExpo',
    delay: 140,
  })

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-24 pt-32 text-[#16324f] sm:px-12 lg:px-24 bg-anchor-sky content-visibility-auto"
      style={{ backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', containIntrinsicSize: '960px' }}
    >

      <motion.div
        variants={heroVariants[variant]}
        initial="initial"
        animate="animate"
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative max-w-3xl space-y-6"
      >
        <h1 ref={headlineRef} className="font-display text-5xl sm:text-6xl lg:text-7xl">
          Hi, I&apos;m Alexander Zhan
        </h1>
        <p ref={subheadlineRef} className="max-w-2xl text-xl font-light sm:text-2xl">
          Engineer | Builder | Explorer
        </p>
        <p className="max-w-2xl leading-relaxed text-lg text-[#294e63]">
          Computer Engineering Student at the University of Waterloo.
        </p>
        <div className="flex flex-wrap gap-3 pt-4">
          {buttons.map((button) => (
            <a
              key={button.label}
              href={button.link}
              className="group rounded-full bg-white/80 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#245472] shadow-md shadow-sky/30 transition hover:bg-white/95 hover:shadow-lg hover:shadow-sky/30"
            >
              <span className="mr-2 inline-block transition group-hover:translate-y-[-2px]">
                {button.label}
              </span>
              <span aria-hidden="true" className="inline-block text-lg transition group-hover:translate-x-1">
                →
              </span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
