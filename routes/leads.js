const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const check = require('../middleware/rbac');
const { getLeads, createLead, updateLead, deleteLead } = require('../controllers/leadController');

router.get('/', auth, check('view_leads'), getLeads);
router.post('/create', auth, check('create_leads'), createLead);
router.put('/:id', auth, check('update_leads'), updateLead);
router.delete('/:id', auth, check('delete_leads'), deleteLead);

module.exports = router;