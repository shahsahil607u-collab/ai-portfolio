const { connectToDatabase } = require('../../../lib/db')
const Achievement = require('../../../models/Achievement')

export default async function handler(req, res) {
  await connectToDatabase()
  if (req.method === 'GET') {
    const items = await Achievement.find({}).sort({ date: -1 }).lean()
    return res.status(200).json(items)
  }
  return res.status(405).json({ message: 'Method not allowed' })
}
