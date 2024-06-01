const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("../services/logger_service");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    logger.info("User registered successfully", { email });
    res.status(201).json({ token });
  } catch (err) {
    logger.error("Error registering user", {
      error: err.message,
      stack: err.stack,
    });
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      logger.warn("Invalid login attempt", { email });
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    logger.info("User logged in successfully", { email });
    res.status(200).json({ token });
  } catch (err) {
    logger.error("Error logging in user", {
      error: err.message,
      stack: err.stack,
    });
    res.status(500).json({ error: "Server error" });
  }
};
