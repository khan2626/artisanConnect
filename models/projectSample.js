const mongoose = require("mongoose");
const { Schema } = mongoose;

// ProjectSample Schema
const projectSampleSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  city: String,
  address: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// const commentSchema = new Schema({
//   projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
//   text: { type: String, required: true },
//   author: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

const Project = mongoose.model("Project", projectSchema);
// const Comment = mongoose.model("Comment", commentSchema);

module.exports = ProjectSample;
