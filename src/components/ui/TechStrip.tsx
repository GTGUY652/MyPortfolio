import type { TechItem } from '../../data/types'
import './TechStrip.css'

interface TechStripProps {
  items: TechItem[]
}

export function TechStrip({ items }: TechStripProps) {
  return (
    <div className="tech-strip">
      <p className="tech-strip__label">Experience with</p>
      <ul className="tech-strip__list" aria-label="Technologies I work with">
        {items.map((item) => (
          <li key={item.name} className="tech-strip__item">
            <img src={item.src} alt={item.name} width="28" height="28" />
          </li>
        ))}
      </ul>
    </div>
  )
}
