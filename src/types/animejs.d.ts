declare module 'animejs' {
  type AnimeConfig = Record<string, unknown>
  type AnimeInstance = Record<string, unknown>

  interface AnimeHelpers {
    stagger: (value: number) => ((i: number, el?: Element) => number)
    random: (min: number, max: number) => number
    setDashoffset: (el: SVGElement) => number
  }

  const anime: ((params: AnimeConfig) => AnimeInstance) & AnimeHelpers
  export default anime
}
