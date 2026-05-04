import { useState, useEffect } from 'react'
import { experiencesApi } from '../../services/experiencesApi'
import ExperienceForm from './ExperienceForm'
import '../../styles/components/ExperienceEditor.css'

const ExperienceEditor = () => {
  const [experiences, setExperiences] = useState([])
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
      const data = await experiencesApi.getAll()
      setExperiences(data)
    } catch {
      setError('Failed to load experience')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (data) => {
    const item = await experiencesApi.create(data)
    setExperiences((prev) => [...prev, item])
    setShowForm(false)
  }

  const handleUpdate = async (id, data) => {
    const item = await experiencesApi.update(id, data)
    setExperiences((prev) => prev.map((e) => (e.id === id ? item : e)))
    setEditingId(null)
  }

  const handleDelete = async (id) => {
    await experiencesApi.remove(id)
    setExperiences((prev) => prev.filter((e) => e.id !== id))
  }

  if (isLoading) return <p className="editor-loading">Loading experience…</p>

  return (
    <section className="experience-editor">
      <div className="editor-section__header">
        <h2 className="editor-section__title">Experience</h2>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          Add role
        </button>
      </div>

      {error && <p className="editor-error">{error}</p>}

      {showForm && (
        <ExperienceForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ul className="experience-editor__list">
        {experiences.map((exp) => (
          <li key={exp.id} className="experience-card">
            {editingId === exp.id ? (
              <ExperienceForm
                initial={exp}
                onSubmit={(data) => handleUpdate(exp.id, data)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <div className="experience-card__info">
                  <span className="experience-card__role">{exp.role}</span>
                  <span className="experience-card__company">{exp.company}</span>
                  <span className="experience-card__dates">
                    {exp.startDate} – {exp.endDate}
                  </span>
                  {exp.description && (
                    <p className="experience-card__desc">{exp.description}</p>
                  )}
                </div>
                <div className="experience-card__actions">
                  <button className="btn-secondary" onClick={() => setEditingId(exp.id)}>
                    Edit
                  </button>
                  <button className="btn-danger" onClick={() => handleDelete(exp.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {experiences.length === 0 && !showForm && (
        <p className="editor-empty">No experience added yet.</p>
      )}
    </section>
  )
}

export default ExperienceEditor
