import type {
  ContactDetails,
  ContactHeading,
  SocialLink,
} from '../../data/types'
import { ArrowUpRight } from '../icons'
import { SectionHeading } from '../ui/SectionHeading'
import './Contact.css'

interface ContactProps {
  heading: ContactHeading
  contact: ContactDetails
  socials: SocialLink[]
}

function formatSocialHref(href: string) {
  return href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function Contact({ heading, contact, socials }: ContactProps) {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__inner">
          <SectionHeading
            index={heading.index}
            label={heading.label}
            title={heading.title}
            titleId="contact-title"
          />

          <p className="contact__intro">{heading.intro}</p>

          <a className="contact__email" href={`mailto:${contact.workEmail}`}>
            <span className="contact__email-label">Work email</span>
            <span className="contact__email-row">
              <span className="contact__email-address">
                {contact.workEmail}
              </span>
              <ArrowUpRight
                className="contact__arrow"
                width="24"
                height="24"
              />
            </span>
          </a>

          <ul className="contact__channels" role="list">
            <li>
              <a
                className="contact__channel"
                href={`mailto:${contact.personalEmail}`}
              >
                <span className="contact__channel-text">
                  <span className="contact__channel-label">
                    Personal email
                  </span>
                  <span className="contact__channel-value">
                    {contact.personalEmail}
                  </span>
                </span>
                <ArrowUpRight
                  className="contact__arrow"
                  width="20"
                  height="20"
                />
              </a>
            </li>

            <li>
              <a className="contact__channel" href={phoneHref(contact.phone)}>
                <span className="contact__channel-text">
                  <span className="contact__channel-label">Phone</span>
                  <span className="contact__channel-value">
                    {contact.phone}
                  </span>
                </span>
                <ArrowUpRight
                  className="contact__arrow"
                  width="20"
                  height="20"
                />
              </a>
            </li>

            {socials.map((social) => {
              const displayHref = formatSocialHref(social.href)

              return (
                <li key={social.href}>
                  <a
                    className="contact__channel"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="contact__channel-text">
                      <span className="contact__channel-label">
                        {social.label}
                      </span>
                      <span className="contact__channel-value">
                        {displayHref}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="contact__arrow"
                      width="20"
                      height="20"
                    />
                    <span className="visually-hidden">
                      {' '}
                      (opens in a new tab)
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
