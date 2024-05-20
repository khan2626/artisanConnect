const Project = require('../models/project');


async function createProject(project) {

    // Create and save a new project.
    const newProject = new Project(project);
    await newProject.save();
    console.log('Project created successfully:', newProject);
}

module.exports = { createProject };