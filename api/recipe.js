export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ message: "API IS WORKING" });
  }

  try {
    const { ingredients } = req.body;

    if (!ingredients) {
      return res.status(400).json({
        error: "Please enter ingredients"
      });
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
            role: "system",
            content: "You are a cooking assistant. Generate practical recipes using available ingredients."
          },
          {
            role: "user",
            content: `Create a recipe using: ${ingredients}. Assume salt, pepper, oil, and basic spices are available. Return:
            
Recipe Name

Ingredients

Step-by-step instructions`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!data.choices?.[0]?.message?.content) {
      return res.status(500).json({
        error: "OpenAI returned no recipe",
        raw: data
      });
    }

    return res.status(200).json({
      recipe: data.choices[0].message.content
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
