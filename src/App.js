import './App.css'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const notify = () => toast('Wow so easy !')
  return (
    <div className="App">
      <h1>App</h1>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      <button onClick={notify}>Notify !</button>
      <ToastContainer />
    </div>
  )
}

export default App
