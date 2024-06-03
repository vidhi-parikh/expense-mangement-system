const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    logger.warn('No token provided in request', { path: req.path });
    return res.status(401).json({ error: 'Not authorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    logger.info('User authenticated successfully', { userId: req.user.id });
    next();
  } catch (err) {
    logger.error('Error during token verification', { error: err.message, stack: err.stack });
    res.status(401).json({ error: 'Not authorized' });
  }
};
