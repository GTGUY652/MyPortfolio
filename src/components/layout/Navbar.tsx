import { useEffect, useMemo, useRef, useState } from 'react'
import type { NavItem } from '../../data/types'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { Close, Menu } from '../icons'
import { Container } from './Container'
import './Navbar.css'

interface NavbarProps {
  name: string
  monogram: string
  nav: NavItem[]
}

export function Navbar({ name, monogram, nav }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const scrolled = useScrolled()
  const sectionIds = useMemo(
    () => nav.map((item) => item.href.slice(1)),
    [nav],
  )
  const activeId = useActiveSection(sectionIds)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px)')
    const onChange = () => {
      if (media.matches) setOpen(false)
    }

    media.addEventListener('change', onChange)

    return () => media.removeEventListener('change', onChange)
  }, [])

  const renderLink = (item: NavItem, mobile = false) => {
    const isActive = activeId === item.href.slice(1)

    return (
      <a
        className={`navbar__link${isActive ? ' is-active' : ''}${
          mobile ? ' navbar__link--mobile' : ''
        }`}
        href={item.href}
        aria-current={isActive ? 'true' : undefined}
        onClick={mobile ? () => setOpen(false) : undefined}
      >
        {item.label}
      </a>
    )
  }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <Container>
        <div className="navbar__inner">
          <a
            className="navbar__logo"
            href="#home"
            aria-label={`${name} — back to top`}
          >
            <span>{monogram}</span>
            <span className="navbar__logo-dot" aria-hidden="true">
              .
            </span>
          </a>

          <nav className="navbar__desktop" aria-label="Primary">
            <ul className="navbar__links">
              {nav.map((item) => (
                <li key={item.href}>{renderLink(item)}</li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="navbar__toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>

        <nav
          id="mobile-nav"
          className="navbar__mobile"
          aria-label="Mobile"
          hidden={!open}
        >
          <ul className="navbar__mobile-links">
            {nav.map((item) => (
              <li key={item.href}>{renderLink(item, true)}</li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
