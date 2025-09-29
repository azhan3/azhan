import { useMemo, type ReactNode } from 'react'
import ProjectRiver from './ProjectRiver'
import ProjectCube from './ProjectCube'
import ProjectCarousel from './ProjectCarousel'
import ProjectConstellation from './ProjectConstellation'
import ProjectCard from './ProjectCard'
import type { ProjectData } from '../../types/project'
// Vite/Babel warns about the deprecated `assert { type: 'json' }` syntax.
// Remove the import assertion and let TypeScript handle JSON module resolution
// via `resolveJsonModule` in tsconfig. Treat the imported JSON as unknown.
import projectsJson from '../../data/projects.json'

type LayoutKey = 'river' | 'cube' | 'carousel' | 'constellation' | 'rafts'

const layoutComponents: Record<LayoutKey, (projects: ProjectData[]) => ReactNode> = {
  river: (projects) => <ProjectRiver projects={projects} />,
  cube: (projects) => <ProjectCube projects={projects} />,
  carousel: (projects) => <ProjectCarousel projects={projects} />,
  constellation: (projects) => <ProjectConstellation projects={projects} />,
  rafts: (projects) => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
      {projects.map((project, index) => (
        <div key={project.name} className="animate-float-slow" style={{ animationDelay: `${index * 0.4}s` }}>
          <ProjectCard project={project} accent={index % 2 === 0 ? 'forest' : 'sky'} />
        </div>
      ))}
    </div>
  ),
}

function shuffleProjects(list: ProjectData[]): ProjectData[] {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const parsedProjects: ProjectData[] = (projectsJson as unknown[]).map((entry) => {
  const project = entry as ProjectData
  return {
    ...project,
    links: Object.fromEntries(
      Object.entries(project.links || {}).filter(([, value]) => typeof value === 'string'),
    ),
  }
})

export function ProjectShowcase() {
  const { layout, projects } = useMemo(() => {
    const layouts: LayoutKey[] = ['river', 'cube', 'carousel', 'constellation', 'rafts']
    const chosen = layouts[Math.floor(Math.random() * layouts.length)]
    return {
      layout: chosen,
      projects: shuffleProjects(parsedProjects),
    }
  }, [])

  const renderLayout = layoutComponents[layout]

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-3xl text-[#123d3c]">Project layout: {layout}</h3>
        <span className="rounded-full bg-[#c8e6f9]/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#1b5451]">
          Shuffles every visit
        </span>
      </div>
      {renderLayout(projects)}
    </div>
  )
}

export default ProjectShowcase
