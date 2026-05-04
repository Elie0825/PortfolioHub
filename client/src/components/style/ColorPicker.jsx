const ColorPicker = ({ label, value, onChange }) => (
  <div className="sc-color-picker">
    <label className="sc-color-picker__label">{label}</label>
    <div className="sc-color-picker__row">
      <input
        type="color"
        className="sc-color-picker__input"
        value={value || '#000000'}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="sc-color-picker__hex">{value || 'Theme default'}</span>
      {value && (
        <button
          className="sc-color-picker__reset"
          onClick={() => onChange('')}
          title="Reset to theme default"
        >
          ×
        </button>
      )}
    </div>
  </div>
)

export default ColorPicker
