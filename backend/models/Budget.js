const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["Income", "Expense"],
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Budget", budgetSchema);