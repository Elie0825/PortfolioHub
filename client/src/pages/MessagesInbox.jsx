import { useState, useEffect } from 'react'
import { messagesApi } from '../services/messagesApi'
import '../styles/pages/MessagesInbox.css'

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-SE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

const MessagesInbox = () => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await messagesApi.fetchMessages()
      setMessages(data)
    } catch {
      setError('Failed to load messages')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExpand = async (msg) => {
    const isOpening = expandedId !== msg.id
    setExpandedId(isOpening ? msg.id : null)
    if (isOpening && !msg.isRead) {
      try {
        await messagesApi.markMessageRead(msg.id)
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
        )
      } catch {
        // non-critical
      }
    }
  }

  if (isLoading) return <p className="editor-loading">Loading messages…</p>
  if (error) return <p className="editor-error">{error}</p>

  return (
    <div className="messages-inbox">
      <h2 className="editor-section__title">Messages</h2>

      {messages.length === 0 && (
        <p className="editor-empty">No messages yet. They appear here when someone contacts you.</p>
      )}

      <ul className="messages-inbox__list">
        {messages.map((msg) => (
          <li
            key={msg.id}
            className={`message-item ${!msg.isRead ? 'message-item--unread' : ''} ${expandedId === msg.id ? 'message-item--open' : ''}`}
          >
            <button className="message-item__header" onClick={() => handleExpand(msg)}>
              <div className="message-item__meta">
                {!msg.isRead && <span className="message-item__dot" />}
                <span className="message-item__name">{msg.senderName}</span>
                <span className="message-item__email">{msg.senderEmail}</span>
              </div>
              <div className="message-item__right">
                <span className="message-item__preview">
                  {expandedId === msg.id ? '' : msg.message.slice(0, 80) + (msg.message.length > 80 ? '…' : '')}
                </span>
                <span className="message-item__time">{formatDate(msg.sentAt)}</span>
              </div>
            </button>
            {expandedId === msg.id && (
              <div className="message-item__body">{msg.message}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MessagesInbox
