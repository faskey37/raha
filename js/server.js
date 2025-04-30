// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rate limiting (15 requests per minute)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15
});
app.use('/api/ai', limiter);

// Gemini Proxy Endpoint
app.post('/api/ai/query', async (req, res) => {
  try {
    const { prompt, context } = req.body;
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{ text: buildPrompt(prompt, context) }]
        }],
        safetySettings: [
          {
            category: "HARM_CATEGORY_MEDICAL",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'AI service unavailable' });
  }
});

function buildPrompt(userPrompt, userContext) {
  return `You are a medical assistant AI in a healthcare app. The user profile is:
  ${JSON.stringify(userContext || {})}
  
  Respond to this query: "${userPrompt}"
  
  Guidelines:
  - Be concise (under 150 words)
  - Provide only evidence-based information
  - Always recommend consulting a doctor
  - Never diagnose or prescribe medication
  - Format responses with clear headings and bullet points when appropriate`;
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));