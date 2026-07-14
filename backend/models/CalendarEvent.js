const mongoose = require("mongoose");

const calendarEventSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  title: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    required: true
  }
},
{
  timestamps: true
});

module.exports = mongoose.model(
  "CalendarEvent",
  calendarEventSchema
);