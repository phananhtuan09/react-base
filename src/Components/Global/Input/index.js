import React from 'react'

import './Input.scss'
function Input({
  disabled = false,
  readOnly = false,
  error = null,
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
      {error && <p className="error-text">{error}</p>}
    </>
  )
}

export default Input
