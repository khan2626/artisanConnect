const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const accessSecret = 'my_secret';
const refreshSeret = 'my_refresh_secret';

router.post('/login', async (req, res) => {
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
        const accessToken = jwt.sign({ userId: user._id }, accessSecret, { expiresIn: '15m'} );
        res.status(200).json(accessToken)

        const refreshToken = jwt.sign({ userId: user._id }, refreshSeret, { expiresIn: '14d'} );
        //save the refresh token to the database
        await new RefreshToken({ token: refreshToken, userId: user._id }).save();

        res.cookie('refreshToken', 'refreshToken', { httpOnly: true, secure: true } );
        res.status(200).json(accessToken);

    } catch (error) {
        res.status(500).json({ message: error.message})
    }
});


router.post('/refresh-token', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(401).json(message: 'No refresh token provided');
    }

    try {
        const decoded = jwt.sign(refreshToken, refreshSeret);
        const storedToken = await RefreshToken.find({ token: refreshToken, userId: decoded.userId });

        if (!storedToken) {
            res.status(401).json({ message: 'invalid refresh token' });
        }

        const accessToken = jwt.sign({ userId: decoded.userId }, accessSecret, { expiresIn: '15m'});
        res.status(200).json(accessToken);
    } catch(error) {
        res.status(401).json(error.message);
    }
});

module.exports = router