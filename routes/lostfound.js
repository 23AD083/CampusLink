const express = require('express');
const LostFound = require('../models/LostFound');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all lost & found posts, with optional filters
router.get('/', async (req, res) => {
  try {
    const { type, category, date } = req.query;
    let filter = {};
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (date) filter.date = { $gte: new Date(date) };
    const posts = await LostFound.find(filter).sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create lost/found post (student only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'student') return res.status(403).json({ message: 'Only students can create posts' });
    const { type, itemName, imageUrl, category, location } = req.body;
    const post = new LostFound({
      type,
      itemName,
      imageUrl,
      category,
      location,
      createdBy: req.user.userId,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 