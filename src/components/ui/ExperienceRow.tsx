import type { ExperienceItem } from '../../data/types'
import './ExperienceRow.css'

interface ExperienceRowProps {
  entry: ExperienceItem
}

export function ExperienceRow({ entry }: ExperienceRowProps) {
  return (
    <li className="experience-row">
      <div className="experience-row__mark" aria-hidden="true">
        <img
          src={entry.logo}
          alt=""
          width="24"
          height="24"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="experience-row__identity">
        <h3 className="experience-row__role">{entry.role}</h3>
        <p className="experience-row__company">{entry.company}</p>
      </div>

      <p className="experience-row__dates">
        <span className="visually-hidden">Dates: </span>
        {entry.start} – {entry.end}
      </p>

      <p className="experience-row__description">{entry.description}</p>
    </li>
  )
}
