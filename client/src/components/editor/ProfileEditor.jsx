import { useState, useEffect } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { portfolioApi } from '../../services/portfolioApi'
import '../../styles/components/ProfileEditor.css'

const ProfileEditor = () => {
  const { portfolio, updateProfileSection } = usePortfolio()
  const profile = portfolio?.profileSection

  const [form, setForm] = useState({
    headline: '',
    bio: '',
    location: '',
    availability: '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (profile) {
      setForm({
        headline: profile.headline || '',
        bio: profile.bio || '',
        location: profile.location || '',
        availability: profile.availability || '',
      })
    }
  }, [profile])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setSaved(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    try {
      const updated = await portfolioApi.updateProfile(form)
      updateProfileSection(updated)
      setSaved(true)
    } catch {
      setError('Failed to save profile')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="profile-editor">
      <h2 className="editor-section__title">Profile</h2>
      <form className="profile-editor__form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="headline">Headline</label>
          <input
            id="headline"
            name="headline"
            type="text"
            value={form.headline}
            onChange={handleChange}
            placeholder="Full-stack developer building products people love"
            maxLength={120}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="A few sentences about yourself"
            rows={4}
            maxLength={600}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              placeholder="Stockholm, Sweden"
            />
          </div>

          <div className="form-group">
            <label htmlFor="availability">Availability</label>
            <input
              id="availability"
              name="availability"
              type="text"
              value={form.availability}
              onChange={handleChange}
              placeholder="Open to work"
            />
          </div>
        </div>

        {error && <p className="editor-error">{error}</p>}

        <div className="profile-editor__footer">
          {saved && <span className="editor-saved">Saved</span>}
          <button type="submit" className="btn-primary" disabled={isSaving}>
            {isSaving ? 'Saving…' : 'Save profile'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default ProfileEditor
