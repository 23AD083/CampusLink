const express = require('express');
const Timetable = require('../models/Timetable');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all timetable entries for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const entries = await Timetable.find({ user: req.user.userId });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Add a timetable entry
router.post('/', auth, async (req, res) => {
  try {
    const { subject, day, startTime, endTime } = req.body;
    const entry = new Timetable({
      user: req.user.userId,
      subject,
      day,
      startTime,
      endTime,
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Edit a timetable entry
router.put('/:id', auth, async (req, res) => {
  try {
    const { subject, day, startTime, endTime } = req.body;
    const entry = await Timetable.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { subject, day, startTime, endTime },
      { new: true }
    );
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a timetable entry
router.delete('/:id', auth, async (req, res) => {
  try {
    const entry = await Timetable.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 