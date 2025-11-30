const mongoose = require('mongoose')

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: Date,
  issuer: String,
  description: String
})

module.exports = mongoose.models.Achievement || mongoose.model('Achievement', AchievementSchema)
