import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { galleryItems } from '@/lib/images'

export function WorkGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length)),
    [],
  )
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % galleryItems.length)),
    [],
  )

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, close, showNext, showPrev])

  const active = activeIndex !== null ? galleryItems[activeIndex] : null

  return (
    <section id="gallery" className="bg-charcoal py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Our Work in Leeds
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Boilers, bathrooms, and plumbing — completed to a professional standard across Leeds.
            Tap any photo to view full size.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <figure key={item.src} className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="relative block w-full overflow-hidden aspect-[4/3] text-left"
                aria-label={`View full size: ${item.caption}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors group-hover:bg-charcoal/40">
                  <span className="flex items-center gap-2 rounded-md bg-flame/90 px-3 py-2 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <ZoomIn className="h-4 w-4" aria-hidden="true" />
                    View full size
                  </span>
                </span>
              </button>
              <figcaption className="border-t border-white/10 px-4 py-3">
                <p className="text-sm font-semibold text-flame">{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {active && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close gallery"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              showPrev()
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:left-6"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              showNext()
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-6"
            aria-label="Next photo"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[75vh] w-full rounded-lg object-contain"
            />
            <p className="mt-4 text-center text-sm font-semibold text-flame">{active.caption}</p>
            <p className="mt-1 text-center text-xs text-white/50">
              {activeIndex + 1} of {galleryItems.length}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
