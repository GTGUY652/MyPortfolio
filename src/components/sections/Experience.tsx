import type { ExperienceHeading, ExperienceItem } from '../../data/types'
import { ExperienceRow } from '../ui/ExperienceRow'
import { SectionHeading } from '../ui/SectionHeading'
import './Experience.css'

interface ExperienceProps {
  heading: ExperienceHeading
  experience: ExperienceItem[]
}

export function Experience({ heading, experience }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="experience"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <SectionHeading
          index={heading.index}
          label={heading.label}
          title={heading.title}
          titleId="experience-title"
        >
          <p>{heading.intro}</p>
        </SectionHeading>

        <ol className="experience__list" role="list">
          {experience.map((entry) => (
            <ExperienceRow
              key={`${entry.company}-${entry.start}`}
              entry={entry}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
