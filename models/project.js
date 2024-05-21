const mongoose = require('mongoose');
const { Schema } = mongoose;

// Project Schema
const projectSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: String,
    budget: Number,
    location: String,
    status: { type: String, default: 'open' },
    assignedArtisanId: { type: Schema.Types.ObjectId, ref: 'Artisan' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const Project = mongoose.model('Project', projectSchema);
  