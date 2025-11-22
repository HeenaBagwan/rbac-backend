const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUserRole, deleteUser } = require('../controllers/userController');
router.get('/', getUsers);
router.post('/create', createUser);
router.put('/:userId/role', updateUserRole);
router.delete('/:userId', deleteUser);
module.exports = router;