const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
    createJournal,
    getJournals,
    deleteJournal,
    updateJournal,
    getMoodStats,
} = require("../controllers/journalController");

router.post("/", protect, createJournal);
router.get("/", protect, getJournals);
router.get("/mood-stats", protect, getMoodStats);
router.delete("/:id", protect, deleteJournal);
router.put("/:id", protect, updateJournal);
module.exports = router;