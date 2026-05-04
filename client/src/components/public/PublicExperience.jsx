import '../../styles/components/PublicExperience.css'

const PublicExperience = ({ experiences }) => {
  if (!experiences.length) return null

  return (
    <section className="public-experience">
      <h2 className="public-section__title">Experience</h2>
      <ol className="public-experience__timeline">
        {experiences.map((exp) => (
          <li key={exp.id} className="public-experience__item">
            <div className="public-experience__marker" />
            <div className="public-experience__content">
              <div className="public-experience__header">
                <span className="public-experience__role">{exp.role}</span>
                <span className="public-experience__company">{exp.company}</span>
              </div>
              <span className="public-experience__dates">
                {exp.startDate} – {exp.endDate}
              </span>
              {exp.description && (
                <p className="public-experience__desc">{exp.description}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default PublicExperience
