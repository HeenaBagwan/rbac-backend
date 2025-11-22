module.exports = (permission) => (req, res, next) => {
const user = req.user;
if (!user || !user.role) return res.status(403).json({ message: 'Forbidden' });
const perms = user.role.permissions.map(p => p.name);
if (perms.includes(permission)) return next();
return res.status(403).json({ message: 'Forbidden' });
};