export default async function handler(req, res) {
  try {
    const body = req.body || {};
    const ingredients = body.ingredients;

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
            role: "system",
            content: "You are a helpful cooking assistant that creates simple recipes."
          },
          {
            role: "user",
            content: `Create a recipe using: ${ingredients}. Include name, ingredients, and steps.`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const output = data?.choices?.[0]?.message?.content;

    return res.status(200).json({
      recipe: output || "No recipe generated"
    });

  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      details: err.message
    });
  }
}
