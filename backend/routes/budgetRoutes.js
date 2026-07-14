const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
    createBudget,
    getBudgets,
    updateBudget,
    deleteBudget,
    getBudgetSummary
} = require("../controllers/budgetController");

router.post("/", protect, createBudget);
router.get("/summary", protect, getBudgetSummary);
router.get("/", protect, getBudgets);
router.put("/:id", protect, updateBudget);
router.delete("/:id", protect, deleteBudget);
module.exports = router;