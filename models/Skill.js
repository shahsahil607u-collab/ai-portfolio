const mongoose = require('mongoose')

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String }, // Frontend, Backend, DevOps, AI/ML, 3D/WebGL
  level: { type: String }, // e.g. "Advanced", "Intermediate"
})

module.exports = mongoose.models.Skill || mongoose.model('Skill', SkillSchema)
