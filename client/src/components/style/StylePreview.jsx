const buildCssVars = (styleConfig) => {
  const vars = {}
  if (styleConfig.accentColor) {
    vars['--color-brand'] = styleConfig.accentColor
    vars['--color-brand-hover'] = styleConfig.accentColor
    vars['--color-border-input-focus'] = styleConfig.accentColor
  }
  if (styleConfig.bgColor) {
    vars['--color-bg-page'] = styleConfig.bgColor
    vars['--color-bg-card'] = styleConfig.bgColor
  }
  if (styleConfig.textColor) {
    vars['--color-text-primary'] = styleConfig.textColor
  }
  if (styleConfig.fontFamily && styleConfig.fontFamily !== 'system-ui') {
    vars['--font-sans'] = `${styleConfig.fontFamily}, system-ui, sans-serif`
  }
  if (styleConfig.borderRadius !== undefined) {
    const r = styleConfig.borderRadius
    vars['--radius-sm'] = `${r}px`
    vars['--radius-md'] = `${Math.round(r * 1.6)}px`
    vars['--radius-lg'] = `${Math.round(r * 2.5)}px`
  }
  return vars
}

const MOCK_SKILLS = ['React', 'Node.js', 'TypeScript', 'PostgreSQL']
const MOCK_PROJECTS = [
  { title: 'Portfolio Hub', desc: 'Full-stack portfolio platform' },
  { title: 'Dev Blog', desc: 'Personal writing & tutorials' },
]

const StylePreview = ({ styleConfig, sectionOrder }) => {
  const cssVars = buildCssVars(styleConfig)
  const cardStyle = styleConfig.cardStyle || 'bordered'
  const layout = styleConfig.layout || 'centered'

  const visibleIds = (sectionOrder || [])
    .filter((s) => s.visible)
    .map((s) => s.id)

  const show = (id) => visibleIds.length === 0 || visibleIds.includes(id)

  return (
    <div className={`style-preview style-preview--${layout}`} style={cssVars}>
      <div className="style-preview__inner">
        {show('hero') && (
          <div className="sp-hero">
            <div className="sp-avatar" />
            <div className="sp-lines">
              <div className="sp-line sp-line--name" />
              <div className="sp-line sp-line--sub" />
              <div className="sp-line sp-line--sub sp-line--short" />
            </div>
          </div>
        )}

        {show('skills') && (
          <div className="sp-section">
            <div className="sp-section-label">Skills</div>
            <div className="sp-chips">
              {MOCK_SKILLS.map((s) => (
                <span key={s} className="sp-chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {show('projects') && (
          <div className="sp-section">
            <div className="sp-section-label">Projects</div>
            <div className={`sp-cards sp-cards--${cardStyle}`}>
              {MOCK_PROJECTS.map((p) => (
                <div key={p.title} className="sp-card">
                  <div className="sp-card-title">{p.title}</div>
                  <div className="sp-card-desc">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {show('experience') && (
          <div className="sp-section">
            <div className="sp-section-label">Experience</div>
            <div className="sp-exp-item">
              <div className="sp-line sp-line--sub" />
              <div className="sp-line sp-line--tiny" />
            </div>
          </div>
        )}

        {show('contact') && (
          <div className="sp-section">
            <div className="sp-section-label">Contact</div>
            <div className="sp-contact-btn" />
          </div>
        )}
      </div>
    </div>
  )
}

export default StylePreview
