import { useState } from 'react'
import { publicApi } from '../../services/publicApi'
import '../../styles/components/PublicContact.css'

const MAX_LENGTH = 1000

const ContactForm = ({ username }) => {
  const [form, setForm] = useState({ senderName: '', senderEmail: '', message: '' })
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState(null)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSending(true)
    try {
      await publicApi.sendContactMessage(username, form)
      setSent(true)
    } catch (err) {
      const data = err.response?.data
      setError(data?.message || 'Failed to send message. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  if (sent) {
    return (
      <div className="contact-form__success">
        Message sent — I'll be in touch soon.
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__row">
        <div className="contact-form__group">
          <label htmlFor="senderName">Your name</label>
          <input
            id="senderName"
            name="senderName"
            type="text"
            value={form.senderName}
            onChange={handleChange}
            placeholder="Jane Smith"
            required
          />
        </div>
        <div className="contact-form__group">
          <label htmlFor="senderEmail">Your email</label>
          <input
            id="senderEmail"
            name="senderEmail"
            type="email"
            value={form.senderEmail}
            onChange={handleChange}
            placeholder="jane@example.com"
            required
          />
        </div>
      </div>

      <div className="contact-form__group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          maxLength={MAX_LENGTH}
          placeholder="What would you like to say?"
          required
        />
        <span className="contact-form__counter">
          {form.message.length} / {MAX_LENGTH}
        </span>
      </div>

      {error && <p className="contact-form__error">{error}</p>}

      <button type="submit" className="contact-form__submit" disabled={isSending}>
        {isSending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

export default ContactForm
