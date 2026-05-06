// ============================================
// SCRIPTGENIE AI - Saved Script Routes
// routes/savedRoutes.js
// ============================================

const express = require('express');
const router = express.Router();
const { saveScript, getScripts, deleteScript } = require('../controllers/savedController');

router.post('/',        saveScript);
router.get('/',         getScripts);
router.delete('/:id',   deleteScript);

module.exports = router;
