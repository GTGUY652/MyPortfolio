import { useState } from 'react'
import type { TechItem } from '../../data/types'
import './TechStrip.css'

interface TechStripProps {
  items: TechItem[]
  label: string
}

export function TechStrip({ items, label }: TechStripProps) {
  const [activeTech, setActiveTech] = useState<string | null>(null)

  return (
    <div className="tech-strip">
      <p
        className={`tech-strip__label${activeTech ? ' tech-strip__label--active' : ''}`}
      >
        {activeTech ?? label}
      </p>
      <ul
        className="tech-strip__list"
        aria-label="Technologies I work with"
        onMouseLeave={() => setActiveTech(null)}
      >
        {items.map((item) => (
          <li
            key={item.name}
            className="tech-strip__item"
            onMouseEnter={() => setActiveTech(item.name)}
          >
            <img src={item.src} alt={item.name} width="28" height="28" />
          </li>
        ))}
      </ul>
    </div>
  )
}
