const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  day: { type: String, required: true }, // e.g., Monday
  startTime: { type: String, required: true }, // e.g., 09:00
  endTime: { type: String, required: true }, // e.g., 10:00
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema); 