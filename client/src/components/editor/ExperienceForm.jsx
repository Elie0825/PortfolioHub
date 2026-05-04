import { useState } from 'react'
import '../../styles/components/ExperienceForm.css'

const empty = { role: '', company: '', startDate: '', endDate: '', description: '' }

const ExperienceForm = ({ initial, onSubmit, onCancel }) => {
  const [form, setForm] = useState(initial || empty)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.role.trim() || !form.company.trim() || !form.startDate.trim()) {
      setError('Role, company and start date are required')
      return
    }
    setIsSaving(true)
    setError(null)
    try {
      await onSubmit(form)
    } catch {
      setError('Failed to save')
      setIsSaving(false)
    }
  }

  return (
    <form className="experience-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="role">Role *</label>
          <input id="role" name="role" value={form.role} onChange={handleChange} placeholder="Software Engineer" />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company *</label>
          <input id="company" name="company" value={form.company} onChange={handleChange} placeholder="Acme Corp" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startDate">Start date *</label>
          <input id="startDate" name="startDate" value={form.startDate} onChange={handleChange} placeholder="Jan 2022" />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End date</label>
          <input id="endDate" name="endDate" value={form.endDate} onChange={handleChange} placeholder="present" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="What you built, shipped, or led"
        />
      </div>

      {error && <p className="editor-error">{error}</p>}

      <div className="experience-form__actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={isSaving}>
          {isSaving ? 'Saving…' : initial ? 'Update' : 'Add role'}
        </button>
      </div>
    </form>
  )
}

export default ExperienceForm
