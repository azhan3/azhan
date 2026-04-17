import type { HikingLocationSection } from '../types/hiking'

const fromUnsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`

// To use your own images:
// 1) Add files under public/images/hiking/
// 2) Replace src with `${import.meta.env.BASE_URL}images/hiking/<your-file-name>`
// 3) Duplicate a section object below to add a new location block
export const hikingGallerySections: HikingLocationSection[] = [
  {
    id: 'banff',
    location: 'Banff National Park',
    subtitle: 'Alpine ridgelines and sunrise starts',
    notes:
      'A mix of pre-dawn climbs, icy lakes, and long ridge walks with steady elevation gain.',
    photos: [
      {
        src: fromUnsplash('photo-1464822759023-fed622ff2c3b'),
        alt: 'Snowy mountain ridge with dramatic clouds',
        caption: 'First light over the ridge line.',
      },
      {
        src: fromUnsplash('photo-1469474968028-56623f02e42e'),
        alt: 'A mountain valley with layered peaks',
        caption: 'Weather changed every twenty minutes.',
      },
      {
        src: fromUnsplash('photo-1472396961693-142e6e269027'),
        alt: 'Rocky summit trail with broad sky',
        caption: 'Final push before the summit marker.',
      },
      {
        src: fromUnsplash('photo-1448375240586-882707db888b'),
        alt: 'Forest path with sunlight through trees',
        caption: 'Descent through old-growth trail sections.',
      },
    ],
  },
  {
    id: 'jasper',
    location: 'Jasper Backcountry',
    subtitle: 'High passes and glacier-fed lakes',
    notes:
      'Long mileage days with exposed traverse segments and strong wind above tree line.',
    photos: [
      {
        src: fromUnsplash('photo-1501556424050-d4816356b73e'),
        alt: 'Hiker standing above a mountain lake',
        caption: 'Cold wind, clear sky, no crowds.',
      },
      {
        src: fromUnsplash('photo-1517824806704-9040b037703b'),
        alt: 'Wide mountain landscape with rocky slopes',
        caption: 'Traverse section before the pass.',
      },
      {
        src: fromUnsplash('photo-1469854523086-cc02fe5d8800'),
        alt: 'Trail running through open alpine terrain',
        caption: 'Fast-moving weather near camp.',
      },
      {
        src: fromUnsplash('photo-1470770903676-69b98201ea1c'),
        alt: 'Misty mountain layers at sunset',
        caption: 'Evening conditions after a storm front.',
      },
      {
        src: fromUnsplash('photo-1500530855697-b586d89ba3ee'),
        alt: 'Hiker walking on rocky mountain terrain',
        caption: 'Switchbacks with glacier views all day.',
      },
    ],
  },
  {
    id: 'squamish',
    location: 'Squamish Trails',
    subtitle: 'Granite, forest, and coastal fog',
    notes:
      'Shorter but steeper routes that combine technical sections with dense rainforest.',
    photos: [
      {
        src: fromUnsplash('photo-1465189684280-6a8fa9b19a7a'),
        alt: 'Mountain trail curving around cliffs',
        caption: 'Narrow trail with sudden ocean views.',
      },
      {
        src: fromUnsplash('photo-1434725039720-aaad6dd32dfe'),
        alt: 'Dense trees and hiking path',
        caption: 'Rainforest section before the granite slab.',
      },
      {
        src: fromUnsplash('photo-1501785888041-af3ef285b470'),
        alt: 'Clouds hanging low over jagged peaks',
        caption: 'Fog rolled in right before descent.',
      },
      {
        src: fromUnsplash('photo-1521292270410-a8c4d716d518'),
        alt: 'Viewpoint over mountain valley at golden hour',
        caption: 'End of day light over the valley floor.',
      },
    ],
  },
]
