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
  const skyTranslate = useTransform(scrollYProgress, [0, 1], [0, -240])
  const mountainTranslate = useTransform(scrollYProgress, [0, 1], [0, -620])
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
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Single flowing scenic background inspired by Hack the North's continuous cave approach */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -800]) }}
          className="w-full h-full"
        >
          <svg
            className="w-full h-full scenic-flow relative z-0"
            viewBox="0 0 1200 3200"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            style={{ minHeight: '400vh' }}
          >
            <defs>
              <linearGradient id="sky-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#a8e7ff" />
                <stop offset="40%" stopColor="#bfe9df" />
                <stop offset="100%" stopColor="#9fd6d8" />
              </linearGradient>
              <linearGradient id="mountain-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#c8f3ff" />
                <stop offset="30%" stopColor="#a5d6a7" />
                <stop offset="100%" stopColor="#4fa06e" />
              </linearGradient>
              <linearGradient id="water-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#c8f3ff" />
                <stop offset="100%" stopColor="#5fd1d8" />
              </linearGradient>
              <linearGradient id="forest-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#b9f6ca" />
                <stop offset="50%" stopColor="#4caf50" />
                <stop offset="100%" stopColor="#1b5e20" />
              </linearGradient>
              <linearGradient id="deep-forest" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2e7d32" />
                <stop offset="100%" stopColor="#0f2b21" />
              </linearGradient>
              <filter id="cloud-blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="16" />
              </filter>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/> 
                </feMerge>
              </filter>
            </defs>

            {/* Sky section */}
            <rect x="0" y="0" width="1200" height="800" fill="url(#sky-grad)" />
            
            {/* Clouds */}
            <g filter="url(#cloud-blur)" opacity="0.7">
              <ellipse cx="200" cy="120" rx="100" ry="35" fill="#ffffff" />
              <ellipse cx="600" cy="80" rx="140" ry="45" fill="#ffffff" />
              <ellipse cx="950" cy="140" rx="90" ry="30" fill="#ffffff" />
              <ellipse cx="350" cy="220" rx="120" ry="40" fill="#ffffff" />
            </g>

            {/* Mountain range */}
            {/* Base mountain fill removed to let external mountain0.svg stand out */}
            
            {/* Mountain peaks detail */}
            <path d="M420 320 L450 300 L480 350 Z" fill="#e8f5e8" opacity="0.6" />
            <path d="M720 370 L750 350 L780 400 Z" fill="#e8f5e8" opacity="0.5" />
            
            {/* Trees on mountain peaks */}
            <g>
              <g transform="translate(430,280)">
                <polygon points="0,20 8,0 16,20" fill="#1a472a" />
                <rect x="6" y="20" width="4" height="8" fill="#8d6e63" />
              </g>
              <g transform="translate(460,290)">
                <polygon points="0,18 7,0 14,18" fill="#2e7d32" />
                <rect x="5" y="18" width="4" height="6" fill="#8d6e63" />
              </g>
              <g transform="translate(730,330)">
                <polygon points="0,22 9,0 18,22" fill="#1a472a" />
                <rect x="7" y="22" width="4" height="8" fill="#8d6e63" />
              </g>
            </g>

            {/* Waterfall */}
            <path
              d="M450 320 C455 450, 470 650, 460 850 C450 1050, 420 1250, 380 1450"
              stroke="url(#water-grad)"
              strokeWidth="24"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
              filter="url(#glow)"
            />
            
            {/* Waterfall mist */}
            <ellipse cx="380" cy="1460" rx="80" ry="15" fill="#ffffff" opacity="0.3" />
            <ellipse cx="460" cy="850" rx="40" ry="10" fill="#ffffff" opacity="0.2" />
            
            {/* Forest canopy */}
            <path
              d="M0 1600 C150 1500, 300 1700, 450 1550 C600 1400, 750 1650, 900 1500 C1050 1600, 1200 1550, 1200 1600 L1200 2400 L0 2400 Z"
              fill="url(#forest-grad)"
            />
            
            {/* Forest trees */}
            <g>
              {/* Back layer trees */}
              <g transform="translate(80,1700)">
                <polygon points="0,120 20,60 40,120" fill="#2e7d32" />
                <polygon points="25,120 45,40 65,120" fill="#388e3c" />
              </g>
              <g transform="translate(300,1650)">
                <polygon points="0,140 25,50 50,140" fill="#1b5e20" />
                <polygon points="35,140 60,30 85,140" fill="#2e7d32" />
              </g>
              <g transform="translate(600,1680)">
                <polygon points="0,130 22,55 44,130" fill="#2e7d32" />
                <polygon points="30,130 52,35 74,130" fill="#1b5e20" />
              </g>
              <g transform="translate(850,1720)">
                <polygon points="0,110 18,50 36,110" fill="#388e3c" />
                <polygon points="24,110 42,40 60,110" fill="#2e7d32" />
              </g>
              
              {/* Mid layer trees */}
              <g transform="translate(150,1800)">
                <polygon points="0,100 15,45 30,100" fill="#1b5e20" />
              </g>
              <g transform="translate(450,1780)">
                <polygon points="0,110 17,40 34,110" fill="#2e7d32" />
              </g>
              <g transform="translate(750,1790)">
                <polygon points="0,95 14,48 28,95" fill="#1b5e20" />
              </g>
            </g>
            
            {/* River through forest */}
            <path
              d="M380 1450 C350 1650, 320 1850, 290 2050 C260 2250, 230 2450, 200 2650"
              stroke="#4fc3f7"
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
            
            {/* Forest floor */}
            <rect x="0" y="2400" width="1200" height="800" fill="url(#deep-forest)" />
            
            {/* Root patterns */}
            <g opacity="0.4" stroke="#8d6e63" fill="none">
              <path d="M100 2600 Q200 2550, 300 2600 T500 2600" strokeWidth="6" />
              <path d="M700 2550 Q800 2650, 900 2550 T1100 2550" strokeWidth="4" />
              <path d="M50 2800 Q150 2750, 250 2800" strokeWidth="3" />
            </g>
          </svg>
        </motion.div>
      </div>
      {/* Subtle decorative parallax layers that blend with the main scene */}
      <motion.div
        style={{ y: skyTranslate }}
        className="absolute inset-0 bg-gradient-to-b from-sky/10 via-transparent to-transparent opacity-20 pointer-events-none z-10"
      >
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#f6f5ff]/8 via-transparent to-transparent animate-pulse-soft" />
        {cloudOffsets.map((cloud, index) => (
          <div
            key={`cloud-${index}`}
            className="cloud-element absolute h-[160px] w-[320px] rounded-full bg-white/10 blur-3xl"
            style={{ top: cloud.top, left: cloud.left, transform: `scale(${cloud.scale})`, mixBlendMode: 'soft-light' }}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ y: mountainTranslate }}
        className="absolute inset-x-0 top-[30vh] flex justify-center pointer-events-none z-20"
      >
        <img
          src="/images/mountain0.svg"
          alt="Mountain ridge backdrop"
          className="block w-screen max-w-full h-auto object-contain"
          style={{ objectPosition: 'center bottom' }}
        />
      </motion.div>

      <motion.div
        style={{ y: canopyTranslate }}
        className="absolute inset-x-0 top-[55vh] h-[75vh] bg-gradient-to-b from-transparent via-transparent to-transparent opacity-18 pointer-events-none z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.04),transparent_45%)]" />
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
        className="absolute inset-x-0 top-[95vh] h-[70vh] bg-gradient-to-b from-transparent via-transparent to-transparent opacity-12 pointer-events-none z-10"
      >
        <div className="absolute inset-0 animate-river-flow bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.08),transparent_60%)] opacity-35" />
      </motion.div>

      <motion.div
        style={{ y: rootsTranslate }}
        className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-35 pointer-events-none z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.03),transparent_45%)] opacity-28" />
      </motion.div>
    </div>
  )
}

export default Background
