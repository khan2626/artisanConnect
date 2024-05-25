const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/user')
const router = express.Router();

const secret = 'my_secret'

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            res.status(400).json({ message: 'incorrect email or password'});
        }
        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1hr'} );

    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})