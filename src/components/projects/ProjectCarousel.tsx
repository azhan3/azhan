import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { ProjectData } from '../../types/project'

interface ProjectCarouselProps {
  projects: ProjectData[]
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (projects.length <= 1 || typeof window === 'undefined') return () => {}
    const handle = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % projects.length)
    }, 5200)
    return () => window.clearInterval(handle)
  }, [projects.length])

  const project = projects[index]

  return (
    <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-[3rem] bg-gradient-to-br from-[#fef8f4]/90 via-[#f6fff9]/85 to-[#e1f7ff]/90 p-10 shadow-xl shadow-black/20">
      <h3 className="font-display text-3xl text-[#264b63]">Sketchbook carousel</h3>
      <div className="relative h-80 w-full max-w-3xl">
        <div className="absolute inset-0 rounded-[2.5rem] border-4 border-[#d8ede5] bg-white/80 shadow-lg shadow-[#316b69]/20" />
        <AnimatePresence mode="wait">
          <motion.div
            key={project.name}
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-4 flex flex-col justify-between rounded-[2rem] border border-[#a4d5c7]/60 bg-gradient-to-br from-[#e0ffef]/70 to-white/90 p-8 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#c8e6f9]/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#2f5a6c]">
                {index + 1} / {projects.length}
              </span>
              <button
                type="button"
                className="rounded-full bg-[#4caf50]/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white"
                onClick={() => setIndex((prev) => (prev + 1) % projects.length)}
              >
                Next
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img src={project.image} alt="project" className="h-20 w-20 rounded-2xl object-contain ring-1 ring-[#9bd8c4]" />
                <div>
                  <h4 className="font-display text-2xl text-[#2b4c3f]">{project.name}</h4>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#4caf50]">
                    {project.tech.join(' · ')}
                  </p>
                </div>
              </div>
              <p className="text-base leading-relaxed text-[#2f4f45]">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#2d4b46]">
              {Object.entries(project.links).map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noreferrer" className="rounded-full bg-[#cdf7ec]/80 px-4 py-2 hover:bg-[#b2f5dc]">
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-3">
        {projects.map((_, dotIndex) => (
          <button
            key={dotIndex}
            type="button"
            onClick={() => setIndex(dotIndex)}
            className={`h-3 w-3 rounded-full transition ${dotIndex === index ? 'bg-[#4caf50]' : 'bg-[#a7d8c9]/80'}`}
            aria-label={`Go to project ${dotIndex + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectCarousel
