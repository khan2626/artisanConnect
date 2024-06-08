const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const RefreshToken = require("../models/refreshToken");
const bcrypt = require("bcryptjs");
const router = express.Router();

const accessSecret = process.env.ACCESS_SECRET_TOKEN || "my_secret";
const refreshSeret = process.env.REFRESH_SECRET_TOKEN || "my_refresh_secret";

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Incorrect email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const accessToken = jwt.sign({ userId: user._id }, accessSecret, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userId: user._id }, refreshSeret, {
      expiresIn: "14d",
    });
    //save the refresh token to the database
    await new RefreshToken({ token: refreshToken, userId: user._id }).save();

    res.cookie("refreshToken", "refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/new-access-token", async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    console.log("No refresh token provided");
    return res.sendStatus(401); // Unauthorized
  }

  try {
    const isMatch = await RefreshToken.findOne({ token: refreshToken });
    if (!isMatch) {
      console.log("Invalid refresh token");
      return res.sendStatus(403); // Forbidden
    }

    const decoded = jwt.verify(refreshToken, refreshSecret);
    const accessToken = jwt.sign({ userId: decoded.userId }, accessSecret, {
      expiresIn: "15m",
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.log("Error during token verification:", error.message);
    res.status(401).json({ message: "Unauthorized" });
  }
});
// const refreshToken = req.cookies.refreshToken;

// if (!refreshToken) {
//   res.status(401).json({ message: "No refresh token provided" });
// }

// try {
//   const decoded = jwt.verify(refreshToken, refreshSeret);
//   const storedToken = await RefreshToken.find({
//     token: refreshToken,
//     userId: decoded.userId,
//   });

//   if (!storedToken) {
//     res.status(401).json({ message: "invalid refresh token" });
//   }

//   const accessToken = jwt.sign({ userId: decoded.userId }, accessSecret, {
//     expiresIn: "15m",
//   });
// res.status(200).json(accessToken);
// } catch (error) {
//   res.status(401).json(error.message);

router.post("/logout", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await RefreshToken.findOneAndDelete({ token: refreshToken });
    res.clearCookie("refreshToken");
  }

  res.status(200).json({ message: "Logeed out successfully!" });
});

module.exports = router;
