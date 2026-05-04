import { useEffect } from 'react'

const FONTS = [
  { value: 'system-ui', label: 'System UI (default)', googleFont: null },
  { value: 'Inter', label: 'Inter', googleFont: 'Inter' },
  { value: '"Fira Code"', label: 'Fira Code', googleFont: 'Fira+Code' },
  { value: '"Space Grotesk"', label: 'Space Grotesk', googleFont: 'Space+Grotesk' },
  { value: 'Outfit', label: 'Outfit', googleFont: 'Outfit' },
]

const loadGoogleFont = (fontName) => {
  const id = `gf-${fontName}`
  if (document.getElementById(id)) return
  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@400;500;600;700&display=swap`
  document.head.appendChild(link)
}

const FontSelector = ({ value, onChange }) => {
  useEffect(() => {
    const font = FONTS.find((f) => f.value === value)
    if (font?.googleFont) loadGoogleFont(font.googleFont)
  }, [value])

  return (
    <div className="sc-font-selector form-group">
      <label>Font family</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {FONTS.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FontSelector
