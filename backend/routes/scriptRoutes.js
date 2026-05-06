// ============================================
// SCRIPTGENIE AI - Script Routes
// routes/scriptRoutes.js
// ============================================

const express = require('express');
const router = express.Router();
const { generate } = require('../controllers/scriptController');

// POST /api/scripts/generate
router.post('/generate', generate);

module.exports = router;
