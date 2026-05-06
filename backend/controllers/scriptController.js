const { generateScript } = require('./openaiService');

async function generate(req, res) {
  try {
    const { topic, tone = 'professional', length = 'medium', audience } = req.body;

    // Validation
    if (!topic || topic.trim().length < 3) {
      return res.status(400).json({
        success: false,
        error: 'Topic is required (minimum 3 characters).',
      });
    }

   if (!process.env.GROQ_API_KEY) {
      return res.status(503).json({
        success: false,
        error: 'Groq API key not configured. Please add your key to the .env file.',
      });
    }

    console.log(`Generating script for: "${topic}" | tone: ${tone} | length: ${length}`);

    const script = await generateScript({ topic, tone, length, audience });

    res.status(200).json({
      success: true,
      data: script,
    });

  } catch (err) {
    console.error('Script generation error:', err.message);
    res.status(500).json({
      success: false,
      error: 'Failed to generate script. Please try again.',
    });
  }
}

module.exports = { generate };
