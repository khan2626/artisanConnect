const jwt = require("jsonwebtoken");
const User = require("../models/user");
const RefreshToken = require("../models/refreshToken");

const accessSecret = process.env.SECRET_TOKEN || "my_secret";
const refreshSecret = process.env.REFRESH_TOKEN_SECRET || "MY_refresh_secret";

const authenticate = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    if (renewToken(req, res)) {
      next();
    }
    //return res.status(401).json({ message: "No Token Provided" });
  }
  try {
    const decoded = jwt.verify(token, accessSecret);
    const user = await User.findById(decoded._id);
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
  const refreshToken = req.cookies.RefreshToken;
  const exist = false;

  if (!refreshToken) {
    return res.status(401).json({ message: "No Token Provided" });
  }
  try {
    const decoded = jwt.verify(refreshToken, refreshSecret);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const accessToken = jwt.sign({ userId: user._id }, accessSecret, {
      expiresIn: "7m",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      partitioned: true,
      maxAge: 60000,
    });
    exist = true;
    return exist;
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = authenticate;
