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


module.exports = router;