import type { HeroContent, TechItem } from '../../data/types'
import { Download } from '../icons'
import { Button } from '../ui/Button'
import { TechStrip } from '../ui/TechStrip'
import './Hero.css'

interface HeroProps {
  hero: HeroContent
  tech: TechItem[]
}

export function Hero({ hero, tech }: HeroProps) {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__avatar">
          <img
            src={hero.avatar}
            alt={hero.avatarAlt}
            width="176"
            height="176"
          />
        </div>

        <h1 id="hero-title" className="hero__title">
          {hero.headline.lineOne}
          <br />
          {hero.headline.lineTwo}{' '}
          <span className="hero__accent">{hero.headline.accent}</span>
        </h1>

        <p className="hero__summary">{hero.summary}</p>

        <div className="hero__actions">
          <Button href={`mailto:${hero.email}`}>{hero.labels.getInTouch}</Button>
          <Button href={hero.cvUrl} variant="secondary" download>
            <Download width="18" height="18" />
            {hero.labels.downloadCv}
          </Button>
        </div>

        <div className="hero__tech">
          <TechStrip items={tech} label={hero.labels.experienceWith} />
        </div>
      </div>
    </section>
  )
}
