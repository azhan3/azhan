import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import anime from 'animejs'
import type { IconType } from 'react-icons'
import { FiBox, FiChevronDown, FiCode, FiGrid, FiTool } from 'react-icons/fi'
import { FaJava } from 'react-icons/fa'
import {
  SiAngular,
  SiArduino,
  SiChartdotjs,
  SiCplusplus,
  SiCurl,
  SiDjango,
  SiDocker,
  SiElectron,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJenkins,
  SiLinux,
  SiMediapipe,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiOpencv,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiScipy,
  SiSqlite,
  SiTypescript,
  SiVim,
  SiVuedotjs,
  SiEclipsevertdotx,
} from 'react-icons/si'

type SkillWithIcon = {
  name: string
  icon: IconType
}

type SkillCategory = {
  name: string
  icon: IconType
  skills: SkillWithIcon[]
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    icon: FiCode,
    skills: [
      { name: 'C/C++', icon: SiCplusplus },
      { name: 'Python', icon: SiPython },
      { name: 'Java', icon: FaJava },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'HTML/CSS', icon: SiHtml5 },
      { name: 'SQLite', icon: SiSqlite },
      { name: 'Arduino', icon: SiArduino },
    ],
  },
  {
    name: 'Frameworks',
    icon: FiGrid,
    skills: [
      { name: 'Flask', icon: SiFlask },
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express.js', icon: SiExpress },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Angular', icon: SiAngular },
      { name: 'Django', icon: SiDjango },
      { name: 'React.js', icon: SiReact },
      { name: 'Vue.js', icon: SiVuedotjs },
      { name: 'Electron.js', icon: SiElectron },
      { name: 'React Native', icon: SiReact },
      { name: 'Vert.x', icon: SiEclipsevertdotx },
    ],
  },
  {
    name: 'Developer Tools',
    icon: FiTool,
    skills: [
      { name: 'Linux', icon: SiLinux },
      { name: 'Vim', icon: SiVim },
      { name: 'Jenkins', icon: SiJenkins },
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Docker', icon: SiDocker },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'FastAPI', icon: SiFastapi },
      { name: 'Firebase', icon: SiFirebase },
    ],
  },
  {
    name: 'Libraries',
    icon: FiBox,
    skills: [
      { name: 'pandas', icon: SiPandas },
      { name: 'NumPy', icon: SiNumpy },
      { name: 'PyTorch', icon: SiPytorch },
      { name: 'Matplotlib', icon: SiChartdotjs },
      { name: 'Scikit-learn', icon: SiScikitlearn },
      { name: 'SciPy', icon: SiScipy },
      { name: 'OpenCV', icon: SiOpencv },
      { name: 'Mediapipe', icon: SiMediapipe },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'cURL', icon: SiCurl },
    ],
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
      const previewItems = skills.slice(0, 3).map((skill) => skill.name)
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

    return () => {
      ;(cardAnimation as { pause?: () => void }).pause?.()
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
          
        </header>
        <div className="grid gap-6 sm:grid-cols-2">
          {skillCategories.map(({ name, icon: Icon, skills }) => {
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
                        {skills.map(({ name: skillName, icon: SkillIcon }) => (
                          <span
                            key={skillName}
                            className="inline-flex items-center gap-2 rounded-full border border-[#a8d5c7]/80 bg-[#f1fbf7] px-3 py-1 text-sm font-medium text-[#1f4238] shadow-sm shadow-white/60"
                          >
                            <SkillIcon className="text-base text-[#2e574d]" />
                            {skillName}
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
