import { useState } from 'react'

const useFormField = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setValue(e.target.value)
    if (error) setError('')
  }

  const reset = () => {
    setValue(initialValue)
    setError('')
  }

  return { value, error, setError, onChange: handleChange, reset }
}

export default useFormField
