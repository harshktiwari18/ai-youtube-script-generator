// ============================================
// SCRIPTGENIE AI - Saved Scripts Controller
// controllers/savedController.js
// ============================================

let Script;
try {
  Script = require('../models/Script');
} catch {
  Script = null;
}

/**
 * POST /api/saved  - Save a script to MongoDB
 */
async function saveScript(req, res) {
  if (!Script) {
    return res.status(503).json({ success: false, error: 'Database not connected.' });
  }
  try {
    const doc = new Script(req.body);
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * GET /api/saved  - Get all saved scripts
 */
async function getScripts(req, res) {
  if (!Script) {
    return res.status(503).json({ success: false, error: 'Database not connected.' });
  }
  try {
    const scripts = await Script.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, data: scripts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * DELETE /api/saved/:id  - Delete a saved script
 */
async function deleteScript(req, res) {
  if (!Script) {
    return res.status(503).json({ success: false, error: 'Database not connected.' });
  }
  try {
    await Script.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Script deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { saveScript, getScripts, deleteScript };
