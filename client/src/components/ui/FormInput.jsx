import '../../styles/components/FormInput.css'

const FormInput = ({ id, label, type = 'text', value, onChange, error, placeholder, autoComplete }) => {
  return (
    <div className="form-input">
      <label className="form-input__label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`form-input__field ${error ? 'form-input__field--error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      {error && <span className="form-input__error">{error}</span>}
    </div>
  )
}

export default FormInput
