import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;
// Artisan Schema
const artisanSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    skills: [String],
    portfolio: [
      {
        title: String,
        description: String,
        imageUrls: [String],
      },
    ],
    ratings: [Number],
    comments: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const Artisan = mongoose.model('Artisan', artisanSchema);

