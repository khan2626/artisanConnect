const express = require("express");
const router = express.Router();
const { createProject } = require("../services/projectService");
const Project = require("../models/project");
const authenticate = require("../middlewares/authenticate");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/", upload.single("projectImage"), async (req, res) => {
  try {
    const { title, category, budget, location, status } = req.body;
    const image = req.file;

    const newProject = await createProject({
      title,
      image,
      category,
      budget,
      location,
      status,
    });

    //await newProject.save();
    res
      .status(201)
      .json({ message: "Project created successfullly", project: newProject });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a project
router.put("/:projectId", authenticate, async (req, res) => {
  try {
    const { projectId } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:projectId", authenticate, async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      res.status(404).json({ Error: "Not Found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
