const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tech: [String],
  github: String,
  live: String,
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema)
