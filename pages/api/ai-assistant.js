const { connectToDatabase } = require('../../lib/db')
const Project = require('../../models/Project')
const Skill = require('../../models/Skill')
const TimelineItem = require('../../models/TimelineItem')
const Achievement = require('../../models/Achievement')
const { askPortfolioAssistant } = require('../../lib/ai')

export default async function handler(req, res) {
  await connectToDatabase()
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })
  const { question } = req.body || {}
  if (!question) return res.status(400).json({ message: 'Missing question' })

  // Gather portfolio data to build a context prompt
  const [projects, skills, timeline, achievements] = await Promise.all([
    Project.find({}).lean(),
    Skill.find({}).lean(),
    TimelineItem.find({}).lean(),
    Achievement.find({}).lean(),
  ])

  const portfolioData = {
    about: '',
    projects,
    skills,
    timeline,
    achievements,
  }

  const answer = await askPortfolioAssistant(question, portfolioData)
  return res.status(200).json({ answer })
}
