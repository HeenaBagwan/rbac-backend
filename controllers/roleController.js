const Role = require("../models/Role");
const Permission = require("../models/Permission");

// GET all roles
exports.getRoles = async (req, res) => {
  const roles = await Role.find().populate("permissions");
  res.json(roles);
};

// CREATE role
exports.createRole = async (req, res) => {
  try {
    const { name, permissions, description } = req.body;

    if (!name || !permissions) {
      return res.status(400).json({ error: "Name & permissions required" });
    }

    const newRole = await Role.create({
      name,
      description,  // ✅ include description
      permissions
    });

    // populate permissions to return
    const populatedRole = await Role.findById(newRole._id).populate("permissions");

    res.json(populatedRole);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Role creation failed" });
  }
};


// UPDATE role
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { name, description, permissions } = req.body;

  const updated = await Role.findByIdAndUpdate(
    id,
    { name, description, permissions },
    { new: true }
  ).populate("permissions");

  res.json(updated);
};

// DELETE role
exports.deleteRole = async (req, res) => {
  await Role.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
