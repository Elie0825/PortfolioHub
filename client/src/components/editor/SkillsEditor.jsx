import { useState, useEffect } from 'react'
import { skillsApi } from '../../services/skillsApi'
import '../../styles/components/SkillsEditor.css'

const SkillsEditor = () => {
  const [skills, setSkills] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newName, setNewName] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await skillsApi.getAll()
      setSkills(data)
    } catch {
      setError('Failed to load skills')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!newName.trim()) return
    setIsAdding(true)
    setError(null)
    try {
      const skill = await skillsApi.create(newName.trim())
      setSkills((prev) => [...prev, skill])
      setNewName('')
    } catch {
      setError('Failed to add skill')
    } finally {
      setIsAdding(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await skillsApi.remove(id)
      setSkills((prev) => prev.filter((s) => s.id !== id))
    } catch {
      setError('Failed to delete skill')
    }
  }

  const handleToggleFeatured = async (skill) => {
    try {
      const updated = await skillsApi.toggleFeatured(skill.id, !skill.isFeatured)
      setSkills((prev) => prev.map((s) => (s.id === skill.id ? updated : s)))
    } catch {
      setError('Failed to update skill')
    }
  }

  if (isLoading) return <p className="editor-loading">Loading skills…</p>

  return (
    <section className="skills-editor">
      <h2 className="editor-section__title">Skills</h2>

      {error && <p className="editor-error">{error}</p>}

      <form className="skills-editor__add" onSubmit={handleAdd}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Skill name (e.g. TypeScript)"
          maxLength={50}
        />
        <button type="submit" className="btn-primary" disabled={isAdding || !newName.trim()}>
          {isAdding ? 'Adding…' : 'Add'}
        </button>
      </form>

      <ul className="skills-editor__list">
        {skills.map((skill) => (
          <li key={skill.id} className="skill-item">
            <span className={`skill-item__name ${skill.isFeatured ? 'skill-item__name--featured' : ''}`}>
              {skill.name}
            </span>
            <div className="skill-item__actions">
              <button
                className={`btn-tag ${skill.isFeatured ? 'btn-tag--active' : ''}`}
                onClick={() => handleToggleFeatured(skill)}
                title={skill.isFeatured ? 'Remove from featured' : 'Mark as featured'}
              >
                {skill.isFeatured ? '★ Featured' : '☆ Feature'}
              </button>
              <button className="btn-danger-sm" onClick={() => handleDelete(skill.id)}>
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>

      {skills.length === 0 && (
        <p className="editor-empty">No skills yet. Add the technologies you work with.</p>
      )}
    </section>
  )
}

export default SkillsEditor
