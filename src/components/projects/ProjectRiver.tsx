import { motion } from 'framer-motion'
import type { ProjectData } from '../../types/project'
import ProjectCard from './ProjectCard'

interface ProjectRiverProps {
  projects: ProjectData[]
}

export function ProjectRiver({ projects }: ProjectRiverProps) {
  return (
    <div className="relative overflow-hidden rounded-[3rem] border border-white/30 bg-river/40 p-6 shadow-inner shadow-river/50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.35),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
      <div className="relative flex gap-6 overflow-x-auto pb-4 pt-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            className="min-w-[320px] max-w-[360px] flex-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.12, duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, repeatType: 'mirror', duration: 6, ease: 'easeInOut' }}>
              <ProjectCard project={project} accent="river" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ProjectRiver
