# 🎬 ScriptGenie AI — YouTube Script Generator

> **AI-powered full-stack tool that converts any topic into a complete, ready-to-record YouTube script in seconds.**

---

## 📋 TABLE OF CONTENTS

1. [Project Overview](#-project-overview)
2. [Features](#-features)
3. [Tech Stack](#-tech-stack)
4. [Project Structure](#-project-structure)
5. [Installation & Setup](#-installation--setup)
6. [How to Get OpenAI API Key](#-how-to-get-openai-api-key)
7. [API Documentation](#-api-documentation)
8. [Frontend Guide](#-frontend-guide)
9. [MongoDB Setup (Optional)](#-mongodb-setup-optional)
10. [How the AI Prompt Works](#-how-the-ai-prompt-works)
11. [Common Errors & Fixes](#-common-errors--fixes)
12. [Project Flow Diagram](#-project-flow-diagram)

---

## 🚀 Project Overview

**ScriptGenie AI** is a full-stack web application that uses the OpenAI GPT API to generate complete, professional YouTube scripts from a single topic input.

**In one line:** "Type a topic → Get a ready-to-use YouTube script (Hook + Intro + Content + CTA)"

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🎣 **Hook Generator** | Attention-grabbing opening lines |
| 🎬 **Full Script** | Structured Intro + Main Content sections |
| 🔥 **CTA Generator** | Call-to-action to grow channel |
| 🎭 **6 Tone Options** | Professional, Funny, Storytelling, Motivational, Educational, Casual |
| ⏱️ **3 Length Options** | Shorts (60s), Standard (5-7min), Long Form (10-15min) |
| 💡 **Title Suggestions** | 5 YouTube title ideas per script |
| 🏷️ **Tags & Description** | SEO-ready video metadata |
| 📋 **Copy & Download** | One-click copy or .txt download |
| 💾 **Save to Library** | MongoDB-powered script library |

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** — Structure
- **CSS3** — Custom dark theme with animations
- **Vanilla JavaScript** — API calls, dynamic rendering, clipboard
- **Google Fonts** — Syne (headings) + DM Sans (body)

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — Web framework & REST API
- **dotenv** — Environment variable management
- **cors** — Cross-Origin Resource Sharing

### AI
- **OpenAI API** — GPT-3.5-turbo model
- **Structured JSON prompting** — Returns script as parseable JSON

### Database (Optional)
- **MongoDB** — Store & retrieve scripts
- **Mongoose** — MongoDB object modeling

---

## 📁 Project Structure

```
scriptgenie/
├── frontend/
│   ├── index.html          ← Main UI (single page)
│   ├── style.css           ← Dark editorial theme
│   └── app.js              ← Frontend logic (API calls, rendering)
│
├── backend/
│   ├── server.js           ← Express server entry point
│   ├── package.json        ← Dependencies
│   ├── .env.example        ← Environment template
│   │
│   ├── routes/
│   │   ├── scriptRoutes.js ← POST /api/scripts/generate
│   │   └── savedRoutes.js  ← GET/POST/DELETE /api/saved
│   │
│   ├── controllers/
│   │   ├── scriptController.js  ← Validates input, calls AI
│   │   ├── openaiService.js     ← Builds prompt, calls OpenAI
│   │   └── savedController.js  ← MongoDB CRUD operations
│   │
│   └── models/
│       └── Script.js       ← Mongoose schema for saved scripts
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Step 1 — Prerequisites

Make sure you have installed:
- **Node.js** v18 or higher → https://nodejs.org
- **npm** (comes with Node.js)
- **Git** (optional)

Check versions:
```bash
node -v    # Should show v18+
npm -v     # Should show 9+
```

---

### Step 2 — Clone / Download Project

```bash
# If using git:
git clone <your-repo-url>
cd scriptgenie

# Or just unzip the downloaded scriptgenie.zip
cd scriptgenie
```

---

### Step 3 — Install Backend Dependencies

```bash
cd backend
npm install
```

This installs: express, cors, dotenv, openai, mongoose, nodemon

---

### Step 4 — Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Open .env and add your OpenAI API key
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx
PORT=5000
```

⚠️ **Never commit your .env file to GitHub!**

---

### Step 5 — Start the Server

```bash
# Development mode (auto-restart on file changes)
npm run dev

# OR production mode
npm start
```

You should see:
```
🎬 ScriptGenie AI Server Running!
📡 Port     : http://localhost:5000
🌍 Frontend : http://localhost:5000
⚡ API Base : http://localhost:5000/api
```

---

### Step 6 — Open in Browser

Go to: **http://localhost:5000**

The Express server serves your frontend files from the `/frontend` folder automatically.

---

## 🔑 How to Get OpenAI API Key

1. Go to **https://platform.openai.com**
2. Sign up / Log in
3. Click your profile → **API Keys**
4. Click **"Create new secret key"**
5. Copy the key (starts with `sk-`)
6. Paste it in `backend/.env` as `OPENAI_API_KEY=sk-...`

> ⚠️ OpenAI API is paid. You get $5 free credit on new accounts.
> GPT-3.5-turbo costs ~$0.002 per script generation.

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

---

### POST `/api/scripts/generate`
Generate a YouTube script using AI.

**Request Body:**
```json
{
  "topic": "How to learn Python in 30 days",
  "tone": "professional",
  "length": "medium",
  "audience": "beginners"
}
```

**Parameters:**
| Field | Type | Required | Options |
|-------|------|----------|---------|
| topic | string | ✅ Yes | Any text (3-200 chars) |
| tone | string | No | professional, funny, storytelling, motivational, educational, casual |
| length | string | No | shorts, medium, long |
| audience | string | No | beginners, intermediate, advanced, general, students, entrepreneurs |

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "hook": "What if I told you...",
    "intro": "Hey everyone! Welcome back...",
    "mainContent": [
      { "section": "Why Python?", "content": "Python is..." },
      { "section": "Day 1-10: Basics", "content": "Start with..." }
    ],
    "cta": "If this helped you...",
    "title": "1. How to Learn Python...\n2. Python for Beginners...",
    "tags": ["python", "programming", "beginners"],
    "description": "In this video...",
    "topic": "How to learn Python in 30 days",
    "tone": "professional",
    "length": "medium",
    "generatedAt": "2024-01-01T00:00:00.000Z",
    "tokensUsed": 980
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Topic is required (minimum 3 characters)."
}
```

---

### GET `/api/saved`
Get all saved scripts from MongoDB.

**Response:**
```json
{
  "success": true,
  "data": [ ...array of saved scripts... ]
}
```

---

### POST `/api/saved`
Save a generated script to MongoDB.

**Request Body:** Full script object from `/generate` response.

---

### DELETE `/api/saved/:id`
Delete a saved script by MongoDB ID.

---

### GET `/api/health`
Check if server is running.

```json
{
  "status": "OK",
  "message": "ScriptGenie AI Server is running!",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## 🎨 Frontend Guide

### Files:
- **index.html** — All UI sections: Header, Hero, Generator, How It Works, Saved Scripts, Footer
- **style.css** — Dark theme with CSS variables. Customize `:root` variables for colors
- **app.js** — All JavaScript: API calls, rendering, copy/download, tabs

### Key Functions in app.js:

```javascript
generateScript()   // Called on button click — sends API request
renderScript(data) // Renders the result HTML into the output panel
switchTab(tab)     // Switches between Script / Meta / Titles tabs
copyAll()          // Copies entire script to clipboard
downloadScript()   // Downloads script as .txt file
saveScript()       // Saves to MongoDB via API
loadSavedScripts() // Loads saved scripts from MongoDB on page load
```

### Customizing Colors:
Edit these variables in `style.css`:
```css
:root {
  --red:    #ff3b30;  /* Primary accent */
  --orange: #ff6b35;  /* Secondary accent */
  --bg:     #0a0a0b;  /* Background */
  --bg3:    #18181d;  /* Card background */
}
```

---

## 🗄️ MongoDB Setup (Optional)

MongoDB is optional. The app works without it (just can't save scripts).

### Option A — MongoDB Atlas (Cloud, Free)

1. Go to **https://mongodb.com/atlas**
2. Create free account
3. Create a free M0 cluster
4. Get your connection string:
   `mongodb+srv://username:password@cluster.mongodb.net/scriptgenie`
5. Add to `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/scriptgenie
   ```

### Option B — Local MongoDB

1. Install MongoDB Community: https://www.mongodb.com/try/download/community
2. Start MongoDB: `mongod`
3. In `.env`: `MONGODB_URI=mongodb://localhost:27017/scriptgenie`

### Enable MongoDB in server.js

Uncomment these lines in `server.js`:
```javascript
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));
```

---

## 🤖 How the AI Prompt Works

The prompt is in `backend/controllers/openaiService.js`:

```
Act like a professional YouTube script writer...

Topic    : {topic}
Tone     : {tone}
Length   : {length guide}
Audience : {audience}

Generate the script in JSON format:
{
  "hook": "...",
  "intro": "...",
  "mainContent": [...],
  "cta": "...",
  "title": "...",
  "tags": [...],
  "description": "..."
}
```

**Why JSON output?** So the frontend can parse and render each section separately (Hook, Intro, CTA, etc.) with different colors and styling.

**Temperature: 0.8** — High enough for creativity, low enough for structure.

---

## 🐛 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Invalid OpenAI API key` | Wrong key in .env | Get new key from platform.openai.com |
| `OpenAI quota exceeded` | No billing set up | Add payment at platform.openai.com/billing |
| `Rate limit reached` | Too many requests | Wait 1 minute and retry |
| `Cannot find module 'express'` | npm install not run | Run `cd backend && npm install` |
| `Port 5000 already in use` | Another app using port | Change PORT in .env to 3000 or 8000 |
| `MongoDB not connected` | No MongoDB URI | Script saving is disabled, generation still works |

---

## 📊 Project Flow Diagram

```
User Types Topic
      │
      ▼
Frontend (app.js)
  - Validates input
  - Sends POST to /api/scripts/generate
      │
      ▼
Backend (scriptController.js)
  - Validates topic length
  - Checks API key exists
      │
      ▼
openaiService.js
  - Builds structured prompt
  - Calls OpenAI GPT-3.5-turbo
  - Receives JSON response
  - Parses and returns
      │
      ▼
Frontend (renderScript)
  - Displays Hook, Intro, Main Content, CTA
  - Shows Meta tab (tags, description)
  - Shows Titles tab (5 suggestions)
      │
      ▼
User Actions
  - Copy All → Clipboard
  - Download → .txt file
  - Save → MongoDB
```

---

## 🎯 Next Level Features to Add

- [ ] **User Authentication** — Login with Google/Email
- [ ] **Script History** — Per-user script library
- [ ] **Export to PDF** — Download as formatted PDF
- [ ] **Export to Google Docs** — One-click to Google Drive
- [ ] **Thumbnail Ideas** — AI generates thumbnail concepts
- [ ] **SEO Score** — Rate the script for YouTube SEO
- [ ] **Multi-language** — Generate scripts in Hindi, Spanish, etc.
- [ ] **Voice Preview** — Text-to-Speech demo of the script

---

## 📦 Package Summary

```json
{
  "dependencies": {
    "express":   "^4.19.2",   // Web server & routing
    "cors":      "^2.8.5",    // Allow frontend to call backend
    "dotenv":    "^16.4.5",   // Load .env variables
    "openai":    "^4.52.7",   // OpenAI GPT API client
    "mongoose":  "^8.4.0"     // MongoDB object modeling
  },
  "devDependencies": {
    "nodemon":   "^3.1.4"     // Auto-restart on code changes
  }
}
```

---

## 👨‍💻 Built With

- **ScriptGenie AI** by SCRIPTGENIE AI
- Powered by **OpenAI GPT-3.5-turbo**
- Backend: **Node.js + Express**
- Frontend: **HTML + CSS + Vanilla JS**
- Database: **MongoDB + Mongoose**

---

*Happy scripting! 🎬✨*
