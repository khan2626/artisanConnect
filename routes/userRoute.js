const express = require('express');
const User = require('../models/user');
const Artisan = require('../models/artisan');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password, email, role, profile, category, skills, portfolio, availability } = req.body;

    // Create and save the user
    const user = new User({ username, password, email, role, profile });
    await user.save();

    if (role === 'artisan') {
      // Create and save the artisan profile if the role is artisan
      const artisan = new Artisan({ 
        userId: user._id, 
        category, 
        skills, 
        portfolio, 
        availability 
      });
      await artisan.save();
    }

    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
