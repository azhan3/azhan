import { motion, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
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
  const [viewportWidth, setViewportWidth] = useState(() => (typeof window === 'undefined' ? 1280 : window.innerWidth))

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => setViewportWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const widthProgress = useMemo(() => {
    const minWidth = 720
    const maxWidth = 1920

    if (viewportWidth <= minWidth) return 0
    if (viewportWidth >= maxWidth) return 1
    return (viewportWidth - minWidth) / (maxWidth - minWidth)
  }, [viewportWidth])

  const parallaxDistances = useMemo(() => {
    const interpolate = (mobileValue: number, desktopValue: number) =>
      mobileValue + (desktopValue - mobileValue) * widthProgress

    return {
      sky: interpolate(-180, -360),
      mountainBack: interpolate(-260, -460),
      mountainMid: interpolate(-320, -2560),
      forest: interpolate(-260, -3520),
      forestFront: interpolate(-320, -1840),
      forestForeground: interpolate(-360, -2120),
      forestClosest: interpolate(-420, -2420),
      canopy: interpolate(-90, -170),
      river: interpolate(-45, -110),
      roots: interpolate(-25, -70),
    }
  }, [widthProgress])

  const mountainLayerPositions = useMemo(() => {
    const interpolate = (mobileValue: number, desktopValue: number) =>
      mobileValue + (desktopValue - mobileValue) * widthProgress

    return {
      back: interpolate(36, 18),
      mid: interpolate(52, 134),
      forest: interpolate(84, 210),
      forestFront: interpolate(100, 198),
      forestForeground: interpolate(112, 218),
      forestClosest: interpolate(122, 238),
    }
  }, [widthProgress])

  const skyTranslate = useTransform(scrollYProgress, [0, 1], [0, parallaxDistances.sky])
  const mountainTranslate = useTransform(scrollYProgress, [0, 1], [0, parallaxDistances.mountainBack])
  const mountainMidTranslate = useTransform(scrollYProgress, [0, 1], [0, parallaxDistances.mountainMid])
  const forestTranslate = useTransform(scrollYProgress, [0, 1], [0, parallaxDistances.forest])
  const forestFrontTranslate = useTransform(scrollYProgress, [0, 1], [0, parallaxDistances.forestFront])
  const forestForegroundTranslate = useTransform(scrollYProgress, [0, 1], [0, parallaxDistances.forestForeground])
  const forestClosestTranslate = useTransform(scrollYProgress, [0, 1], [0, parallaxDistances.forestClosest])
  const canopyTranslate = useTransform(scrollYProgress, [0, 1], [0, parallaxDistances.canopy])
  const riverTranslate = useTransform(scrollYProgress, [0, 1], [0, parallaxDistances.river])
  const rootsTranslate = useTransform(scrollYProgress, [0, 1], [0, parallaxDistances.roots])

  const mountainBackTop = mountainLayerPositions.back
  const mountainMidTop = mountainLayerPositions.mid
  const forestTop = mountainLayerPositions.forest
  const forestFrontTop = mountainLayerPositions.forestFront
  const forestForegroundTop = mountainLayerPositions.forestForeground
  const forestClosestTop = mountainLayerPositions.forestClosest
  const canopyTop = forestClosestTop + 10

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
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div style={{ y: skyTranslate }} className="absolute inset-0 opacity-25 pointer-events-none z-10">
        {cloudOffsets.map((cloud, index) => (
          <div
            key={`cloud-${index}`}
            className="cloud-element absolute h-[160px] w-[320px] rounded-full bg-white/10 blur-3xl"
            style={{ top: cloud.top, left: cloud.left, transform: `scale(${cloud.scale})`, mixBlendMode: 'soft-light' }}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ y: mountainTranslate, top: `${mountainBackTop}vh` }}
        className="absolute inset-x-0 flex justify-center pointer-events-none z-20"
      >
        <img
          src="/images/mountain0.svg"
          alt="Mountain ridge backdrop"
          className="block h-auto w-screen max-w-full object-contain"
          style={{ objectPosition: 'center bottom' }}
        />
      </motion.div>

      <motion.div
        style={{ y: mountainMidTranslate, top: `${mountainMidTop}vh` }}
        className="absolute inset-x-0 flex justify-center pointer-events-none z-30"
      >
        <img
          src="/images/mountain1.svg"
          alt="Foreground mountain ridge"
          className="block h-auto w-screen max-w-full object-contain"
          style={{ objectPosition: 'center bottom' }}
        />
      </motion.div>

      <motion.div
        style={{ y: forestTranslate, top: `${forestTop}vh` }}
        className="absolute inset-x-0 flex justify-center pointer-events-none z-40"
      >
        <img
          src="/images/forest0.svg"
          alt="Midground forest canopy"
          className="block h-auto w-screen max-w-full object-contain"
          style={{ objectPosition: 'center bottom' }}
        />
      </motion.div>

      <motion.div
        style={{ y: forestFrontTranslate, top: `${forestFrontTop}vh` }}
        className="absolute inset-x-0 flex justify-center pointer-events-none z-[45]"
      >
        <img
          src="/images/forest1.svg"
          alt="Foreground forest grove"
          className="block h-auto w-screen max-w-full object-contain"
          style={{ objectPosition: 'center bottom' }}
        />
      </motion.div>

      <motion.div
        style={{ y: forestForegroundTranslate, top: `${forestForegroundTop}vh` }}
        className="absolute inset-x-0 flex justify-center pointer-events-none z-[47]"
      >
        <img
          src="/images/forest2.svg"
          alt="Near forest silhouettes"
          className="block h-auto w-screen max-w-full object-contain"
          style={{ objectPosition: 'center bottom' }}
        />
      </motion.div>

      <motion.div
        style={{ y: forestClosestTranslate, top: `${forestClosestTop}vh` }}
        className="absolute inset-x-0 flex justify-center pointer-events-none z-[49]"
      >
        <img
          src="/images/forest3.svg"
          alt="Closest tree line"
          className="block h-auto w-screen max-w-full object-contain"
          style={{ objectPosition: 'center bottom' }}
        />
      </motion.div>

      <motion.div
        style={{ y: canopyTranslate, top: `${canopyTop}vh` }}
        className="absolute inset-x-0 flex justify-center pointer-events-none z-50"
      >
        <div className="relative h-[30vh] w-full max-w-5xl">
          {fireflyOffsets.map((fly, index) => (
            <span
              key={`firefly-${index}`}
              className="firefly absolute h-2 w-2 rounded-full bg-amber-100/80 drop-shadow-[0_0_10px_rgba(255,255,255,0.45)]"
              style={{ top: fly.top, left: fly.left }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        style={{ y: riverTranslate }}
        className="absolute inset-x-0 top-[95vh] h-[70vh] pointer-events-none z-20"
      >
        <div className="absolute inset-x-[12%] top-1/4 h-2 rounded-full bg-white/15 opacity-80 blur-sm animate-river-flow" />
        <div className="absolute inset-x-[25%] top-1/2 h-[3px] rounded-full bg-white/10 opacity-70 blur-[2px] animate-river-flow" />
        <div className="absolute inset-x-[18%] bottom-[22%] h-[5px] rounded-full bg-cyan-200/10 blur-md animate-river-flow" />
      </motion.div>

      <motion.div
        style={{ y: rootsTranslate }}
        className="absolute inset-x-0 bottom-0 h-[60vh] pointer-events-none z-10"
      >
        <div className="absolute inset-x-[12%] bottom-[16%] h-px bg-white/8 opacity-80" />
        <div className="absolute inset-x-[30%] bottom-[10%] h-[3px] rounded-full bg-amber-900/20 opacity-60" />
        <div className="absolute inset-x-[45%] bottom-[6%] h-[2px] rounded-full bg-amber-700/15 opacity-60" />
      </motion.div>
    </div>
  )
}

export default Background

