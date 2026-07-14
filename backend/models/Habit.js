const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    habitName: {
        type: String,
        required: true
    },

    frequency: {
        type: String,
        default: "Daily"
    },

    streak: {
        type: Number,
        default: 0
    },
    bestStreak: {
    type: Number,
    default: 0
},

lastCompletedDate: {
    type: Date,
    default: null
},

    completedDates: {
        type: [Date],
        default: []
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Habit", habitSchema);