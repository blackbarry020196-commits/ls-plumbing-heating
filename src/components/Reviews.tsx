import { Star } from 'lucide-react'

const reviews = [
  {
    quote:
      'Scott quoted a fair price and got our new gas central heating installed quickly. Always communicated well and the job was done to a great standard. Wouldn\'t hesitate to recommend.',
    author: 'Mark R.',
    location: 'Leeds',
  },
  {
    quote:
      'Got in touch within minutes, cheapest quote, and arrived on time. The job was done quickly and professionally. Very happy to recommend.',
    author: 'David S.',
    location: 'Leeds',
  },
  {
    quote:
      'Very happy with LS Plumbing. Good price and job done quickly and efficiently. Would recommend to anyone.',
    author: 'J.S.',
    location: 'Leeds',
  },
]

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
      ))}
    </div>
  )
}

export function Reviews() {
  return (
    <section id="reviews" className="bg-warm-grey py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="text-center font-display text-3xl font-bold text-charcoal sm:text-4xl">
          What Our Customers Say
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.author}
              className="flex flex-col rounded-lg border border-charcoal/10 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <StarRating />
                <span className="text-xs font-medium text-charcoal/40">Google Review</span>
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-charcoal/75">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <footer className="mt-5 border-t border-charcoal/5 pt-4 text-sm font-medium text-charcoal">
                — {review.author}, {review.location}
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
