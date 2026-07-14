const express = require("express");
const router = express.Router();

router.post("/coach", async (req, res) => {
  try {
    const { message } = req.body;

    let reply = "";

    if (
      message.toLowerCase().includes("goal")
    ) {
      reply =
        "Focus on one important goal and break it into smaller tasks.";
    } else if (
      message.toLowerCase().includes("habit")
    ) {
      reply =
        "Consistency is more important than intensity. Complete your habit daily.";
    } else if (
      message.toLowerCase().includes("budget")
    ) {
      reply =
        "Track expenses regularly and avoid unnecessary spending.";
    } else {
      reply =
        "Stay consistent and review your progress every day.";
    }

    res.json({
      reply,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;