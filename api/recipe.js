export default async function handler(req, res) {
  try {
    return res.status(200).json({
      ok: true,
      message: "API IS WORKING",
      method: req.method
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
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
