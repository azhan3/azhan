import { useEffect, type RefObject } from 'react'
import anime from 'animejs'

type AnimeParams = {
  targets?: string | Element | Element[]
  duration?: number
  delay?: number | ((element: Element, index: number) => number)
  easing?: string
  loop?: boolean | number
  direction?: string
  opacity?: unknown
  translateX?: unknown
  translateY?: unknown
  scale?: unknown
  [key: string]: unknown
}

interface Options {
  threshold?: number
  once?: boolean
}

export function useAnimeOnInView<T extends Element>(
  ref: RefObject<T | null>,
  params: AnimeParams,
  { threshold = 0.35, once = true }: Options = {},
) {
  useEffect(() => {
    const target = ref.current
    if (!target) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({ targets: entry.target, ...params })
            if (once) {
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [params, ref, threshold, once])
}
