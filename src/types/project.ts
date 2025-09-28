export interface ProjectLink {
  label: string
  url: string
}

export interface ProjectData {
  name: string
  description: string
  tech: string[]
  image: string
  links: Record<string, string>
}
