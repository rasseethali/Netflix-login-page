const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Mock credentials
const user = {
  email: 'raseethali46@gmail.com',
  password: '123456'
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' })
})

// Login endpoint with error handling
app.post('/login', (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      })
    }

    console.log('Login attempt:', { email })

    if (email === user.email && password === user.password) {
      return res.status(200).json({ 
        success: true, 
        message: 'Login successful' 
      })
    } else {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      })
    }
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Server error, please try again later' 
    })
  }
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint not found' 
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`)
  console.log(`📍 API Health Check: http://localhost:${PORT}/api/health`)
})
