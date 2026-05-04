const OPTIONS = [
  { value: 'flat', label: 'Flat' },
  { value: 'bordered', label: 'Bordered' },
  { value: 'elevated', label: 'Elevated' },
]

const CardStyleSelector = ({ value, onChange }) => (
  <div className="sc-option-group">
    <label className="sc-option-group__label">Card style</label>
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

export default CardStyleSelector
