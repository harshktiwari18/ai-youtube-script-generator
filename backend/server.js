// ============================================
// SCRIPTGENIE AI - Main Server (server.js)
// ============================================

const express = require('express');
const cors = require('cors');
//const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// ── Middleware ──────────────────────────────
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// ── Routes ──────────────────────────────────
const scriptRoutes = require('./routes/scriptRoutes');
const savedRoutes  = require('./routes/savedRoutes');

app.use('/api/scripts', scriptRoutes);
app.use('/api/saved',   savedRoutes);

// ── Health Check ────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'ScriptGenie AI Server is running!',
    timestamp: new Date().toISOString()
  });
});

// ── Catch-all: serve frontend ────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ── Start Server ─────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎬 ScriptGenie AI Server Running!`);
  console.log(`📡 Port     : http://localhost:${PORT}`);
  console.log(`🌍 Frontend : http://localhost:${PORT}`);
  console.log(`⚡ API Base : http://localhost:${PORT}/api\n`);
});

module.exports = app;
