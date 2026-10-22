import avatarUrl from '../assets/images/PortfolioProfile-avatar.jpg'
import amazonawsUrl from '../assets/logos/tech/amazonaws.svg'
import cUrl from '../assets/logos/tech/c.svg'
import cssUrl from '../assets/logos/tech/css.svg'
import dockerUrl from '../assets/logos/tech/docker.svg'
import firebaseUrl from '../assets/logos/tech/firebase.svg'
import hostingerUrl from '../assets/logos/tech/hostinger.svg'
import html5Url from '../assets/logos/tech/html5.svg'
import javaUrl from '../assets/logos/tech/java.svg'
import javascriptUrl from '../assets/logos/tech/javascript.svg'
import kotlinUrl from '../assets/logos/tech/kotlin.svg'
import mongodbUrl from '../assets/logos/tech/mongodb.svg'
import phpUrl from '../assets/logos/tech/php.svg'
import postgresqlUrl from '../assets/logos/tech/postgresql.svg'
import pythonUrl from '../assets/logos/tech/python.svg'
import reactUrl from '../assets/logos/tech/react.svg'
import reactnativeUrl from '../assets/logos/tech/reactnative.svg'
import redisUrl from '../assets/logos/tech/redis.svg'
import sqliteUrl from '../assets/logos/tech/sqlite.svg'
import supabaseUrl from '../assets/logos/tech/supabase.svg'
import tailwindcssUrl from '../assets/logos/tech/tailwindcss.svg'
import typescriptUrl from '../assets/logos/tech/typescript.svg'
import xamppUrl from '../assets/logos/tech/xampp.svg'
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
  monogram: 'RT',
  headline: {
    lineOne: 'I work with Diligence,',
    lineTwo: 'Willingness,',
    accent: 'and Commitment',
  },
  summary:
    'I am a Software Developer aspiring to fix any IT solutions that comes to me. When I work, I do it with diligence, willingness, and commitment because having these traits makes me work hard, especially when there are new things that need to be learned. In a new environment, I tend to get close to the new stuff so that I can learn, adapt, and apply. What I show is not just my work but my willingness to solve, adapt, and learn at each step of the way.',
  email: 'hello@example.com',
  cvUrl: '/cv-placeholder.pdf',
  avatar: avatarUrl,
  avatarAlt: 'Portrait of the portfolio owner',
  labels: {
    getInTouch: 'Get in Touch',
    downloadCv: 'Download CV',
    experienceWith: 'Experience with',
  },
}

const tech: TechItem[] = [
  { name: 'JavaScript', src: javascriptUrl },
  { name: 'HTML', src: html5Url },
  { name: 'CSS', src: cssUrl },
  { name: 'React', src: reactUrl },
  { name: 'React Native', src: reactnativeUrl },
  { name: 'TypeScript', src: typescriptUrl },
  { name: 'Tailwind CSS', src: tailwindcssUrl },
  { name: 'Java', src: javaUrl },
  { name: 'Kotlin', src: kotlinUrl },
  { name: 'Python', src: pythonUrl },
  { name: 'PHP', src: phpUrl },
  { name: 'C', src: cUrl },
  { name: 'Docker', src: dockerUrl },
  { name: 'PostgreSQL', src: postgresqlUrl },
  { name: 'AWS', src: amazonawsUrl },
  { name: 'Redis', src: redisUrl },
  { name: 'Hostinger', src: hostingerUrl },
  { name: 'XAMPP', src: xamppUrl },
  { name: 'Supabase', src: supabaseUrl },
  { name: 'Firebase', src: firebaseUrl },
  { name: 'SQLite', src: sqliteUrl },
  { name: 'MongoDB', src: mongodbUrl },
]

export const content: SiteContent = {
  ...hero,
  nav,
  tech,
  projects: [],
  experience: [],
  socials: [],
}
