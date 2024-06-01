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
