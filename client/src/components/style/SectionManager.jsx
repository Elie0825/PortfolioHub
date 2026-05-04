import { useState } from 'react'

const SECTION_LABELS = {
  hero: 'Hero',
  skills: 'Skills',
  projects: 'Projects',
  experience: 'Experience',
  contact: 'Contact',
}

const SectionManager = ({ sections, onChange }) => {
  const [dragIndex, setDragIndex] = useState(null)

  const handleDragStart = (index) => {
    setDragIndex(index)
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    if (dragIndex === null || dragIndex === index) return
    const next = [...sections]
    const [moved] = next.splice(dragIndex, 1)
    next.splice(index, 0, moved)
    setDragIndex(index)
    onChange(next)
  }

  const handleDragEnd = () => setDragIndex(null)

  const toggleVisible = (index) => {
    onChange(sections.map((s, i) => (i === index ? { ...s, visible: !s.visible } : s)))
  }

  return (
    <div className="sc-section-manager">
      <p className="sc-section-manager__hint">Drag to reorder · toggle to show/hide</p>
      <ul className="sc-section-manager__list">
        {sections.map((section, index) => (
          <li
            key={section.id}
            className={`sc-section-manager__item ${dragIndex === index ? 'sc-section-manager__item--dragging' : ''} ${!section.visible ? 'sc-section-manager__item--hidden' : ''}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <span className="sc-section-manager__handle" aria-hidden="true">
              ⠿
            </span>
            <span className="sc-section-manager__name">
              {SECTION_LABELS[section.id] || section.id}
            </span>
            <button
              className={`sc-section-manager__toggle ${section.visible ? 'sc-section-manager__toggle--on' : ''}`}
              onClick={() => toggleVisible(index)}
            >
              {section.visible ? 'Visible' : 'Hidden'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SectionManager
