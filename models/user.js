const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

// User Schema
const userSchema = new Schema({
  password: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["artisan", "customer"],
  },

  name: { type: String, required: true },
  bio: { type: String, required: true },

  city: { type: String, required: true },
  address: { type: String, required: true },

  profilePicture: String,

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

//Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

//Compare password method
/**
  userSchema.methods.comparePassword = function (inputedPassword) {
    return bcrypt.compare(inputedPassword, this.password);
  };
*/
const User = mongoose.model("User", userSchema);
module.exports = User;
