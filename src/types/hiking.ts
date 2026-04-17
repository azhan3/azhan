export interface HikingPhoto {
  src: string
  alt: string
  caption?: string
  scale?: number
}

export interface HikingLocationSection {
  id: string
  location: string
  subtitle: string
  photos: HikingPhoto[]
}
