const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.login = async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email }).populate({ path: 'role', populate: { path: 'permissions' } });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });
const match = await user.comparePassword(password);
if (!match) return res.status(401).json({ message: 'Invalid credentials' });
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
return res.json({ user: { _id: user._id, name: user.name, email: user.email, role: user.role ? { _id: user.role._id, name: user.role.name } : null, permissions: user.role ? user.role.permissions.map(p=>p.name) : [] }, token });
};