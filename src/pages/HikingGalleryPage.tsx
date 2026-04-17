import { Link } from 'react-router-dom'
import { hikingGallerySections } from '../data/hikingGallery'

export function HikingGalleryPage() {
  return (
    <div className="min-h-screen bg-[#fbfbf8] text-[#1f2f32]">
      <header className="sticky top-0 z-20 border-b border-[#dce6e3] bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#61817b]">Hiking Journal</p>
            <h1 className="font-display text-xl text-[#1d3635] sm:text-2xl">Mountain Photo Log</h1>
          </div>
          <Link
            to="/"
            className="rounded-full border border-[#c9d7d2] px-5 py-2 text-sm font-semibold text-[#2c4f4f] transition hover:border-[#9cb7b1] hover:bg-[#f3f8f6]"
          >
            Back to Portfolio
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 sm:px-10 sm:pt-14">
        <section className="rounded-3xl border border-[#d7e2df] bg-white p-8 shadow-[0_28px_80px_-50px_rgba(29,54,53,0.35)] sm:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#698882]">Trips by location</p>
          <h2 className="mt-2 font-display text-3xl text-[#183332] sm:text-5xl">Every hike, organized by place.</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-[#42605f]">
            This page is data-driven: add a new location section or add images by editing one file,
            then your gallery updates automatically.
          </p>
        </section>

        {hikingGallerySections.map((section) => (
          <section key={section.id} className="mt-14 border-t border-[#dce6e3] pt-10">
            <div className="mb-6 grid gap-3 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#789792]">{section.subtitle}</p>
                <h3 className="mt-2 font-display text-3xl text-[#1b3434] sm:text-4xl">{section.location}</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#4b6766] sm:text-base">{section.notes}</p>
            </div>

            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {section.photos.map((photo) => (
                <figure
                  key={`${section.id}-${photo.src}`}
                  className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-[#d9e4e1] bg-white shadow-[0_20px_45px_-35px_rgba(15,41,40,0.8)]"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full object-cover"
                  />
                  <figcaption className="border-t border-[#ecf1ef] px-4 py-3 text-sm text-[#456160]">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}

export default HikingGalleryPage
