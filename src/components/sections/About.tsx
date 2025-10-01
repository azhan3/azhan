import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useAnimeOnInView } from '../../hooks/useAnimeOnInView'
import { Github, Instagram, FileText } from 'lucide-react'  // icons

export default function About() {
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
        className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[3rem] border border-white/20 bg-white/10 p-10 shadow-[0_60px_160px_-60px_rgba(10,52,70,0.55)] backdrop-blur-3xl"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,242,222,0.35),transparent_70%)] opacity-80" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(156,221,243,0.3),transparent_68%)] opacity-70" aria-hidden />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.04)_100%)] opacity-80" aria-hidden />
          <div className="absolute inset-[10%] rounded-[2.4rem] border border-white/20 bg-white/5 blur-3xl" aria-hidden />
          <div className="absolute left-[-18%] top-[18%] h-64 w-64 rounded-[45%] bg-[radial-gradient(circle_at_30%_30%,rgba(144,216,255,0.55),rgba(48,119,152,0.1))] blur-[68px]" aria-hidden />
          <div className="absolute right-[-12%] bottom-[14%] h-72 w-72 rounded-[48%] bg-[radial-gradient(circle_at_70%_40%,rgba(162,245,210,0.45),rgba(34,94,74,0.08))] blur-[76px]" aria-hidden />
        </div>
        <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-center">
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
            <h2 className="font-display text-4xl text-[#1f4238] sm:text-5xl">About Me</h2>
            <p className="text-lg leading-relaxed text-[#2e4d3c]">
              I like building things, staying active, and spending time outdoors. Coding and calisthenics are my two main hobbies—I enjoy problem-solving as much as working toward a clean planche.
            </p>
            <p className="text-base text-[#345043]">
              When I&apos;m not programming, I&apos;m usually hiking, playing volleyball or badminton, or building projects. 
            </p>
            <ul className="grid gap-4 text-sm text-[#2e4d3c] sm:grid-cols-2">
              <li className="rounded-2xl border border-[#c8e6f9]/80 bg-[#f1fbff] p-4 shadow-inner">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#56827c]">Interests</span>
                <p className="mt-2 text-base text-[#2e4d3c]">
                  Coding, hiking, competitive programming, calisthenics, volleyball, badminton, skiing
                </p>
              </li>
              <li className="rounded-2xl border border-[#c8e6f9]/80 bg-[#f1fbff] p-4 shadow-inner">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#56827c]">Links</span>
                <div className="mt-4 flex flex-col gap-3">
                  <a 
                    href="https://instagram.com/alexx.zhan" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#1f4238]"
                  >
                    <Instagram className="h-5 w-5" />
                    Instagram
                  </a>
                  <a 
                    href="/resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#1f4238]"
                  >
                    <FileText className="h-5 w-5" />
                    Resume
                  </a>
                  <a 
                    href="https://github.com/azhan3" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#1f4238]"
                  >
                    <Github className="h-5 w-5" />
                    GitHub
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
