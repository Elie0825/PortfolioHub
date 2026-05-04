import '../../styles/components/PublicHero.css'

const PLATFORM_LABELS = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  twitter: 'Twitter',
  website: 'Website',
  email: 'Email',
}

const PublicHero = ({ username, profileSection, contactLinks }) => {
  const { headline, bio, location, availability } = profileSection

  return (
    <section className="public-hero">
      <div className="public-hero__inner">
        <div className="public-hero__top">
          <h1 className="public-hero__name">@{username}</h1>
          {availability && (
            <span className="public-hero__availability">{availability}</span>
          )}
        </div>

        {headline && <p className="public-hero__headline">{headline}</p>}
        {location && <p className="public-hero__location">{location}</p>}
        {bio && <p className="public-hero__bio">{bio}</p>}

        {contactLinks.length > 0 && (
          <ul className="public-hero__links">
            {contactLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.platform === 'email' ? `mailto:${link.url}` : link.url}
                  target={link.platform !== 'email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="public-hero__link"
                >
                  {PLATFORM_LABELS[link.platform] ?? link.platform}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default PublicHero
