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
        <div className="hero__split">
          <div className="hero__content">
            <p className="hero__eyebrow">{hero.eyebrow}</p>

            <h1 id="hero-title" className="hero__title">
              {hero.headline.lineOne}
              <br />
              {hero.headline.lineTwo}{' '}
              <span className="hero__accent">{hero.headline.accent}</span>
            </h1>

            <p className="hero__summary">{hero.summary}</p>

            {hero.showActions ? (
              <div className="hero__actions">
                <Button href={`mailto:${hero.email}`}>
                  {hero.labels.getInTouch}
                </Button>
                <Button href={hero.cvUrl} variant="secondary" download>
                  <Download width="18" height="18" />
                  {hero.labels.downloadCv}
                </Button>
              </div>
            ) : null}
          </div>

          <figure className="hero__showcase">
            <div className="hero__media">
              <div className="hero__avatar">
                <img
                  src={hero.avatar}
                  alt={hero.avatarAlt}
                  width="104"
                  height="104"
                  fetchPriority="high"
                />
              </div>

              <div className="hero__photo">
                <img
                  src={hero.showcaseImage}
                  alt={hero.showcaseAlt}
                  width="1280"
                  height="853"
                  fetchPriority="high"
                />
              </div>
            </div>

            <figcaption className="hero__caption">
              {hero.showcaseCaption}
            </figcaption>
          </figure>
        </div>

        <div className="hero__tech">
          <TechStrip items={tech} label={hero.labels.experienceWith} />
        </div>
      </div>
    </section>
  )
}
