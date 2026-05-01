module.exports = async function handler(req, res) {
  try {
    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const { ingredients } = body || {};

    if (!ingredients) {
      return res.status(400).json({ error: "No ingredients provided" });
    }

    res.status(200).json({
      recipe: `Received ingredients: ${ingredients}`
    });

  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
};
