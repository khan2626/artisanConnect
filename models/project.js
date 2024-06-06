const mongoose = require("mongoose");
const { Schema } = mongoose;

// Project Schema
const projectSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      "Carpenter",
      "Mason",
      "Plumber",
      "Electrician",
      "Painter",
      "Tiler",
      "Roofer",
      "Welder",
      "Blacksmith",
      "Mechanic",
      "Cabinet Maker",
      "Furniture Maker",
      "Wood Turner",
      "Tailor",
      "Seamstress",
      "Weaver",
      "Jeweler",
      "Silversmith",
      "Goldsmith",
      "Sculptor",
      "Painter (Fine Arts)",
      "Ceramicist/Potter",
      "Baker",
      "Pastry Chef",
      "Butcher",
      "Barber",
      "Hairdresser",
      "Beautician",
      "Computer Repair Technician",
      "Mobile Phone Repair Technician",
      "Auto Mechanic",
      "Auto Electrician",
      "Cleaner",
      "Gardener",
      "Handyman",
      "Photographer",
      "Videographer",
      "DJ",
    ],
  },
  budget: String,
  location: String,
  status: { type: String, required: true, enum: ["open", "done"] },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
