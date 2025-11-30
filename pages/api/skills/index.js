const { connectToDatabase } = require('../../../lib/db')
const Skill = require('../../../models/Skill')

export default async function handler(req, res) {
  await connectToDatabase()
  if (req.method === 'GET') {
    const items = await Skill.find({}).lean()
    return res.status(200).json(items)
  }
  return res.status(405).json({ message: 'Method not allowed' })
}
