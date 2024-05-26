const mongoose = require('mongoose');
const Schema = mongoose.Schema();


const refreshTokenSchema = new Schema({
    token: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now, expires: '14d' }
})

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema)

module.exports = RefreshToken;