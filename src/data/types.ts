export interface NavItem {
  label: string
  href: `#${string}`
}

export type SocialIcon = 'github' | 'linkedin' | 'x' | 'instagram'

export interface SocialLink {
  label: string
  href: string
  icon: SocialIcon
}

export interface TechItem {
  name: string
  src: string
}

export interface ProjectItem {
  title: string
  description: string
  tags: string[]
  image: string
  imageAlt: string
  href: string
}

export interface ExperienceItem {
  role: string
  company: string
  start: string
  end: string
  description: string
  logo: string
  logoAlt: string
}

export interface HeroContent {
  name: string
  monogram: string
  role: string
  headline: {
    lineOne: string
    lineTwo: string
    accent: string
  }
  summary: string
  email: string
  cvUrl: string
  avatar: string
  avatarAlt: string
}

export interface SiteContent extends HeroContent {
  nav: NavItem[]
  tech: TechItem[]
  projects: ProjectItem[]
  experience: ExperienceItem[]
  socials: SocialLink[]
}
