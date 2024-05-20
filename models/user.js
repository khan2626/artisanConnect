const mongoose = require('mongoose');
const { Schema } = mongoose;

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
  
  const User = mongoose.model('User', userSchema);
  