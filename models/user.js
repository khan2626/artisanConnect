const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new Schema({
    password: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['artisan', 'customer'],
    },
    profile: {
      name: String,
      bio: String,
      location: {
        city: String,
        address: String,
      },
      profilePicture: String,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch(error) {
      next(error);
    }
  });


  
  const User = mongoose.model('User', userSchema);
  module.exports = User;