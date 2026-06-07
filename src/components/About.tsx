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

          <div className="flex items-center justify-center">
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-4 border-charcoal/10 bg-charcoal sm:h-80 sm:w-80">
              <div className="absolute inset-4 rounded-full border border-flame/30" aria-hidden="true" />
              <div className="text-center">
                <p className="font-display text-5xl font-bold text-flame sm:text-6xl">Est.</p>
                <p className="font-display text-6xl font-bold text-white sm:text-7xl">2005</p>
                <p className="mt-2 text-sm text-white/60">Leeds, West Yorkshire</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
