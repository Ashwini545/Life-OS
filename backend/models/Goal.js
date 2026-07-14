const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    status: {
        type: String,
        default: "Pending"
    },
    targetValue: {
  type: Number,
  default: 100,
},

currentValue: {
  type: Number,
  default: 0,
},
},
{
    timestamps: true
});

module.exports = mongoose.model("Goal", goalSchema);