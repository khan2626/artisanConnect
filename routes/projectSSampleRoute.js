const express = require("express");
const ProjectSample = require("../models/projectSample");
const authenticate = require("../middlewares/authenticate");
const multer = require("multer");
const Project = require("../models/project");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage });

router.post('/project-sample', upload.single('photo') async (req, res) => {
    try {
        const { title, city, address } = req.body;
        const image = req.file;

    const newProjectSample = new ProjectSample({ title, 
        image,
        city,
        address
     })
     
     await newProjectSample.save();
     res.status(201).json({ message: 'Project sample created' })
    } catch(err) {
        console.log({ message: err.message });
    }
})  

