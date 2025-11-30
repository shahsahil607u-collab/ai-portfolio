const { connectToDatabase } = require('../../../lib/db')
const User = require('../../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

export default async function handler(req, res) {
  await connectToDatabase()
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ message: 'Missing credentials' })

  const user = await User.findOne({ email }).lean()
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  const match = await bcrypt.compare(password, user.passwordHash)
  if (!match) return res.status(401).json({ message: 'Invalid credentials' })

  const token = jwt.sign({ sub: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' })
  return res.status(200).json({ token })
}
