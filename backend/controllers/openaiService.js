const Groq = require('groq-sdk');

function buildPrompt({ topic, tone, length, audience }) {
  const lengthGuide = {
    shorts: '60 seconds (around 150 words)',
    medium: '5-7 minutes (around 800-1000 words)',
    long:   '10-15 minutes (around 1500-2000 words)',
  };

  return `
Act like a professional YouTube script writer with 10+ years of experience.

Topic    : ${topic}
Tone     : ${tone}
Length   : ${lengthGuide[length] || lengthGuide['medium']}
Audience : ${audience || 'General audience'}

Respond ONLY in this exact JSON format. No markdown. Pure JSON only:

{
  "hook": "Attention-grabbing opening line",
  "intro": "Warm introduction (30-45 seconds)",
  "mainContent": [
    { "section": "Section Title", "content": "Detailed content" }
  ],
  "cta": "Call to action at the end",
  "title": "5 suggested YouTube video titles",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "description": "2-3 sentence YouTube description with keywords"
}`;
}

async function generateScript(scriptData) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prompt = buildPrompt(scriptData);

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: 'You are an expert YouTube script writer. Always respond with valid JSON only. No markdown, no extra text.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 2000,
    temperature: 0.8,
  });

  const raw = response.choices[0].message.content.trim();
  const clean = raw.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(clean);
  } catch {
    parsed = {
      hook: 'Error parsing AI response.',
      intro: raw,
      mainContent: [],
      cta: '',
      title: '',
      tags: [],
      description: '',
    };
  }

  return {
    ...parsed,
    title: Array.isArray(parsed.title)
    ? parsed.title.join('\n')
    : parsed.title || '',
    topic: scriptData.topic,
    tone: scriptData.tone,
    length: scriptData.length,
    generatedAt: new Date().toISOString(),
  };
}

module.exports = { generateScript };
