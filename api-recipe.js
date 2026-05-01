export default async function handler(req, res) {
  try {
    const { ingredients } = req.body;

    if (!ingredients) {
      return res.status(400).json({ error: "No ingredients provided" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `
You are a cooking assistant.

Create a simple recipe using:
${ingredients}

Assume salt, pepper, oil, and basic spices are available.

Return:
- Recipe name
- Ingredients list
- Step-by-step instructions
            `
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    const output = data?.choices?.[0]?.message?.content;

    if (!output) {
      return res.status(500).json({
        error: "No response from AI",
        raw: data
      });
    }

    res.status(200).json({ recipe: output });

  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
}
