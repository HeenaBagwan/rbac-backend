
const express = require('express');
const router = express.Router();
const { getProperties, createProperty, updateProperty, deleteProperty } = require('../controllers/propertyController');
const auth = require('../middleware/auth');
const check = require('../middleware/rbac');

router.get('/', auth, check('view_property'), getProperties);
router.post('/create', auth, check('create_property'), createProperty);
router.put('/:id', auth, check('update_property'), updateProperty);
router.delete('/:id', auth, check('delete_property'), deleteProperty);

module.exports = router;
