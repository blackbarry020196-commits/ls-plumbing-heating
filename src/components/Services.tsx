import {
  Droplets,
  Flame,
  ShieldCheck,
  Thermometer,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

type Service = {
  icon: LucideIcon
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: Flame,
    title: 'Boiler Installation',
    description:
      'New boiler supply and fit from leading brands, installed to the highest standard.',
  },
  {
    icon: Wrench,
    title: 'Boiler Servicing & Repair',
    description:
      'Annual services and fault diagnosis to keep your boiler running safely and efficiently.',
  },
  {
    icon: Thermometer,
    title: 'Central Heating Systems',
    description:
      'Full central heating installations for new builds, renovations, and upgrades.',
  },
  {
    icon: Droplets,
    title: 'Radiator Power Flushing',
    description:
      'Remove sludge and improve heating efficiency with a professional power flush.',
  },
  {
    icon: ShieldCheck,
    title: 'Gas Appliance Installation',
    description:
      'Safe and certified installation of all gas appliances by our Gas Safe engineers.',
  },
  {
    icon: Wrench,
    title: 'General Plumbing',
    description:
      'From leaks and blockages to full bathroom fits — all plumbing work covered.',
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
            Everything Plumbing &amp; Heating — Under One Roof
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article
                key={service.title}
                className="group rounded-lg border border-charcoal/15 bg-white p-6 shadow-sm transition-all hover:border-flame hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-md bg-flame/10 p-3 text-flame transition-colors group-hover:bg-flame group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-charcoal">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{service.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
