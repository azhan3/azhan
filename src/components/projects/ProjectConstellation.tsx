import { motion } from 'framer-motion'
import type { ProjectData } from '../../types/project'

interface ProjectConstellationProps {
  projects: ProjectData[]
}

const positions = [
  { top: '10%', left: '18%' },
  { top: '35%', left: '55%' },
  { top: '62%', left: '24%' },
  { top: '72%', left: '68%' },
]

export function ProjectConstellation({ projects }: ProjectConstellationProps) {
  const nodes = projects.slice(0, positions.length)
  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-[3rem] border border-white/20 bg-gradient-to-br from-[#0f1d2a]/90 via-[#183b4a]/85 to-[#1f514f]/90 shadow-2xl shadow-black/40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.28),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(180,255,240,0.18),transparent_50%),radial-gradient(circle_at_40%_80%,rgba(255,255,200,0.1),transparent_50%)]" />
      <div className="absolute inset-0">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M18 18 L55 35 L24 62 L68 72"
            stroke="rgba(200, 255, 232, 0.45)"
            strokeWidth="0.6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="200"
            strokeDashoffset="200"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
          />
        </svg>
      </div>
      {nodes.map((project, index) => (
        <motion.div
          key={project.name}
          className="absolute"
          style={positions[index]}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: index * 0.2, duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="flex w-48 flex-col gap-2 rounded-3xl border border-white/20 bg-white/15 p-4 text-white/90 backdrop-blur"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, repeatType: 'mirror', duration: 8, ease: 'easeInOut' }}
          >
            <img src={project.image} alt="project" className="h-14 w-14 rounded-2xl object-contain ring-1 ring-white/40" />
            <div>
              <h4 className="font-display text-lg">{project.name}</h4>
              <p className="text-xs text-[#c8f8ff]">{project.tech.slice(0, 3).join(' · ')}</p>
            </div>
            <p className="text-xs leading-relaxed text-[#e3fff7]/80">{project.description}</p>
            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-[#b7f7e7]">
              {Object.entries(project.links).map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noreferrer" className="rounded-full bg-white/10 px-2 py-1">
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default ProjectConstellation
