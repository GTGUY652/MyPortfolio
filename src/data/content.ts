import avatarUrl from '../assets/images/avatar-placeholder.svg'
import dockerUrl from '../assets/logos/tech/docker.svg'
import javascriptUrl from '../assets/logos/tech/javascript.svg'
import nodedotjsUrl from '../assets/logos/tech/nodedotjs.svg'
import postgresqlUrl from '../assets/logos/tech/postgresql.svg'
import reactUrl from '../assets/logos/tech/react.svg'
import typescriptUrl from '../assets/logos/tech/typescript.svg'
import type { HeroContent, NavItem, SiteContent, TechItem } from './types'

// PLACEHOLDER CONTENT — replace every value in this file with real details.
// Brick 1 exports the content object with navigation, hero, and tech data.
// Later bricks fill in projects, experience, and socials.

const nav: NavItem[] = [
  { label: 'Home', href: '#home' },
  // Projects, Experience, and Contact links are added when those sections land.
]

const hero: HeroContent = {
  name: 'Your Name',
  monogram: 'YN',
  headline: {
    lineOne: 'I build fast,',
    lineTwo: 'accessible products',
    accent: 'for the web.',
  },
  summary:
    'I am a full-stack developer who turns ideas into reliable, responsive web products. I work with teams and clients from the first sketch to deployment, with a focus on performance, accessibility, and clean interfaces.',
  email: 'hello@example.com',
  cvUrl: '/cv-placeholder.pdf',
  avatar: avatarUrl,
  avatarAlt: 'Portrait of Your Name',
  labels: {
    getInTouch: 'Get in Touch',
    downloadCv: 'Download CV',
    experienceWith: 'Experience with',
  },
}

const tech: TechItem[] = [
  { name: 'JavaScript', src: javascriptUrl },
  { name: 'TypeScript', src: typescriptUrl },
  { name: 'React', src: reactUrl },
  { name: 'Node.js', src: nodedotjsUrl },
  { name: 'PostgreSQL', src: postgresqlUrl },
  { name: 'Docker', src: dockerUrl },
]

export const content: SiteContent = {
  ...hero,
  nav,
  tech,
  projects: [],
  experience: [],
  socials: [],
}
