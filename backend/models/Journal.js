const mongoose = require("mongoose");
const journalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    title: String,

    mood: {
        type: String,
        enum: ["Happy", "Neutral", "Sad"],
        default: "Neutral"
    },

    content: String

}, {
    timestamps: true
});

module.exports = mongoose.model("Journal", journalSchema);