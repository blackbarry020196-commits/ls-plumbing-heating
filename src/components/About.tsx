import { images } from '@/lib/images'

const stats = [
  { value: '20+', label: 'Years Experience' },
  { value: 'Gas Safe', label: 'Registered' },
  { value: '7 Days', label: 'A Week' },
]

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
              20 Years of Trusted Plumbing in Leeds
            </h2>
            <p className="mt-6 text-base leading-relaxed text-charcoal/70">
              LS Plumbing &amp; Heating has been serving Leeds and the surrounding areas since 2005.
              We&apos;re fully Gas Safe Registered and pride ourselves on delivering high-quality
              workmanship at genuinely competitive prices. We keep disruption to a minimum, work
              tidily, and make sure every job is done right first time. Our customers range from
              homeowners and landlords to new build developers — and many have been with us for years.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-charcoal/10 bg-warm-grey px-3 py-5 text-center"
                >
                  <p className="font-display text-lg font-bold text-flame sm:text-xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-charcoal/60 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-xl border border-charcoal/10 shadow-lg">
              <img
                src={images.about}
                alt="LS Plumbing engineer carrying out professional plumbing work in Leeds"
                className="aspect-[16/10] w-full object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-5 -left-3 rounded-lg bg-charcoal px-5 py-4 shadow-lg sm:-left-5">
              <p className="font-display text-sm font-bold uppercase tracking-wider text-flame">Est.</p>
              <p className="font-display text-4xl font-bold text-white">2005</p>
              <p className="mt-1 text-xs text-white/60">Leeds, West Yorkshire</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
