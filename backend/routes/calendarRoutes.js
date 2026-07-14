const express = require("express");
const router = express.Router();

const protect =
require("../middlewares/authMiddleware");

const {
  createEvent,
  getEvents,
  deleteEvent
} = require(
  "../controllers/calendarController"
);

router.post("/", protect, createEvent);

router.get("/", protect, getEvents);

router.delete("/:id", protect, deleteEvent);

module.exports = router;