import { PHONE, PHONE_HREF, scrollToSection } from '@/lib/utils'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80'

const badges = [
  { icon: '🔥', label: 'Gas Safe Registered' },
  { icon: '📅', label: 'Est. Since 2005' },
  { icon: '🏠', label: 'Residential & Commercial' },
  { icon: '🕖', label: '7 Days a Week · 7am–9pm' },
]

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-charcoal pt-[4.5rem]">
      <div className="absolute inset-0 pipe-pattern blueprint-pattern hero-glow" aria-hidden="true" />
      <img
        src={HERO_IMAGE}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/95 to-charcoal/80" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[3.25rem]">
            Leeds&apos; Heating &amp; Plumbing Specialists — Est. 2005
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 lg:text-lg">
            Gas Safe Registered. Trusted by homeowners, landlords, and businesses across Leeds for over 20 years.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => scrollToSection('contact')}
              className="rounded-md bg-flame px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-flame-dark"
            >
              Get a Free Quote
            </button>
            <a
              href={PHONE_HREF}
              className="rounded-md border border-white/30 px-8 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:border-flame hover:text-flame"
            >
              Call {PHONE}
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2.5 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85"
              >
                <span aria-hidden="true">{badge.icon}</span>
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
