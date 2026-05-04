import { useNavigate, useLocation } from 'react-router-dom'
import '../../styles/components/EditorSidebar.css'

const EDITOR_ITEMS = [
  { id: 'profile', label: 'Profile' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
  { id: 'theme', label: 'Theme' },
  { id: 'style', label: 'Style' },
]

const EditorSidebar = ({ activeSection, onSelect, unreadCount }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const isAnalyticsActive = location.pathname === '/dashboard/analytics'
  const isMessagesActive = location.pathname === '/dashboard/messages'

  return (
    <nav className="editor-sidebar">
      <ul className="editor-sidebar__nav">
        {EDITOR_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              className={`editor-sidebar__item ${activeSection === item.id && !isAnalyticsActive && !isMessagesActive ? 'editor-sidebar__item--active' : ''}`}
              onClick={() => onSelect(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}

        <li className="editor-sidebar__divider" />

        <li>
          <button
            className={`editor-sidebar__item ${isAnalyticsActive ? 'editor-sidebar__item--active' : ''}`}
            onClick={() => navigate('/dashboard/analytics')}
          >
            Analytics
          </button>
        </li>

        <li>
          <button
            className={`editor-sidebar__item ${isMessagesActive ? 'editor-sidebar__item--active' : ''}`}
            onClick={() => navigate('/dashboard/messages')}
          >
            Messages
            {unreadCount > 0 && (
              <span className="editor-sidebar__badge">{unreadCount}</span>
            )}
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default EditorSidebar
