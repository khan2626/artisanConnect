const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');


const accessSecret = process.env.SECRET_TOKEN || 'my_secret';
const refreshSecret = process.env.REFRESH_TOKEN_SECRET || 'MY_refresh_secret';



const authenticate = async (req, res, next) => {
    //authHeader = req.header['authorisation'];
    //token = authHeader && authHeader.split(' ')[1];
    const token = req.header('Authorization')?.replace('Bearer ', '');



    if (!token) {
        return res.status(401).json({ message: 'No Token Provided'})
    }

    try {
        const decoded = jwt.verify(token, accessSecret);
        user =  await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

module.exports = authenticate;
