const User = require('../models/User');
const Role = require('../models/Role');


exports.getUsers = async (req, res) => {
const users = await User.find().populate('role');
res.json(users);
};


exports.createUser = async (req, res) => {
const { name, email, password, roleId } = req.body;
const user = new User({ name, email, password, role: roleId || null });
await user.save();
await user.populate('role');
res.json(user);
};


exports.updateUserRole = async (req, res) => {
const { userId } = req.params;
const { roleId } = req.body;
const user = await User.findByIdAndUpdate(userId, { role: roleId }, { new: true }).populate('role');
res.json(user);
};


exports.deleteUser = async (req, res) => {
const { userId } = req.params;
await User.findByIdAndDelete(userId);
res.json({ message: 'deleted' });
};