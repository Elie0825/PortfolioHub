import { publicApi } from '../../services/publicApi'
import '../../styles/components/PublicProjects.css'

const PublicProjects = ({ projects }) => {
  if (!projects.length) return null

  const handleLinkClick = (projectId, linkType) => {
    publicApi.recordProjectClick(projectId, linkType)
  }

  return (
    <section className="public-projects">
      <h2 className="public-section__title">Projects</h2>
      <ul className="public-projects__grid">
        {projects.map((project) => (
          <li key={project.id} className="public-project-card">
            <div className="public-project-card__body">
              <h3 className="public-project-card__title">{project.title}</h3>
              {project.description && (
                <p className="public-project-card__desc">{project.description}</p>
              )}
              {project.techTags.length > 0 && (
                <ul className="public-project-card__tags">
                  {project.techTags.map((tag) => (
                    <li key={tag} className="public-project-card__tag">{tag}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="public-project-card__links">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="public-project-card__link public-project-card__link--live"
                  onClick={() => handleLinkClick(project.id, 'live')}
                >
                  Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="public-project-card__link public-project-card__link--github"
                  onClick={() => handleLinkClick(project.id, 'github')}
                >
                  GitHub
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PublicProjects
