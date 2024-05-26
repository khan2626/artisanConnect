const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const router = express.Router();

const secret = 'my_secret'

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Incorrect email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1hr'} );
        res.status(200).json(token)

    } catch (error) {
        res.status(500).json({ message: error.message})
    }
});

module.exports = router