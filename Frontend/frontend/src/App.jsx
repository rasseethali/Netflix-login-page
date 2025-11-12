import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const getApiUrl = () => {
    // Try environment variable first, fallback to localhost for development
    const envUrl = import.meta.env.VITE_API_URL
    return envUrl || 'http://localhost:5000'
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    setLoading(true)

    try {
      const apiUrl = getApiUrl()
      console.log('Attempting login with API URL:', apiUrl)

      const res = await axios.post(`${apiUrl}/login`, 
        { email: email.trim(), password },
        { timeout: 10000 } // 10 second timeout
      )

      if (res.data.success) {
        console.log('Login successful')
        navigate('/dashboard')
      } else {
        setError(res.data.message || 'Invalid email or password')
      }
    } catch (err) {
      console.error('Login error:', err)

      if (err.code === 'ECONNABORTED') {
        setError('Request timeout - server not responding')
      } else if (err.response?.status === 401) {
        setError('Invalid email or password')
      } else if (err.response?.status === 400) {
        setError(err.response.data.message || 'Invalid input')
      } else if (err.message === 'Network Error') {
        setError('Network error - please check your connection')
      } else {
        setError('Server error, please try again later')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="bg-opacity-75 bg-gray-900 p-8 rounded-lg w-80 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        
        {error && (
          <div className="bg-red-900 border border-red-500 text-red-200 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-2 bg-gray-800 rounded outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 bg-gray-800 rounded outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={`rounded p-2 font-semibold transition-colors ${
              loading
                ? 'bg-red-800 cursor-not-allowed opacity-50'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-gray-400 text-xs text-center mt-4">
          New to Netflix? <span className="text-white cursor-pointer hover:underline">Sign up now</span>
        </p>
      </div>
    </div>
  )
}

export default App
