import type { ReactNode } from 'react'
import './SectionHeading.css'

interface SectionHeadingProps {
  index: string
  label: string
  title: string
  titleId: string
  children?: ReactNode
}

export function SectionHeading({
  index,
  label,
  title,
  titleId,
  children,
}: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <div className="section-heading__main">
        <p className="section-heading__eyebrow">
          {index} / {label}
        </p>
        <h2 id={titleId} className="section-heading__title">
          {title}
        </h2>
      </div>

      {children ? <div className="section-heading__aside">{children}</div> : null}
    </header>
  )
}
