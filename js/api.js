// api.js - This handles all API communications
const API_KEY = "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";

export async function queryAI(prompt, context = {}) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a medical assistant in a healthcare app. The user profile is: ${JSON.stringify(context)}. 
                      Provide only evidence-based health information. Never diagnose or prescribe. 
                      Always recommend consulting a doctor. Keep responses under 150 words.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI query error:", error);
    return "I'm having trouble connecting to the health assistant. Please try again later.";
  }
}