const mongoose = require('mongoose');
const { Schema } = mongoose;

const artisanSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true, enum: [
    'Carpenter', 'Mason', 'Plumber', 'Electrician', 'Painter', 'Tiler', 'Roofer',
    'Welder', 'Blacksmith', 'Mechanic',
    'Cabinet Maker', 'Furniture Maker', 'Wood Turner',
    'Tailor', 'Seamstress', 'Weaver',
    'Jeweler', 'Silversmith', 'Goldsmith',
    'Sculptor', 'Painter (Fine Arts)', 'Ceramicist/Potter',
    'Baker', 'Pastry Chef', 'Butcher',
    'Barber', 'Hairdresser', 'Beautician',
    'Computer Repair Technician', 'Mobile Phone Repair Technician',
    'Auto Mechanic', 'Auto Electrician',
    'Cleaner', 'Gardener', 'Handyman',
    'Photographer', 'Videographer', 'DJ'
  ]},
  skills: [String],
  portfolio: [
    {
      title: String,
      description: String,
      imageUrls: [String],
    },
  ],
  ratings: [Number],
  availability: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Artisan = mongoose.model('Artisan', artisanSchema);

module.exports = Artisan;
