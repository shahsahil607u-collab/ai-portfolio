const { connectToDatabase } = require('../../../lib/db')
const Project = require('../../../models/Project')
const jwt = require('jsonwebtoken')

async function requireAuth(req, res) {
  const auth = req.headers.authorization || ''
  if (!auth.startsWith('Bearer ')) return null
  const token = auth.split(' ')[1]
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
  } catch (e) {
    return null
  }
}

export default async function handler(req, res) {
  await connectToDatabase()
  if (req.method === 'POST') {
    const user = await requireAuth(req, res)
    if (!user) return res.status(401).json({ message: 'Unauthorized' })
    const body = req.body || {}
    const doc = await Project.create(body)
    return res.status(201).json(doc)
  }
  return res.status(405).json({ message: 'Method not allowed' })
}
