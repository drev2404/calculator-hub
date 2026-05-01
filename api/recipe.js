export default async function handler(req, res) {
  try {
    // ONLY allow POST
    if (req.method !== "POST") {
      return res.status(200).json({ ok: true, message: "API IS WORKING" });
    }

    const body = req.body || {};

    const ingredients =
      typeof body === "string"
        ? JSON.parse(body).ingredients
        : body.ingredients;

    if (!ingredients) {
      return res.status(400).json({ error: "No ingredients provided" });
    }

    return res.status(200).json({
      recipe: `TEST RECIPE WORKING: ${ingredients}`
    });

  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
}
