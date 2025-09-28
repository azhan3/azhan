import { motion } from 'framer-motion'
import type { ProjectData } from '../../types/project'

interface ProjectCubeProps {
  projects: ProjectData[]
}

export function ProjectCube({ projects }: ProjectCubeProps) {
  const faces = projects.slice(0, 4)

  return (
    <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-[3rem] bg-gradient-to-br from-[#0b2c3b]/80 via-[#164d5a]/70 to-[#1f6963]/80 p-10 shadow-2xl shadow-black/40">
      <h3 className="font-display text-3xl text-[#c8f8ff]">Forest textures cube</h3>
      <div className="relative h-72 w-72">
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
          animate={{ rotateY: [0, 90, 180, 270, 360] }}
          transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
        >
          {faces.map((project, index) => {
            const rotation = index * 90
            return (
              <div
                key={project.name}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `rotateY(${rotation}deg) translateZ(140px)`,
                }}
              >
                <div className="flex h-40 w-40 flex-col items-center justify-center gap-3 rounded-3xl border border-white/20 bg-white/15 px-6 text-center text-white/90 backdrop-blur-md">
                  <img src={project.image} alt="project" className="h-20 w-20 rounded-2xl object-contain ring-1 ring-white/40" />
                  <span className="text-sm font-semibold uppercase tracking-[0.3em]">{project.name}</span>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
      <p className="max-w-xl text-center text-sm text-[#d9ffef]/80">
        Spin the cube to see each project shimmer with forest tones. Hover faces to pause the rotation and soak in every detail.
      </p>
    </div>
  )
}

export default ProjectCube
