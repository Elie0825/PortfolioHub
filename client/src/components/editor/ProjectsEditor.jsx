import { useState, useEffect } from 'react'
import { projectsApi } from '../../services/projectsApi'
import ProjectForm from './ProjectForm'
import '../../styles/components/ProjectsEditor.css'

const ProjectsEditor = () => {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await projectsApi.getAll()
      setProjects(data)
    } catch {
      setError('Failed to load projects')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (data) => {
    const project = await projectsApi.create(data)
    setProjects((prev) => [...prev, project])
    setShowForm(false)
  }

  const handleUpdate = async (id, data) => {
    const project = await projectsApi.update(id, data)
    setProjects((prev) => prev.map((p) => (p.id === id ? project : p)))
    setEditingId(null)
  }

  const handleDelete = async (id) => {
    await projectsApi.remove(id)
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  const handleMove = async (index, direction) => {
    const next = [...projects]
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= next.length) return
    ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
    setProjects(next)
    await projectsApi.reorder(next.map((p) => p.id))
  }

  if (isLoading) return <p className="editor-loading">Loading projects…</p>

  return (
    <section className="projects-editor">
      <div className="editor-section__header">
        <h2 className="editor-section__title">Projects</h2>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          Add project
        </button>
      </div>

      {error && <p className="editor-error">{error}</p>}

      {showForm && (
        <ProjectForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ul className="projects-editor__list">
        {projects.map((project, index) => (
          <li key={project.id} className="project-card">
            {editingId === project.id ? (
              <ProjectForm
                initial={project}
                onSubmit={(data) => handleUpdate(project.id, data)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <div className="project-card__info">
                  <span className="project-card__title">{project.title}</span>
                  {project.techTags.length > 0 && (
                    <span className="project-card__tags">
                      {project.techTags.join(', ')}
                    </span>
                  )}
                </div>
                <div className="project-card__actions">
                  <button
                    className="btn-icon"
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === projects.length - 1}
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                  <button className="btn-secondary" onClick={() => setEditingId(project.id)}>
                    Edit
                  </button>
                  <button className="btn-danger" onClick={() => handleDelete(project.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {projects.length === 0 && !showForm && (
        <p className="editor-empty">No projects yet. Add your first one.</p>
      )}
    </section>
  )
}

export default ProjectsEditor
