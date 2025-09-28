import { motion } from 'framer-motion'
import { useEffect } from 'react'
import anime from 'animejs'
import {
  SiReact,
  SiTypescript,
  SiPython,
  SiDocker,
  SiFlask,
  SiPytorch,
  SiMongodb,
  SiNodedotjs,
  SiGithub,
} from 'react-icons/si'

const skills = [
  { name: 'React.js', icon: SiReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Python', icon: SiPython },
  { name: 'Docker', icon: SiDocker },
  { name: 'Flask', icon: SiFlask },
  { name: 'PyTorch', icon: SiPytorch },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'GitHub', icon: SiGithub },
]

export function Skills() {
  useEffect(() => {
    anime({
      targets: '.skill-card',
      opacity: [0, 1],
      translateY: [32, 0],
      delay: anime.stagger(120),
      easing: 'easeOutExpo',
      duration: 900,
    })

    anime({
      targets: '.skill-card svg',
      scale: [0.92, 1.04, 0.98],
      direction: 'alternate',
      loop: true,
      duration: 3200,
      delay: anime.random(0, 400),
      easing: 'easeInOutSine',
    })
  }, [])

  return (
    <section
      id="skills"
      className="relative min-h-[80vh] bg-transparent px-6 py-20 sm:px-12 lg:px-20"
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.22),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_40%)]" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <span className="inline-flex items-center rounded-full bg-[#81c784]/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#285c49]">
            Skills
          </span>
          <h2 className="mt-4 font-display text-4xl text-[#1e4238] sm:text-5xl">Tools in my satchel</h2>
          <p className="mt-4 text-lg text-[#345043]">
            A canopy of languages, frameworks, and platforms that help me bridge imagination with interaction.
          </p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map(({ name, icon: Icon }) => (
            <motion.div
              key={name}
              className="skill-card group relative overflow-hidden rounded-3xl border border-white/30 bg-[#f0fff4]/70 p-6 shadow-lg shadow-forest/10 backdrop-blur"
              whileHover={{ y: -6, rotate: -0.6 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#c8e6f9]/40 blur-3xl transition group-hover:bg-[#a5d6a7]/50" />
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="animate-pulse-soft absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.55),transparent_60%)]" />
              </div>
              <div className="relative flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#a7d8c9] text-3xl text-[#1f4238] shadow-inner shadow-white/60 transition group-hover:shadow-glow">
                  <Icon />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#204838]">{name}</h3>
                  <p className="text-sm text-[#285746]">Hover to see the pastel bloom.</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
