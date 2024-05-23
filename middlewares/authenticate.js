const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secret = process.env.SECRET_TOKEN || 'MY_secret';


const auth = async ((req, res, next) => {
    token = req.headers['authorisation'].split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No Token Provide'})
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = await User.findById(decode.userId);
        if (!req.user) {
            return res.satus(401).json({ message: 'User not found' });
        }
        next();
    } catch (err) {
        res.satus(401).json({ message: 'Invalid token'});
    }
    
})

module.exports = auth;