import { motion } from 'framer-motion'
import type { ProjectData } from '../../types/project'

interface ProjectCardProps {
  project: ProjectData
  accent?: 'river' | 'forest' | 'sky' | 'roots'
}

const accentMap: Record<Required<ProjectCardProps>['accent'], string> = {
  river: 'from-river/90 via-[#4ecab7] to-[#c8e6f9] text-[#0c3b40]',
  forest: 'from-forest/90 via-[#5acb7a] to-[#d9ffef] text-[#14402a]',
  sky: 'from-sky/95 via-[#e0f4ff] to-white text-[#1c4b68]',
  roots: 'from-[#5e3a28] via-[#7b4d3b] to-[#e4c1a1] text-[#2b1a13]',
}

export function ProjectCard({ project, accent = 'forest' }: ProjectCardProps) {
  const accentClasses = accentMap[accent]

  return (
    <motion.article
      whileHover={{ y: -10, rotate: -0.8 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br ${accentClasses} shadow-xl shadow-black/20`}
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-80" />
      <div className="relative flex flex-1 flex-col gap-4 p-6">
        <img
          src={project.image}
          alt={`${project.name} illustration`}
          className="h-40 w-full rounded-2xl object-cover object-center shadow-lg shadow-black/30 ring-2 ring-white/40"
        />
        <div className="space-y-3">
          <h3 className="font-display text-2xl">{project.name}</h3>
          <p className="text-sm leading-relaxed text-black/70">
            {project.description}
          </p>
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li key={tech} className="rounded-full bg-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative flex gap-3 border-t border-white/30 bg-white/15 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black/70">
        {Object.entries(project.links).map(([label, url]) => (
          <a key={label} href={url} target="_blank" rel="noreferrer" className="group/link inline-flex items-center gap-1">
            <span className="capitalize">{label}</span>
            <span aria-hidden className="transition group-hover/link:translate-x-1">→</span>
          </a>
        ))}
      </div>
    </motion.article>
  )
}

export default ProjectCard
