import { ExternalLink } from 'lucide-react'
import { galleryItems, GOOGLE_MAPS_URL } from '@/lib/images'

export function WorkGallery() {
  return (
    <section id="gallery" className="bg-charcoal py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Our Work in Leeds
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Real jobs from our Google Business profile — boilers, bathrooms, and plumbing completed
            to a professional standard across Leeds.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <figure
              key={item.src}
              className={`group overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg ${
                index === 0 ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className={`overflow-hidden ${index === 0 ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <figcaption className="border-t border-white/10 px-4 py-3">
                <p className="text-sm font-semibold text-flame">{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-flame hover:text-flame"
          >
            View all photos on Google Maps
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
