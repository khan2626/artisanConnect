const express = require("express");
const User = require("../models/user");
const authenticate = require("../middlewares/authenticate");
const multer = require("multer");

const router = express.Router();

//configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/home/khan/artisanConnect/routes/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/register", upload.single("profilePicture"), async (req, res) => {
  try {
    const { password, email, role, name, bio, city, address } = req.body;
    const profilePicture = req.file.filename;

    // Create and save the user
    const user = new User({
      password,
      email,
      role,
      name,
      bio,
      city,
      address,
      profilePicture,
    });

    await user.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/me/:userId", authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await User.find({ _id: userId });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read a single user by ID
router.get("/", authenticate, async (req, res) => {
  try {
    const user = await User.find({});
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
    console.log(user);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

// Update a user by ID
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`User ID: ${userId}`);
    console.log(`Request Body: ${JSON.stringify(req.body)}`);

    const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`Updated User: ${JSON.stringify(user)}`);
    res.status(200).json("User updated Successfully");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

// Delete a user by ID
router.delete("/:userId", authenticate, async (req, res) => {
  try {
    const { userId } = req.user._id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
