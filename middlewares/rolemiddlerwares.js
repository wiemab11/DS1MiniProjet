//lenna middlerware bech yaaml verification l role mt3 user
module.exports = (requiredRole) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: 'requird inscription' });
  if (req.user.role !== requiredRole) return res.status(403).json({ msg: 'you dont have permission' });
  next();
};