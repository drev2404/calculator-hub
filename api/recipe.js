module.exports = async function handler(req, res) {
  try {
    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const { ingredients } = body || {};

    console.log("Incoming:", ingredients);

    if (!ingredients) {
      return res.status(400).json({ error: "No ingredients provided" });
    }

    return res.status(200).json({
      recipe: `TEST WORKING → ${ingredients}`
    });

  } catch (error) {
    console.log("SERVER ERROR:", error);

    return res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
};
