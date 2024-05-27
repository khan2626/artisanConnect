const mongoose = require('mongoose');
const { Schema } = mongoose;


const refreshTokenSchema = new Schema({
    token: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now }
})

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema)

module.exports = RefreshToken;