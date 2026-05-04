import '../../styles/components/PublicSkills.css'

const PublicSkills = ({ skills }) => {
  if (!skills.length) return null

  const featured = skills.filter((s) => s.isFeatured)
  const rest = skills.filter((s) => !s.isFeatured)

  return (
    <section className="public-skills">
      <h2 className="public-section__title">Skills</h2>

      {featured.length > 0 && (
        <ul className="public-skills__featured">
          {featured.map((skill) => (
            <li key={skill.id} className="public-skills__featured-tag">
              {skill.name}
            </li>
          ))}
        </ul>
      )}

      {rest.length > 0 && (
        <ul className="public-skills__rest">
          {rest.map((skill) => (
            <li key={skill.id} className="public-skills__tag">
              {skill.name}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default PublicSkills
