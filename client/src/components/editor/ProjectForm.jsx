import { useState } from 'react'
import '../../styles/components/ProjectForm.css'

const empty = {
  title: '',
  description: '',
  liveUrl: '',
  githubUrl: '',
  techTags: '',
}

const ProjectForm = ({ initial, onSubmit, onCancel }) => {
  const [form, setForm] = useState(
    initial
      ? { ...initial, techTags: initial.techTags.join(', ') }
      : empty
  )
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Title is required')
      return
    }
    setIsSaving(true)
    setError(null)
    try {
      await onSubmit({
        ...form,
        techTags: form.techTags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      })
    } catch {
      setError('Failed to save project')
      setIsSaving(false)
    }
  }

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Project name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="What did you build and why?"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="liveUrl">Live URL</label>
          <input
            id="liveUrl"
            name="liveUrl"
            type="url"
            value={form.liveUrl}
            onChange={handleChange}
            placeholder="https://…"
          />
        </div>
        <div className="form-group">
          <label htmlFor="githubUrl">GitHub URL</label>
          <input
            id="githubUrl"
            name="githubUrl"
            type="url"
            value={form.githubUrl}
            onChange={handleChange}
            placeholder="https://github.com/…"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="techTags">Tech tags</label>
        <input
          id="techTags"
          name="techTags"
          value={form.techTags}
          onChange={handleChange}
          placeholder="React, Node.js, PostgreSQL"
        />
        <span className="form-hint">Comma-separated</span>
      </div>

      {error && <p className="editor-error">{error}</p>}

      <div className="project-form__actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={isSaving}>
          {isSaving ? 'Saving…' : initial ? 'Update project' : 'Add project'}
        </button>
      </div>
    </form>
  )
}

export default ProjectForm
