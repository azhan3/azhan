declare module 'animejs' {
  type AnimeConfig = Record<string, unknown>
  type AnimeInstance = Record<string, unknown>

  const anime: (params: AnimeConfig) => AnimeInstance
  export default anime
}
