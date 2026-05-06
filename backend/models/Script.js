// ============================================
// SCRIPTGENIE AI - Script MongoDB Model
// models/Script.js
// ============================================

const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  section: String,
  content: String,
});

const ScriptSchema = new mongoose.Schema(
  {
    topic:       { type: String, required: true },
    tone:        { type: String, default: 'professional' },
    length:      { type: String, default: 'medium' },
    hook:        String,
    intro:       String,
    mainContent: [SectionSchema],
    cta:         String,
    title:       String,
    tags:        [String],
    description: String,
    tokensUsed:  Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Script', ScriptSchema);
