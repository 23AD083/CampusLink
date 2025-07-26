const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
  type: { type: String, enum: ['Lost', 'Found'], required: true },
  itemName: { type: String, required: true },
  imageUrl: { type: String },
  category: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('LostFound', lostFoundSchema); 