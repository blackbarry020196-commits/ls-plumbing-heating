const audiences = [
  { icon: '🏡', label: 'Homeowners' },
  { icon: '🏢', label: 'Landlords' },
  { icon: '🏗️', label: 'New Build Developers' },
]

export function WhoWeWorkWith() {
  return (
    <section className="bg-warm-grey py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="text-center font-display text-3xl font-bold text-charcoal sm:text-4xl">
          We Work With
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {audiences.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center rounded-lg border border-charcoal/10 bg-white px-6 py-10 text-center shadow-sm"
            >
              <span className="text-4xl" aria-hidden="true">
                {item.icon}
              </span>
              <p className="mt-4 font-display text-lg font-bold text-charcoal">{item.label}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-charcoal/70">
          Whether it&apos;s a single repair or a full heating system for a new development, we&apos;ve
          got the experience to deliver.
        </p>
      </div>
    </section>
  )
}
