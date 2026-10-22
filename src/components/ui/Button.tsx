import type { ReactNode } from 'react'
import './Button.css'

interface ButtonProps {
  href: string
  variant?: 'primary' | 'secondary'
  download?: boolean
  children: ReactNode
}

export function Button({
  href,
  variant = 'primary',
  download = false,
  children,
}: ButtonProps) {
  return (
    <a
      className={`button button--${variant}`}
      href={href}
      download={download ? '' : undefined}
    >
      {children}
    </a>
  )
}
