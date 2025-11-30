const mongoose = require('mongoose')

const TimelineItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  institution: String,
  startDate: Date,
  endDate: Date,
  description: String,
  type: { type: String } // education | work | certification
})

module.exports = mongoose.models.TimelineItem || mongoose.model('TimelineItem', TimelineItemSchema)
