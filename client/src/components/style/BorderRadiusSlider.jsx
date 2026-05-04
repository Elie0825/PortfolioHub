const BorderRadiusSlider = ({ value, onChange }) => (
  <div className="sc-radius-slider">
    <div className="sc-radius-slider__header">
      <label className="sc-radius-slider__label">Border radius</label>
      <span className="sc-radius-slider__value">{value}px</span>
    </div>
    <input
      type="range"
      min="0"
      max="20"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="sc-radius-slider__input"
    />
    <div className="sc-radius-slider__ticks">
      <span>Sharp</span>
      <span>Rounded</span>
    </div>
  </div>
)

export default BorderRadiusSlider
