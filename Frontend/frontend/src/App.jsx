import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    try {
      const res = await axios.post('http://localhost:5000/login', { email, password })
      if (res.data.success) {
        navigate('/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      console.error(err)
      setError('Server error, please try again later')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="bg-opacity-75 bg-gray-900 p-8 rounded-lg w-80 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-2 bg-gray-800 rounded outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 bg-gray-800 rounded outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition-colors rounded p-2 font-semibold"
          >
            Sign In
          </button>
        </form>
        <p className="text-gray-400 text-xs text-center mt-4">
          New to Netflix? <span className="text-white">Sign up now</span>
        </p>
      </div>
    </div>
  )
}

export default App
