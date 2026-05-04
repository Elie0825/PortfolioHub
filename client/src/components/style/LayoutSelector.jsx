const OPTIONS = [
  { value: 'centered', label: 'Centered' },
  { value: 'wide', label: 'Wide' },
]

const LayoutSelector = ({ value, onChange }) => (
  <div className="sc-option-group">
    <label className="sc-option-group__label">Layout width</label>
    <div className="sc-option-group__options">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          className={`sc-option-group__btn ${value === opt.value ? 'sc-option-group__btn--active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
)

export default LayoutSelector
