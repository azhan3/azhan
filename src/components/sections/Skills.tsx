import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import anime from 'animejs'
import { FiBox, FiChevronDown, FiCode, FiGrid, FiTool } from 'react-icons/fi'

const skillCategories = [
  {
    name: 'Languages',
    icon: FiCode,
    skills: ['C/C++', 'Python', 'Java', 'TypeScript', 'JavaScript', 'HTML/CSS', 'SQLite', 'Arduino'],
    description: 'Core programming stacks and low-level integrations.',
  },
  {
    name: 'Frameworks',
    icon: FiGrid,
    skills: [
      'Flask',
      'Node.js',
      'Express.js',
      'Next.js',
      'Angular',
      'Django',
      'React.js',
      'Vue.js',
      'Electron.js',
      'React Native',
      'Vert.x',
    ],
    description: 'Ecosystems I use to bring interfaces and services to life.',
  },
  {
    name: 'Developer Tools',
    icon: FiTool,
    skills: ['Linux', 'Vim', 'Jenkins', 'Git', 'GitHub', 'Docker', 'PostgreSQL', 'FastAPI', 'Firebase'],
    description: 'Tooling that keeps delivery fast, reproducible, and collaborative.',
  },
  {
    name: 'Libraries',
    icon: FiBox,
    skills: [
      'pandas',
      'NumPy',
      'PyTorch',
      'Matplotlib',
      'Scikit-learn',
      'SciPy',
      'OpenCV',
      'Mediapipe',
      'MongoDB',
      'cURL',
    ],
    description: 'Specialized packages for data wrangling, ML, and computer vision.',
  },
]

export function Skills() {
  const [openCategories, setOpenCategories] = useState<string[]>([])

  const toggleCategory = (name: string) => {
    setOpenCategories((current) =>
      current.includes(name) ? current.filter((category) => category !== name) : [...current, name],
    )
  }

  const previews = useMemo(() => {
    return skillCategories.reduce<Record<string, string>>((acc, { name, skills }) => {
      const previewItems = skills.slice(0, 3)
      const remaining = skills.length - previewItems.length
      const preview = remaining > 0 ? `${previewItems.join(' · ')} · +${remaining} more` : previewItems.join(' · ')
      acc[name] = preview
      return acc
    }, {})
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return

    const cardAnimation = anime({
      targets: '.skill-card',
      opacity: [0, 1],
      translateY: [32, 0],
      delay: (_element: Element, index: number) => 120 + index * 120,
      easing: 'easeOutExpo',
      duration: 900,
    })

    const iconAnimation = anime({
      targets: '.skill-card svg',
      scale: [0.92, 1.04, 0.98],
      direction: 'alternate',
      loop: true,
      duration: 3200,
      delay: (_element: Element, index: number) => 260 + index * 220,
      easing: 'easeInOutSine',
    })

    return () => {
      ;(cardAnimation as { pause?: () => void }).pause?.()
      ;(iconAnimation as { pause?: () => void }).pause?.()
    }
  }, [])

  return (
    <section
      id="skills"
      className="relative min-h-[80vh] bg-transparent px-6 py-20 sm:px-12 lg:px-20 content-visibility-auto"
      style={{ containIntrinsicSize: '780px' }}
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <h2 className="font-display text-4xl text-[#1e4238] sm:text-5xl">Skills</h2>
          <p className="mt-4 text-lg text-[#345043]">
            A canopy of languages, frameworks, and platforms that help me bridge imagination with interaction.
          </p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2">
          {skillCategories.map(({ name, icon: Icon, skills, description }) => {
            const isOpen = openCategories.includes(name)
            const preview = previews[name]

            return (
              <motion.div
              key={name}
              className="skill-card group relative overflow-hidden rounded-3xl border border-white/50 bg-white/70 p-6 shadow-lg shadow-forest/10 backdrop-blur"
              whileHover={{ y: -6, rotate: -0.6 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#c8e6f9]/40 blur-3xl transition group-hover:bg-[#a5d6a7]/50" />
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="animate-pulse-soft absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.55),transparent_60%)]" />
              </div>
              <button
                type="button"
                onClick={() => toggleCategory(name)}
                className="relative flex w-full items-start justify-between gap-4 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#a7d8c9] text-3xl text-[#1f4238] shadow-inner shadow-white/60 transition group-hover:shadow-glow">
                    <Icon />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-[#204838]">{name}</h3>
                      <span className="rounded-full bg-[#e2f6ee] px-2 py-0.5 text-xs font-medium text-[#1f4238]">
                        {skills.length} skills
                      </span>
                    </div>
                    <p className="text-sm text-[#285746]">{description}</p>
                    <p className="text-sm font-medium text-[#1f4238]/80">{preview}</p>
                  </div>
                </div>
                <span
                  className={`mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#a7d6c2]/70 bg-white/70 text-[#1f4238] transition-transform ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                  aria-hidden
                >
                  <FiChevronDown />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-[#a8d5c7]/80 bg-[#f1fbf7] px-3 py-1 text-sm font-medium text-[#1f4238] shadow-sm shadow-white/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
