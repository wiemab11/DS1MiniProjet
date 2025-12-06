const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

//hedha middlerware bech yaaml verification l token w yjibli user mt3o
module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization') || '';
  if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ msg: 'token is missed' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ msg: 'user is not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'token unvalid' });
  }
};