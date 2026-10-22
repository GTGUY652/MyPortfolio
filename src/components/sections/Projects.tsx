import type { ProjectItem, ProjectsHeading } from '../../data/types'
import { ProjectCard } from '../ui/ProjectCard'
import { SectionHeading } from '../ui/SectionHeading'
import './Projects.css'

interface ProjectsProps {
  heading: ProjectsHeading
  projects: ProjectItem[]
}

export function Projects({ heading, projects }: ProjectsProps) {
  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          index={heading.index}
          label={heading.label}
          title={heading.title}
          titleId="projects-title"
        >
          <p>{heading.intro}</p>
        </SectionHeading>

        <ul className="projects__grid">
          {projects.map((project) => (
            <li key={project.title}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
