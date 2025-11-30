const { connectToDatabase } = require('../../../../lib/db')
const Project = require('../../../../models/Project')
const jwt = require('jsonwebtoken')

async function requireAuth(req) {
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
  const { id } = req.query
  const user = await requireAuth(req)
  if (!user) return res.status(401).json({ message: 'Unauthorized' })

  if (req.method === 'PUT') {
    const data = req.body || {}
    const updated = await Project.findByIdAndUpdate(id, data, { new: true }).lean()
    return res.status(200).json(updated)
  }

  if (req.method === 'DELETE') {
    await Project.findByIdAndDelete(id)
    return res.status(204).end()
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
