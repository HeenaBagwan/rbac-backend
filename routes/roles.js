const express = require("express");
const router = express.Router();

const {
  getRoles,
  createRole,
  updateRole,
  deleteRole
} = require("../controllers/roleController");
const auth = require("../middleware/auth"); // authentication
const rbac = require("../middleware/rbac"); // role-based permission

// Routes
router.get("/", getRoles);
router.post("/", createRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;
