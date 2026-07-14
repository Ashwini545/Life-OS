const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal,
    getGoalStats,
} = require("../controllers/goalController");

router.post("/", protect, createGoal);
router.get("/stats", protect, getGoalStats);
router.get("/", protect, getGoals);
router.put("/:id", protect, updateGoal);
router.delete("/:id", protect, deleteGoal);

module.exports = router;