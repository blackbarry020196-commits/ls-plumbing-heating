import { Flame } from 'lucide-react'
import { PHONE, PHONE_HREF, scrollToSection } from '@/lib/utils'

const quickLinks = [
  { label: 'Services', id: 'services' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-flame" aria-hidden="true" />
              <span className="font-display text-lg font-bold">LS Plumbing &amp; Heating</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              LS Plumbing &amp; Heating Limited — Leeds&apos; Trusted Heating Specialists Since 2005
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-flame/30 bg-flame/10 px-3 py-1.5 text-xs font-medium text-flame">
              <Flame className="h-3.5 w-3.5" aria-hidden="true" />
              Gas Safe Registered
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-white/70 transition-colors hover:text-flame"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <a href={PHONE_HREF} className="transition-colors hover:text-flame">
                  {PHONE}
                </a>
              </li>
              <li>Mon–Sun, 7:00am – 9:00pm</li>
              <li>Leeds, LS14 — West Yorkshire</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-xs text-white/40">
            © 2025 LS Plumbing &amp; Heating Limited. All rights reserved.
          </p>
          <p className="mt-3 text-center text-xs text-white/30">
            Proudly serving Leeds, Seacroft, Roundhay, Wetherby, Harrogate, and surrounding West
            Yorkshire areas.
          </p>
        </div>
      </div>
    </footer>
  )
}
