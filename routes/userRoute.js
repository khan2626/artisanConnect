const express = require('express');
const User = require('../models/user');
const Artisan = require('../models/artisan');
const authenticate = require('../middlewares/authenticate');


const { createUser } = require('../services/userService');
const { createArtisan } = require('../services/artisanService.js')


const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { password, email, role, profile, category, skills, portfolio, availability } = req.body;

    // Create and save the user
    const user = await createUser({ password, email, role, profile });

    console.log('user created')
    if (role === 'artisan') {
    // Create and save the artisan profile if the role is artisan
      const artisan = await createArtisan({ 
        userId: user._id, 
        category, 
        skills, 
        portfolio, 
        availability 
      });
 
    }
    
    return res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});



// Read a single user by ID
router.get('/', authenticate, async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update a user by ID
router.put('/me', async (req, res) => {
    try {
        const { username, password, email, role, profile } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { username, password, email, role, profile, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        userId = User._id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;