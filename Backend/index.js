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

app.post('/login', (req, res) => {
  const { email, password } = req.body
  console.log(email, password)

  if (email === user.email && password === user.password) {
    res.json({ success: true })
  } else {
    res.json({ success: false })
  }
})

const PORT = 5000
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`))
