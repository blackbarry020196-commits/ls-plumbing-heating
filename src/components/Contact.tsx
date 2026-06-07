import { useState, type FormEvent } from 'react'
import { Clock, Flame, MapPin, Phone } from 'lucide-react'
import { PHONE, PHONE_HREF } from '@/lib/utils'

const serviceOptions = [
  'Boiler Installation',
  'Boiler Service & Repair',
  'Central Heating',
  'Power Flushing',
  'Gas Appliance',
  'General Plumbing',
  'Other',
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
            Get Your Free, No-Obligation Quote
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {submitted ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-flame/20 bg-warm-grey p-12 text-center lg:col-span-2">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-flame/10 text-2xl text-flame">
                ✓
              </div>
              <p className="font-display text-2xl font-bold text-charcoal">
                Thank you — we&apos;ll be in touch shortly with your free quote.
              </p>
              <p className="mt-3 text-sm text-charcoal/60">
                Need us sooner? Call{' '}
                <a href={PHONE_HREF} className="font-medium text-flame hover:underline">
                  {PHONE}
                </a>
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-md border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-flame"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full rounded-md border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-flame"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-md border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-flame"
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60"
                  >
                    Type of Work
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    defaultValue=""
                    className="w-full rounded-md border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-flame"
                  >
                    <option value="" disabled>
                      Select type of work
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about the work you need..."
                    className="w-full resize-none rounded-md border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-flame"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-flame px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-flame-dark sm:w-auto"
                >
                  Request My Free Quote
                </button>
              </form>

              <div className="space-y-6">
                <div className="rounded-lg bg-charcoal p-8 text-white">
                  <ul className="space-y-5">
                    <li className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-flame" strokeWidth={1.75} />
                      <a href={PHONE_HREF} className="text-lg font-semibold hover:text-flame">
                        {PHONE}
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-flame" strokeWidth={1.75} />
                      <p className="text-sm leading-relaxed text-white/75">
                        Based in Leeds, LS14 — Covering Leeds &amp; Surrounding Areas
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-flame" strokeWidth={1.75} />
                      <p className="text-sm leading-relaxed text-white/75">
                        Mon–Sun, 7:00am – 9:00pm
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <Flame className="mt-0.5 h-5 w-5 shrink-0 text-flame" strokeWidth={1.75} />
                      <p className="text-sm leading-relaxed text-white/75">Gas Safe Registered</p>
                    </li>
                  </ul>
                </div>

                <div className="overflow-hidden rounded-lg border border-charcoal/10">
                  <iframe
                    title="LS Plumbing & Heating location — Leeds LS14"
                    src="https://maps.google.com/maps?q=Leeds+LS14&output=embed&z=13"
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
