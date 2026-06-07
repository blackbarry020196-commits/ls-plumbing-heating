import { useEffect, useState } from 'react'
import { Flame, Menu, X } from 'lucide-react'
import { cn, HOURS, PHONE, PHONE_HREF, scrollToSection } from '@/lib/utils'

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'About', id: 'about' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'Contact', id: 'contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (id: string) => {
    setMobileOpen(false)
    scrollToSection(id)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-charcoal/5 bg-white shadow-md'
          : 'bg-charcoal/90 backdrop-blur-sm lg:bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8 lg:py-4">
        <button
          onClick={() => handleNav('home')}
          className="group flex items-center gap-2 text-left"
          aria-label="LS Plumbing & Heating — Home"
        >
          <Flame
            className={cn(
              'h-5 w-5 shrink-0 transition-colors',
              scrolled ? 'text-flame' : 'text-flame'
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              'font-display text-base font-bold tracking-tight sm:text-lg',
              scrolled ? 'text-charcoal' : 'text-white'
            )}
          >
            LS Plumbing &amp; Heating
          </span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={cn(
                'text-sm font-medium transition-colors',
                scrolled
                  ? 'text-charcoal/70 hover:text-flame'
                  : 'text-white/80 hover:text-white'
              )}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden flex-col items-end gap-0.5 lg:flex">
          <a
            href={PHONE_HREF}
            className="rounded-md bg-flame px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-flame-dark"
          >
            Call: {PHONE}
          </a>
          <span
            className={cn(
              'text-[11px]',
              scrolled ? 'text-charcoal/50' : 'text-white/60'
            )}
          >
            {HOURS}
          </span>
        </div>

        <button
          className={cn(
            'rounded-md p-2 lg:hidden',
            scrolled ? 'text-charcoal' : 'text-white'
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-charcoal/10 bg-white px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="text-left text-base font-medium text-charcoal/80 hover:text-flame"
              >
                {link.label}
              </button>
            ))}
            <a
              href={PHONE_HREF}
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-flame px-5 py-3 text-sm font-semibold text-white"
            >
              Call: {PHONE}
            </a>
            <p className="text-center text-xs text-charcoal/50">{HOURS}</p>
          </nav>
        </div>
      )}
    </header>
  )
}
