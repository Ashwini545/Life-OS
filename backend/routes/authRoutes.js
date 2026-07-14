const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
    registerUser,
    loginUser,
    getProfile
} = require("../controllers/authController");
const {
    createGoal,
    getGoals
} = require("../controllers/goalController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.get("/", protect, getGoals);

module.exports = router;