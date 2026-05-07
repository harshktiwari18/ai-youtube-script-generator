# 🎬 ScriptGenie AI — YouTube Script Generator

> **AI-powered full-stack tool that converts any topic into a complete, ready-to-record YouTube script in seconds.**
> **Powered by Groq API + LLaMA 3 (Free & Ultra-Fast)**

---

## 📋 TABLE OF CONTENTS

1. [Project Overview](#-project-overview)
2. [What Changed from Original](#-what-changed-from-original)
3. [Features](#-features)
4. [Tech Stack](#-tech-stack)
5. [Team & Roles](#-team--roles)
6. [Project Structure](#-project-structure)
7. [Installation & Setup](#-installation--setup)
8. [How to Get Groq API Key](#-how-to-get-groq-api-key)
9. [API Documentation](#-api-documentation)
10. [MongoDB Setup](#-mongodb-setup)
11. [How the AI Prompt Works](#-how-the-ai-prompt-works)
12. [Common Errors & Fixes](#-common-errors--fixes)
13. [Project Flow Diagram](#-project-flow-diagram)
14. [Deployment (Render)](#-deployment-render)
15. [Future Scope](#-future-scope)

---

## 🚀 Project Overview

**ScriptGenie AI** is a full-stack web application that uses the **Groq API with LLaMA 3** to generate complete, professional YouTube scripts from a single topic input.

**In one line:** "Type a topic → Get a ready-to-use YouTube script (Hook + Intro + Content + CTA)"

---

## 🔄 What Changed from Original

| Component | Before | After |
|-----------|--------|-------|
| **AI Provider** | OpenAI GPT-3.5-turbo | **Groq API + LLaMA 3** |
| **API Key** | `OPENAI_API_KEY` | **`GROQ_API_KEY`** |
| **Cost** | Paid ($0.002/script) | **FREE (14,400 req/day)** |
| **Speed** | ~3-5 seconds | **~1-2 seconds (ultra-fast)** |
| **Package** | `openai` npm package | **`groq-sdk` npm package** |
| **Model** | `gpt-3.5-turbo` | **`llama3-8b-8192`** |
| **MongoDB** | Optional (manual setup) | **Connected via Atlas** |
| **server.js** | No DB connection | **Auto-connects MongoDB** |
| **Port** | 5000 | **5001** |

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
| 💾 **Save to Library** | MongoDB Atlas-powered script library |
| ⚡ **Ultra-Fast** | Groq + LLaMA 3 generates in ~1-2 seconds |

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
- **mongoose** — MongoDB object modeling

### AI ⚡ (Updated)
- **Groq API** — Ultra-fast AI inference (FREE tier)
- **LLaMA 3 (llama3-8b-8192)** — Open-source language model
- **Structured JSON prompting** — Returns script as parseable JSON

### Database
- **MongoDB Atlas** — Cloud database (Free M0 tier)
- **Mongoose** — MongoDB object modeling

---

## 👥 Team & Roles

| Member | Role | Responsibilities |
|--------|------|-----------------|
| **Kumar Harsh** | Project Lead & Frontend Dev | UI/UX, HTML/CSS/JS, architecture, coordination |
| **Rishav** | Backend Developer | Node.js, Express.js, API routes, server logic |
| **Ayush Kumar** | AI Integration Engineer | Groq API, LLaMA 3, prompt engineering |
| **Riya Tiwary** | Database Engineer | MongoDB Atlas setup, schema design, data management |
| **Riya Kumari** | UI Designer | Visual design, color system, component styling |
| **Dashrath Kumar Roy** | QA & Testing | Testing, bug reporting, quality assurance, docs |
| **Nirmal Debsingha** | DevOps & Deployment | Render deployment, environment config, monitoring |

---

## 📁 Project Structure

```
scriptgenie/
├── frontend/
│   ├── index.html           ← Main UI (single page)
│   ├── style.css            ← Dark editorial theme
│   └── app.js               ← Frontend logic (API calls, rendering)
│
├── backend/
│   ├── server.js            ← Express server + MongoDB connection
│   ├── package.json         ← Dependencies (now includes groq-sdk)
│   ├── .env                 ← Your API keys (never commit this!)
│   ├── .env.example         ← Environment template
│   │
│   ├── routes/
│   │   ├── scriptRoutes.js  ← POST /api/scripts/generate
│   │   └── savedRoutes.js   ← GET/POST/DELETE /api/saved
│   │
│   ├── controllers/
│   │   ├── scriptController.js  ← Validates input, calls Groq AI
│   │   ├── openaiService.js     ← Builds prompt, calls Groq API ⚡
│   │   └── savedController.js  ← MongoDB CRUD operations
│   │
│   └── models/
│       └── Script.js        ← Mongoose schema for saved scripts
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Step 1 — Prerequisites

```bash
node -v    # Should show v18+
npm -v     # Should show 9+
```

### Step 2 — Install Backend Dependencies

```bash
cd backend
npm install
```

This installs: `express`, `cors`, `dotenv`, `groq-sdk`, `mongoose`, `nodemon`

### Step 3 — Configure Environment Variables

Open `backend/.env` and fill in:

```env
GROQ_API_KEY=gsk_your_groq_key_here
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/scriptgenie?retryWrites=true&w=majority&appName=Cluster0
PORT=5001
NODE_ENV=development
```

### Step 4 — Start the Server

```bash
node server.js
```

You should see:
```
✅ MongoDB Connected Successfully!
🎬 ScriptGenie AI Server Running!
📡 Port     : http://localhost:5001
🌍 Frontend : http://localhost:5001
⚡ API Base : http://localhost:5001/api
```

### Step 5 — Open in Browser

Go to: **http://localhost:5001**

---

## 🔑 How to Get Groq API Key (FREE)

1. Go to **https://console.groq.com**
2. Sign up with Google or email (no credit card!)
3. Click **"API Keys"** in the left sidebar
4. Click **"Create API Key"**
5. Copy the key (starts with `gsk_`)
6. Paste it in `backend/.env` as `GROQ_API_KEY=gsk_...`

> ✅ Groq free tier: **14,400 requests/day** — more than enough for demos!

---

## 📡 API Documentation

### Base URL
```
http://localhost:5001/api
```

### POST `/api/scripts/generate`
Generate a YouTube script using Groq AI.

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
| audience | string | No | beginners, intermediate, advanced, students |

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "hook": "What if I told you...",
    "intro": "Hey everyone! Welcome back...",
    "mainContent": [
      { "section": "Why Python?", "content": "Python is..." }
    ],
    "cta": "If this helped you...",
    "title": "1. How to Learn Python...",
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

### GET `/api/saved` — Get all saved scripts
### POST `/api/saved` — Save a script to MongoDB
### DELETE `/api/saved/:id` — Delete a saved script
### GET `/api/health` — Server health check

---

## 🗄️ MongoDB Setup

### MongoDB Atlas (Cloud, Free M0)

1. Go to **https://mongodb.com/atlas** → Sign up free
2. Create cluster → Select **M0 FREE** → Region: **Mumbai (ap-south-1)**
3. Create database user (save password!)
4. Network Access → Allow from Anywhere (`0.0.0.0/0`)
5. Connect → Drivers → Node.js → Copy connection string
6. Replace `<password>` + add `/scriptgenie` as DB name:

```env
MONGODB_URI=mongodb+srv://yourUser:yourPass@cluster0.xxxxx.mongodb.net/scriptgenie?retryWrites=true&w=majority&appName=Cluster0
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

**Model:** `llama3-8b-8192` via Groq API
**Temperature:** `0.8` — Creative but structured
**Max Tokens:** `2000`

---

## 🐛 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Invalid Groq API key` | Wrong key in .env | Get new key from console.groq.com |
| `Rate limit reached` | Too many requests | Wait 1 min — 14,400/day free limit |
| `Cannot find module 'groq-sdk'` | Package not installed | Run `npm install groq-sdk` |
| `MongoDB not connected` | Wrong URI or password | Check .env MONGODB_URI |
| `Port 5001 already in use` | Port taken | Change PORT in .env |
| `Generation Failed` | API key missing in .env | Add GROQ_API_KEY to backend/.env |

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
  - Checks GROQ_API_KEY exists
      │
      ▼
openaiService.js  ⚡ (Groq + LLaMA 3)
  - Builds structured prompt
  - Calls Groq API (llama3-8b-8192)
  - Receives JSON response in ~1-2 seconds
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
  - Save → MongoDB Atlas
```

---

## 🚀 Deployment (Render)

1. Push to GitHub:
```bash
git init && git add . && git commit -m "ScriptGenie AI"
git remote add origin https://github.com/yourusername/scriptgenie.git
git push -u origin main
```

2. Go to **render.com** → New → Web Service → Connect GitHub repo

3. Settings:
```
Root Dir  : backend
Build Cmd : npm install
Start Cmd : node server.js
```

4. Add Environment Variables on Render:
```
GROQ_API_KEY  = gsk_your_key
MONGODB_URI   = mongodb+srv://...
PORT          = 5001
```

5. Deploy → Live at `https://scriptgenie-ai.onrender.com` 🎉

---

## 🎯 Future Scope

| Version | Feature |
|---------|---------|
| v2.0 | 🎙️ AI Voice Generation — Script to voiceover audio |
| v2.1 | 🌍 Multi-Language Support — 20+ languages |
| v2.2 | 🖼️ Thumbnail Generator — AI thumbnail creation |
| v3.0 | 📈 Video SEO Optimizer — Auto titles & tags |
| v3.1 | 📊 Analytics Dashboard — Script performance tracking |
| v3.2 | 🔗 Social Media Export — Twitter, Instagram, TikTok |

---

## 📦 Package Summary

```json
{
  "dependencies": {
    "express":    "^4.19.2",
    "cors":       "^2.8.5",
    "dotenv":     "^16.4.5",
    "groq-sdk":   "^0.9.0",
    "mongoose":   "^8.4.0"
  },
  "devDependencies": {
    "nodemon":    "^3.1.4"
  }
}
```

---

## 👨‍💻 Built With

- **ScriptGenie AI** by Team SCRIPTGENIE AI
- Powered by **Groq API + LLaMA 3 (llama3-8b-8192)**
- Backend: **Node.js + Express**
- Frontend: **HTML + CSS + Vanilla JS**
- Database: **MongoDB Atlas**

---

*Happy scripting! 🎬✨*
