export interface HikingPhoto {
  src: string
  alt: string
  caption: string
}

export interface HikingLocationSection {
  id: string
  location: string
  subtitle: string
  notes: string
  photos: HikingPhoto[]
}
