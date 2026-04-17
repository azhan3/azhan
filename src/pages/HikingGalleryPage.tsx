import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { hikingGallerySections } from '../data/hikingGallery'
import type { HikingLocationSection, HikingPhoto } from '../types/hiking'

const DEFAULT_ASPECT_RATIO = 1.4
const GRID_GAP = 20

interface RowItem {
  photo: HikingPhoto
  width: number
  height: number
  aspect: number
}

interface RowLayout {
  items: RowItem[]
}

const RESPONSIVE_THUMB_WIDTHS = [480, 720, 960, 1280, 1600, 2000]

function isCloudinaryImage(src: string) {
  return src.includes('res.cloudinary.com')
}

function getCloudinaryOptimizedUrl(src: string, width: number) {
  if (!isCloudinaryImage(src)) return src
  return src.replace('/upload/', `/upload/f_auto,q_auto,dpr_auto,c_limit,w_${width}/`)
}

function getResponsiveSrcSet(src: string) {
  if (!isCloudinaryImage(src)) return undefined
  return RESPONSIVE_THUMB_WIDTHS.map((width) => `${getCloudinaryOptimizedUrl(src, width)} ${width}w`).join(', ')
}

function getTargetRowHeight(containerWidth: number) {
  if (containerWidth >= 1440) return 380
  if (containerWidth >= 1160) return 340
  if (containerWidth >= 900) return 300
  if (containerWidth >= 680) return 260
  return 220
}

function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!ref.current || typeof ResizeObserver === 'undefined') return

    const element = ref.current
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })

    setWidth(element.getBoundingClientRect().width)
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return { ref, width }
}

function getPhotoScale(photo: HikingPhoto) {
  if (Number.isFinite(photo.scale) && (photo.scale as number) > 0) {
    return photo.scale as number
  }
  return 1
}

function buildJustifiedRows(
  photos: HikingPhoto[],
  aspectBySrc: Record<string, number>,
  containerWidth: number,
): RowLayout[] {
  if (!photos.length || containerWidth <= 0) return []

  const targetRowHeight = getTargetRowHeight(containerWidth)
  const rows: RowLayout[] = []
  let rowBuffer: Array<{ photo: HikingPhoto; aspect: number; scale: number }> = []
  let rowWeightedAspectSum = 0

  const finalizeRow = (justifyToWidth: boolean) => {
    if (!rowBuffer.length) return

    const gapTotal = GRID_GAP * Math.max(0, rowBuffer.length - 1)
    let baseHeight = justifyToWidth ? (containerWidth - gapTotal) / rowWeightedAspectSum : targetRowHeight

    const widthAtBaseHeight = rowWeightedAspectSum * baseHeight + gapTotal
    if (widthAtBaseHeight > containerWidth) {
      baseHeight = (containerWidth - gapTotal) / rowWeightedAspectSum
    }

    rows.push({
      items: rowBuffer.map(({ photo, aspect, scale }) => ({
        photo,
        width: baseHeight * scale * aspect,
        height: baseHeight * scale,
        aspect,
      })),
    })

    rowBuffer = []
    rowWeightedAspectSum = 0
  }

  photos.forEach((photo) => {
    const aspect = aspectBySrc[photo.src] || DEFAULT_ASPECT_RATIO
    const scale = getPhotoScale(photo)

    if (rowBuffer.length) {
      const nextWeightedAspectSum = rowWeightedAspectSum + aspect * scale
      const nextGapTotal = GRID_GAP * rowBuffer.length
      const nextWidthAtTargetHeight = nextWeightedAspectSum * targetRowHeight + nextGapTotal

      if (nextWidthAtTargetHeight > containerWidth * 1.02) {
        const currentGapTotal = GRID_GAP * Math.max(0, rowBuffer.length - 1)
        const currentWidthAtTargetHeight = rowWeightedAspectSum * targetRowHeight + currentGapTotal
        finalizeRow(currentWidthAtTargetHeight >= containerWidth * 0.78)
      }
    }

    rowBuffer.push({ photo, aspect, scale })
    rowWeightedAspectSum += aspect * scale

    const estimatedRowWidth = rowWeightedAspectSum * targetRowHeight + GRID_GAP * Math.max(0, rowBuffer.length - 1)
    if (estimatedRowWidth >= containerWidth * 0.98) {
      finalizeRow(true)
    }
  })

  finalizeRow(false)
  return rows
}

