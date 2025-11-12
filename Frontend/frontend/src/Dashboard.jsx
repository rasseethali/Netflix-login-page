import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500)
  }, [])

  const handleLogout = () => {
    console.log('User logged out')
    navigate('/')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 p-6 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-red-600">NETFLIX</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">Welcome to Netflix Dashboard 🍿</h2>
        <div className="bg-gray-900 p-6 rounded-lg">
          <p className="text-gray-300">
            You have successfully logged in! Enjoy browsing your favorite shows and movies.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
