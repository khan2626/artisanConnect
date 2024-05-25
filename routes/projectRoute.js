const express = require('express');
const router = express.Router();

const Project = require('../models/project');

router.post('/', async (req, res) => {
    try {
        const { userId, title, description, category, budget, location, status,  assignedArtisanId, createdAt, updatedAt } = req.body;
        const newProject = new Project({ userId, 
            title, 
            description, 
            category, 
            budget, 
            location, 
            status,  assignedArtisanId, createdAt, updatedAt });

        await newProject.save();
        res.status(201).json({message: 'Project created successfullly', project: newProject })

    } catch(error) {
        res.status(500).json({ Error: 'Server Error' });
    }
})


router.get('/', async (req, res) => {
    try {
        const projects = Project.find();
        res.status(200).json(projects);
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }  
});

// Update a project 
router.put('/update', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true });
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.delete('/delete', async (req, res) => {
    try {
        const user = await Project.findByIdAndDelete(req.user._id);
        if (!user) {
            res.status(404).json({ Error: 'Not Found'})
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router;