import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { useAnimeOnInView } from '../../hooks/useAnimeOnInView'

const contacts = [
  { label: 'Email', value: 'azhan@uwaterloo.ca', href: 'mailto:azhan@uwaterloo.ca' },
  { label: 'Location', value: 'Waterloo, Ontario, Canada', href: 'https://maps.app.goo.gl/7vR1fKqX8FgYQArX6' },
  { label: 'GitHub', value: 'github.com/azhan3', href: 'https://github.com/azhan3' },
  { label: 'LinkedIn', value: 'linkedin.com/in/azhan3', href: 'https://www.linkedin.com/in/azhan3' },
]

export function Contact() {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useAnimeOnInView(sectionRef, {
    opacity: [0, 1],
    translateY: [42, 0],
    duration: 1200,
    easing: 'easeOutExpo',
  })

  useEffect(() => {
    anime({
      targets: '.contact-ripple',
      scale: [1, 1.18],
      opacity: [0.45, 0],
      easing: 'easeOutCubic',
      duration: 3200,
      delay: anime.stagger(400),
      loop: true,
    })
    anime({
      targets: '.leaf-sweep',
      translateX: [-30, 40],
      opacity: [0, 0.8, 0],
      duration: 6200,
      easing: 'easeInOutSine',
      loop: true,
      delay: 600,
    })
  }, [])

  return (
    <section id="contact" className="relative min-h-[70vh] overflow-hidden px-6 pb-32 pt-24 sm:px-12 lg:px-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c2a25]/95 via-[#231810]/95 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_10%,rgba(255,255,255,0.2),transparent_55%),radial-gradient(circle_at_80%_40%,rgba(255,255,255,0.12),transparent_50%)]" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <header className="mb-12 text-center text-white">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#d7ccc8]">
            Roots &amp; Ground
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">Let&apos;s build together</h2>
          <p className="mt-4 text-lg text-white/70">
            Reach out for collaborations, co-op opportunities, or to chat about interactive systems and pastel landscapes.
          </p>
        </header>
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-10 text-white shadow-2xl shadow-black/40 backdrop-blur"
        >
          <div className="contact-ripple absolute -inset-0.5 rounded-[3rem] border border-[#d7ccc8]/20" />
          <div className="leaf-sweep pointer-events-none absolute -left-20 bottom-6 h-32 w-56 rounded-full bg-gradient-to-r from-[#a5d6a7]/40 to-transparent blur-3xl" />
          <div className="leaf-sweep pointer-events-none absolute -right-24 top-10 h-36 w-64 rounded-full bg-gradient-to-l from-[#c0a48a]/45 to-transparent blur-3xl" />
          <div className="relative grid gap-6 sm:grid-cols-2">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                className="group flex flex-col gap-2 rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur hover:border-[#c8e6f9]/60"
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d7ccc8]">
                  {contact.label}
                </span>
                <span className="text-lg text-white/90 transition group-hover:text-[#c8e6f9]">
                  {contact.value}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
