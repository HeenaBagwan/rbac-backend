const Permission = require('../models/Permission');
exports.getPermissions = async (req, res) => {
  const perms = await Permission.find();
  res.json(perms);
};