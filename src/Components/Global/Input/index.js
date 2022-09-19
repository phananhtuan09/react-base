import React from 'react'
import './Input.scss'

function Input({
  disabled = false,
  readOnly = false,
  error = null,
  value = null,
  required = false,
  className = '',
  ...inputProps
}) {
  return (
    <>
      <input
        disabled={disabled}
        readOnly={readOnly}
        {...inputProps}
        className={`${className} ${error ? 'error-input' : ''}`}
      />
      {required && error && !value && <p className="error-text">{error}</p>}
    </>
  )
}

export default Input
