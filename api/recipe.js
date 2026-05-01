export default async function handler(req, res) {
  try {
    console.log("Request body:", req.body);

    const { ingredients } = req.body;

    if (!ingredients) {
      return res.status(400).json({
        error: "No ingredients received",
        body: req.body
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
            role: "user",
            content: `Create a recipe using: ${ingredients}`
          }
        ]
      })
    });

    const data = await response.json();

    console.log("OpenAI response:", data);

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({
        error: "OpenAI failed",
        raw: data
      });
    }

    res.status(200).json({
      recipe: data.choices[0].message.content
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Server error",
      message: err.message
    });
  }
}
