export default async function handler(req, res) {
  try {
    const { ingredients } = req.body;

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
Create a simple recipe using:
${ingredients}

Assume salt, pepper, oil, and basic spices are available.

Return:
- recipe name
- ingredients
- step-by-step instructions
            `
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      recipe: data.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
