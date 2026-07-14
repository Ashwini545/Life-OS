const Journal = require("../models/Journal");

// Create Journal
const createJournal = async (req, res) => {
    try {
        const { title, content, mood } = req.body;

const journal = new Journal({
    userId: req.user.id,
    title,
    content,
    mood
});

        await journal.save();

        res.status(201).json({
            message: "Journal Created Successfully",
            journal
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Get All Journals
const getJournals = async (req, res) => {
    try {
        const journals = await Journal.find({
            userId: req.user.id
        });

        res.status(200).json(journals);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};
const getMoodStats = async (req, res) => {
  try {
    const journals = await Journal.find({
      userId: req.user.id,
    });

    let happy = 0;
    let neutral = 0;
    let sad = 0;

    journals.forEach((journal) => {
      if (journal.mood === "Happy") happy++;
      else if (journal.mood === "Neutral") neutral++;
      else if (journal.mood === "Sad") sad++;
    });

    res.status(200).json({
      happy,
      neutral,
      sad,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const updateJournal = async (req, res) => {
    try {

        const journal = await Journal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Journal Updated Successfully",
            journal
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
// Delete Journal
const deleteJournal = async (req, res) => {
    try {
        const { id } = req.params;

        await Journal.findByIdAndDelete(id);

        res.status(200).json({
            message: "Journal Deleted Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};
module.exports = {
  createJournal,
  getJournals,
  updateJournal,
  deleteJournal,
  getMoodStats,
};