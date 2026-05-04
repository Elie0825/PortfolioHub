import { useState, useEffect } from 'react'
import { contactLinksApi } from '../../services/contactLinksApi'
import '../../styles/components/ContactEditor.css'

const PLATFORMS = ['github', 'linkedin', 'twitter', 'website', 'email']

const ContactEditor = () => {
  const [links, setLinks] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [saving, setSaving] = useState({})
  const [error, setError] = useState(null)
  const [saved, setSaved] = useState({})

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await contactLinksApi.getAll()
      const map = {}
      data.forEach((l) => { map[l.platform] = l.url })
      setLinks(map)
    } catch {
      setError('Failed to load contact links')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (platform, value) => {
    setLinks((prev) => ({ ...prev, [platform]: value }))
    setSaved((prev) => ({ ...prev, [platform]: false }))
  }

  const handleSave = async (platform) => {
    const url = links[platform] || ''
    setSaving((prev) => ({ ...prev, [platform]: true }))
    setError(null)
    try {
      if (url.trim()) {
        await contactLinksApi.upsert(platform, url.trim())
      } else {
        await contactLinksApi.remove(platform)
      }
      setSaved((prev) => ({ ...prev, [platform]: true }))
    } catch {
      setError(`Failed to save ${platform}`)
    } finally {
      setSaving((prev) => ({ ...prev, [platform]: false }))
    }
  }

  if (isLoading) return <p className="editor-loading">Loading contact links…</p>

  return (
    <section className="contact-editor">
      <h2 className="editor-section__title">Contact links</h2>
      {error && <p className="editor-error">{error}</p>}

      <ul className="contact-editor__list">
        {PLATFORMS.map((platform) => (
          <li key={platform} className="contact-item">
            <label className="contact-item__label" htmlFor={platform}>
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </label>
            <input
              id={platform}
              type={platform === 'email' ? 'email' : 'url'}
              value={links[platform] || ''}
              onChange={(e) => handleChange(platform, e.target.value)}
              placeholder={platform === 'email' ? 'you@example.com' : `https://${platform}.com/…`}
              className="contact-item__input"
            />
            <div className="contact-item__actions">
              {saved[platform] && <span className="editor-saved">Saved</span>}
              <button
                className="btn-primary"
                onClick={() => handleSave(platform)}
                disabled={saving[platform]}
              >
                {saving[platform] ? 'Saving…' : 'Save'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ContactEditor
