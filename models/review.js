const mongoose = require('mongoose');
const { Schema } = mongoose;

// Review Schema
const reviewSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    artisanId: { type: Schema.Types.ObjectId, ref: 'Artisan', required: true },
    rating: { type: Number, required: true },
    comment: String,
    createdAt: { type: Date, default: Date.now },
  });
  
  const Reviews = mongoose.model('Review', reviewSchema);
  