interface GallerySectionProps {
  section: HikingLocationSection
  aspectBySrc: Record<string, number>
  onImageLoad: (src: string, width: number, height: number) => void
}

function GallerySection({ section, aspectBySrc, onImageLoad }: GallerySectionProps) {
  const { ref: sectionGridRef, width: sectionGridWidth } = useElementWidth<HTMLDivElement>()
  const prefersReducedMotion = useReducedMotion()

  const justifiedRows = useMemo(
    () => buildJustifiedRows(section.photos, aspectBySrc, sectionGridWidth),
    [section.photos, aspectBySrc, sectionGridWidth],
  )

  return (
    <motion.section
      key={section.id}
      className="mt-14 border-t border-[#dce6e3] pt-10"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '720px' }}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="mb-6 grid gap-3 sm:grid-cols-1 sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#789792]">{section.subtitle}</p>
          <h3 className="mt-2 font-display text-3xl text-[#1b3434] sm:text-4xl">{section.location}</h3>
        </div>
      </div>

      <div ref={sectionGridRef} className="space-y-5">
        {justifiedRows.map((row, rowIndex) => (
          <div key={`${section.id}-row-${rowIndex}`} className="flex items-end gap-5 overflow-hidden">
            {row.items.map((item) => (
              <figure
                key={`${section.id}-${item.photo.src}`}
                style={{
                  width: `${item.width}px`,
                  height: `${item.height}px`,
                  flex: `0 0 ${item.width}px`,
                  aspectRatio: item.aspect,
                }}
                className="relative overflow-hidden rounded-2xl border border-[#d9e4e1] bg-white shadow-[0_20px_45px_-35px_rgba(15,41,40,0.8)]"
              >
                <img
                  src={getCloudinaryOptimizedUrl(item.photo.src, 1280)}
                  srcSet={getResponsiveSrcSet(item.photo.src)}
                  sizes={`${Math.max(280, Math.round(item.width))}px`}
                  alt={item.photo.alt}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  onLoad={(event) => onImageLoad(item.photo.src, event.currentTarget.naturalWidth, event.currentTarget.naturalHeight)}
                  className="block h-full w-full object-cover"
                />
                {item.photo.caption?.trim() ? (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/35 to-transparent px-4 pb-4 pt-10 text-sm text-white">
                    {item.photo.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        ))}
      </div>
    </motion.section>
  )
}

export function HikingGalleryPage() {
  const [aspectBySrc, setAspectBySrc] = useState<Record<string, number>>({})
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.36,
  })

  const onImageLoad = useCallback((src: string, width: number, height: number) => {
    if (!width || !height) return
    const aspectRatio = width / height

    setAspectBySrc((prev) => {
      if (prev[src] && Math.abs(prev[src] - aspectRatio) < 0.001) return prev
      return { ...prev, [src]: aspectRatio }
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#fbfbf8] text-[#1f2f32]">
      <header className="sticky top-0 z-20 border-b border-[#dce6e3] bg-white/95 backdrop-blur">
        <motion.div className="h-[2px] origin-left bg-[#4d7c76]" style={{ scaleX: smoothProgress }} />
        <div className="mx-auto flex w-full max-w-[96rem] items-center justify-between px-6 py-4 sm:px-10 lg:px-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#61817b]">Hiking Photos</p>
          </div>
          <Link
            to="/"
            className="rounded-full border border-[#c9d7d2] px-5 py-2 text-sm font-semibold text-[#2c4f4f] transition hover:border-[#9cb7b1] hover:bg-[#f3f8f6]"
          >
            Back to Portfolio
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[96rem] px-6 pb-16 pt-10 sm:px-10 sm:pt-14 lg:px-14">


        {hikingGallerySections.map((section) => (
          <GallerySection
            key={section.id}
            section={section}
            aspectBySrc={aspectBySrc}
            onImageLoad={onImageLoad}
          />
        ))}
      </main>
    </div>
  )
}

export default HikingGalleryPage
