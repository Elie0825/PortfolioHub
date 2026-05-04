import ContactForm from './ContactForm'
import '../../styles/components/PublicContact.css'

const PLATFORM_LABELS = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  twitter: 'Twitter',
  website: 'Website',
  email: 'Email',
}

const PublicContact = ({ username, contactLinks }) => {
  const emailLink = contactLinks.find((l) => l.platform === 'email')
  const socialLinks = contactLinks.filter((l) => l.platform !== 'email')

  return (
    <section className="public-contact">
      <h2 className="public-section__title">Contact</h2>

      {emailLink && (
        <div className="public-contact__email">
          <a href={`mailto:${emailLink.url}`} className="public-contact__mailto-btn">
            Send me an email
          </a>
          <span className="public-contact__email-addr">{emailLink.url}</span>
        </div>
      )}

      {socialLinks.length > 0 && (
        <ul className="public-contact__social">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="public-contact__social-link"
              >
                {PLATFORM_LABELS[link.platform] ?? link.platform}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="public-contact__form-wrap">
        <h3 className="public-contact__form-title">Send a message</h3>
        <ContactForm username={username} />
      </div>
    </section>
  )
}

export default PublicContact
