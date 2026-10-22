import { useId } from 'react'
import type { ProjectItem } from '../../data/types'
import { ArrowUpRight } from '../icons'
import './ProjectCard.css'

interface ProjectCardProps {
  project: ProjectItem
}

export function ProjectCard({ project }: ProjectCardProps) {
  const id = useId()
  const titleId = `${id}-title`
  const externalId = `${id}-external`

  return (
    <a
      className="project-card"
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-labelledby={`${titleId} ${externalId}`}
    >
      <div className="project-card__media">
        <img
          src={project.image}
          alt={project.imageAlt}
          width="1600"
          height="1000"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="project-card__category">{project.category}</span>
          <span className="project-card__year">{project.year}</span>
        </div>

        <div className="project-card__title-row">
          <h3 id={titleId} className="project-card__title">
            {project.title}
          </h3>
          <ArrowUpRight
            className="project-card__arrow"
            width="20"
            height="20"
          />
        </div>

        <p className="project-card__summary">{project.description}</p>

        <ul
          className="project-card__tags"
          aria-label={`Technologies used in ${project.title}`}
        >
          {project.tags.map((tag) => (
            <li key={tag} className="project-card__tag">
              {tag}
            </li>
          ))}
        </ul>

        <span id={externalId} className="visually-hidden">
          project — opens in a new tab
        </span>
      </div>
    </a>
  )
}
