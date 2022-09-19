import React from 'react'
import './Input.scss'

function Input({
  disabled = false,
  readOnly = false,
  error = null,
  value = null,
  required = false,
  ...inputProps
}) {
  return (
    <>
      <input disabled={disabled} readOnly={readOnly} {...inputProps} />
      {required && error && !value && <p className="error-text">{error}</p>}
    </>
  )
}

export default Input
