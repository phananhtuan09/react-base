import Input from '../../Components/Global/Input'
import React, { useState } from 'react'
import './Login.scss'
function Login() {
  const [email, setEmail] = useState('')
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  return (
    <>
      <h1>Login</h1>
      <Input
        type="text"
        name="email"
        placeholder="Enter a email"
        value={email}
        onChange={handleChangeEmail}
        className="email"
        required
        error="Required"
      />
    </>
  )
}

export default Login