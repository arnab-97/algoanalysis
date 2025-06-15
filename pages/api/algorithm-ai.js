export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=AIzaSyDsE0WjhNhoHAo5erArhxIBhs3EKSA4QjQ', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an expert Algorithm AI Assistant specialized in helping users understand algorithms, data structures, and computer science concepts. Your role is to:

1. Explain algorithms clearly with step-by-step breakdowns
2. Analyze time and space complexity
3. Provide code examples when helpful
4. Help debug algorithmic problems
5. Compare different algorithmic approaches
6. Explain when to use specific algorithms
7. Break down complex concepts into simple terms

Guidelines:
- Be concise but thorough
- Use examples to illustrate concepts
- Explain complexity analysis clearly
- Provide practical insights
- Use formatting like **bold** for emphasis and \`code\` for code snippets
- Keep responses focused on algorithms and computer science

User question: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      details: error.message 
    });
  }
}