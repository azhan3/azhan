import { motion, useTransform, type MotionValue } from 'framer-motion'
import { useEffect } from 'react'
import anime from 'animejs'

interface BackgroundProps {
  scrollYProgress: MotionValue<number>
}

const cloudOffsets = [
  { top: '10%', left: '5%', scale: 1 },
  { top: '20%', left: '60%', scale: 1.2 },
  { top: '35%', left: '30%', scale: 0.9 },
]

const fireflyOffsets = Array.from({ length: 12 }, (_, index) => ({
  top: `${30 + Math.sin(index) * 8}%`,
  left: `${10 + index * 7}%`,
}))

export function Background({ scrollYProgress }: BackgroundProps) {
  const skyTranslate = useTransform(scrollYProgress, [0, 1], [0, -320])
  const mountainTranslate = useTransform(scrollYProgress, [0, 1], [0, -180])
  const canopyTranslate = useTransform(scrollYProgress, [0, 1], [0, -120])
  const riverTranslate = useTransform(scrollYProgress, [0, 1], [0, -60])
  const rootsTranslate = useTransform(scrollYProgress, [0, 1], [0, -40])

  useEffect(() => {
    anime({
      targets: '.cloud-element',
      translateX: [0, 60],
      direction: 'alternate',
      easing: 'easeInOutSine',
      duration: 12000,
      loop: true,
      delay: (_element: Element, i: number) => i * 900,
    })

    anime({
      targets: '.firefly',
      translateY: [0, -18],
      opacity: [{ value: 0.2, duration: 0 }, { value: 0.95, duration: 2200 }, { value: 0.4, duration: 2200 }],
      scale: [0.8, 1.2, 0.85],
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true,
      duration: 5200,
      delay: (_element: Element, i: number) => 200 * i,
    })
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-sky">
      <motion.div
        style={{ y: skyTranslate }}
        className="absolute inset-0 bg-gradient-to-b from-sky via-[#a0d7e7] to-[#8ecae6]"
      >
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#f6f5ff]/40 via-transparent to-transparent animate-pulse-soft" />
        {cloudOffsets.map((cloud, index) => (
          <div
            key={`cloud-${index}`}
            className="cloud-element absolute h-[160px] w-[320px] rounded-full bg-white/65 blur-xl"
            style={{ top: cloud.top, left: cloud.left, transform: `scale(${cloud.scale})` }}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ y: mountainTranslate }}
        className="absolute inset-x-0 top-[30vh] h-[60vh] bg-gradient-to-b from-mountain/80 via-mountain/90 to-forest/70"
      >
        <svg className="absolute inset-0 h-full w-full opacity-70" preserveAspectRatio="none" viewBox="0 0 1440 600">
          <path d="M0 400L240 220L420 360L640 180L900 380L1100 260L1440 420V600H0Z" fill="url(#mountain-grad)" />
          <defs>
            <linearGradient id="mountain-grad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#a5d6a7" />
              <stop offset="100%" stopColor="#4caf50" stopOpacity="0.85" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c5234]/40 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: canopyTranslate }}
        className="absolute inset-x-0 top-[55vh] h-[75vh] bg-gradient-to-b from-forest/90 via-forest/80 to-river/70 section-mask"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_45%)]" />
        {fireflyOffsets.map((fly, index) => (
          <span
            key={`firefly-${index}`}
            className="firefly absolute h-2 w-2 rounded-full bg-[#fffde7] shadow-glow"
            style={{ top: fly.top, left: fly.left }}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ y: riverTranslate }}
        className="absolute inset-x-0 top-[95vh] h-[70vh] bg-gradient-to-b from-river/80 via-river/90 to-[#2d6a6c]"
      >
        <div className="absolute inset-0 animate-river-flow bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.35),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.22),transparent_55%),radial-gradient(circle_at_40%_70%,rgba(255,255,255,0.15),transparent_55%)] opacity-70" />
        <svg className="absolute inset-x-0 top-1/4 h-28 w-full opacity-50" preserveAspectRatio="none" viewBox="0 0 1440 200">
          <path d="M0 120C160 160 320 80 480 120C640 160 800 120 960 140C1120 160 1280 140 1440 120V200H0Z" fill="rgba(255,255,255,0.4)" />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: rootsTranslate }}
        className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-b from-[#2e1f16] via-roots/90 to-black"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.12),transparent_45%)] opacity-40" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=40 height=40 xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 20 Q10 10 20 20 T40 20\' stroke=\'%236d4c41\' stroke-width=2 fill=\'none\' opacity=0.4/%3E%3C/svg%3E')] opacity-60 mix-blend-soft-light" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </motion.div>
    </div>
  )
}

export default Background
