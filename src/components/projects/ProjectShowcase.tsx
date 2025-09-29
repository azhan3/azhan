import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import {
  SiCplusplus,
  SiCurl,
  SiD3Dotjs,
  SiElectron,
  SiFlask,
  SiGithub,
  SiOpencv,
  SiOpengl,
  SiPython,
  SiReact,
  SiVuedotjs,
} from 'react-icons/si'
import { PiCodeBold } from 'react-icons/pi'
import {
  TbBraces,
  TbBoxMultiple,
  TbCoffee,
  TbExternalLink,
  TbPresentationAnalytics,
  TbTopologyComplex,
} from 'react-icons/tb'
import projectsJson from '../../data/projects.json'
import type { ProjectData } from '../../types/project'

const parsedProjects: ProjectData[] = (projectsJson as unknown[]).map((entry) => {
  const project = entry as ProjectData
  return {
    ...project,
    links: Object.fromEntries(
      Object.entries(project.links || {}).filter(([, value]) => typeof value === 'string'),
    ),
  }
})

const accentPalette = [
  { accent: '#1f6f8b', halo: 'rgba(31,111,139,0.22)', orbit: 'rgba(31,111,139,0.2)', beam: 'rgba(31,111,139,0.12)' },
  { accent: '#2d7a5d', halo: 'rgba(45,122,93,0.22)', orbit: 'rgba(45,122,93,0.2)', beam: 'rgba(45,122,93,0.12)' },
  { accent: '#b8843c', halo: 'rgba(184,132,60,0.2)', orbit: 'rgba(184,132,60,0.18)', beam: 'rgba(184,132,60,0.12)' },
  { accent: '#5a4fb6', halo: 'rgba(90,79,182,0.2)', orbit: 'rgba(90,79,182,0.18)', beam: 'rgba(90,79,182,0.12)' },
]

const techIconMap: Record<string, IconType> = {
  'C++': SiCplusplus,
  'Electron.js': SiElectron,
  'D3.js': SiD3Dotjs,
  cURL: SiCurl,
  Java: TbCoffee,
  'Vert.x': TbTopologyComplex,
  'React.js': SiReact,
  OpenGL: SiOpengl,
  Python: SiPython,
  Flask: SiFlask,
  Mediapipe: TbPresentationAnalytics,
  OpenCV: SiOpencv,
  'Vue.js': SiVuedotjs,
  JBox2D: TbBoxMultiple,
  GSON: TbBraces,
}

const linkIconMap: Record<string, IconType> = {
  github: SiGithub,
  demo: TbExternalLink,
  presentation: TbPresentationAnalytics,
  docs: TbBraces,
}

const formatLabel = (input: string) =>
  input
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

export function ProjectShowcase() {
  const projects = useMemo(() => parsedProjects, [])

  return (
    <div className="space-y-16">
      {projects.map((project, index) => {
        const accent = accentPalette[index % accentPalette.length]
        const accentColor = accent.accent

        return (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            whileHover={{ y: -8, rotate: -0.35 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: index * 0.05 }}
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/80 p-10 shadow-[0_35px_80px_-35px_rgba(20,60,90,0.35)] backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute -top-28 -left-24 h-72 w-72 rounded-full blur-[120px] opacity-80 transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at center, ${accent.halo} 0%, transparent 70%)` }}
              />
              <div
                className="absolute -bottom-24 right-0 h-72 w-72 rounded-full blur-[130px]"
                style={{ background: `radial-gradient(circle at center, ${accent.beam} 0%, transparent 70%)` }}
              />
              <motion.span
                className="absolute right-16 top-10 block h-40 w-40 rounded-full border"
                style={{ borderColor: accent.orbit, boxShadow: `0 0 22px ${accent.orbit}` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 48, ease: 'linear', repeat: Infinity }}
              />
              <motion.span
                className="absolute -left-20 bottom-6 block h-32 w-32 rounded-full border"
                style={{ borderColor: `${accent.orbit}` }}
                animate={{ rotate: -360 }}
                transition={{ duration: 56, ease: 'linear', repeat: Infinity }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#4a6f82]">
              <span className="rounded-full border border-[#6fb0c520] bg-white/60 px-4 py-1 text-[0.7rem] text-[#2c4f62]">
                Project {index + 1}
              </span>
              <span
                className="rounded-full px-4 py-1 text-[0.7rem]"
                style={{
                  border: `1px solid ${accentColor}40`,
                  backgroundColor: `${accentColor}16`,
                  color: accentColor,
                }}
              >
                {project.tech[0]}
              </span>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
              <div className="relative order-2 overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] lg:order-1">
                <motion.div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(circle at 30% 20%, ${accent.beam} 0%, transparent 65%)` }}
                  animate={{ opacity: [0.35, 0.7, 0.35] }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden
                />
                <img
                  src={project.image}
                  alt={project.name}
                  className="relative z-10 mx-auto h-full w-full max-h-[320px] object-contain drop-shadow-[0_12px_35px_rgba(46,86,110,0.25)]"
                  loading="lazy"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-3xl text-[#0f2f42] sm:text-4xl">{project.name}</h3>
                  <p className="mt-4 text-base leading-relaxed text-[#1b4555] sm:text-lg">{project.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4a6f82]">Tech Stack</h4>
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {project.tech.map((tech) => {
                      const Icon = techIconMap[tech]
                      return (
                        <li
                          key={tech}
                          className="group flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-[#123f52] shadow-inner transition hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(70,130,150,0.18)]"
                          style={{
                            borderColor: `${accentColor}40`,
                            background: 'rgba(255,255,255,0.65)',
                          }}
                        >
                          {Icon ? (
                            <Icon className="text-lg transition group-hover:scale-110" style={{ color: accentColor }} />
                          ) : (
                            <PiCodeBold className="text-lg opacity-70" style={{ color: accentColor }} />
                          )}
                          <span>{tech}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                {Object.entries(project.links).length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(project.links).map(([key, url]) => {
                      const lowerKey = key.toLowerCase()
                      const Icon = linkIconMap[lowerKey] || TbExternalLink
                      const label = formatLabel(key)
                      return (
                        <a
                          key={key}
                          href={url}
                          className="group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition"
                          style={{
                            borderColor: `${accentColor}45`,
                            backgroundColor: `${accentColor}12`,
                            color: accentColor,
                          }}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Icon className="text-lg transition group-hover:translate-x-0.5" />
                          <span>{label}</span>
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        )
      })}
    </div>
  )
}

export default ProjectShowcase
