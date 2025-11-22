const express = require('express');
const Permission = require('../models/Permission');
const router = express.Router();
router.get('/', async (req, res)=>{ const p = await Permission.find(); res.json(p); });
module.exports = router;