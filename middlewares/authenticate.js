const jwt = require("jsonwebtoken");
const User = require("../models/user");
const refreshToken = require("../models/refreshToken");

const accessSecret = process.env.SECRET_TOKEN || "my_secret";
const refreshSecret = process.env.REFRESH_TOKEN_SECRET || "MY_refresh_secret";

const authenticate = async (req, res, next) => {
  let token = req.cookies.accessToken;

  if (!token) {
    const renewed = await renewToken(req, res);
    if (renewed) {
      token = req.cookies.accessToken;
    } else {
      return; // renewToken already sends the response
    }
  }

  try {
    const decoded = jwt.verify(token, accessSecret);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const renewToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401).json({ message: "No refresh token provided" });
    return false;
  }

  try {
    const decoded = jwt.verify(refreshToken, refreshSecret);
    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return false;
    }

    const newAccessToken = jwt.sign({ userId: user._id }, accessSecret, {
      expiresIn: "7m",
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 60000, // 1 minute
    });

    return true;
  } catch (err) {
    res.status(401).json({ message: err.message });
    return false;
  }
};

module.exports = authenticate;
