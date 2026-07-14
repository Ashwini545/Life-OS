const Habit = require("../models/Habit");

const createHabit = async (req, res) => {
    try {
        const { habitName, frequency } = req.body;

        const habit = new Habit({
            userId: req.user.id,
            habitName,
            frequency
        });

        await habit.save();

        res.status(201).json({
            message: "Habit Created Successfully",
            habit
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
const getHabits = async (req, res) => {
    try {

        const habits = await Habit.find({
            userId: req.user.id
        });

        res.status(200).json(habits);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
const updateHabit = async (req, res) => {
    try {

        const habit = await Habit.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Habit Updated Successfully",
            habit
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
const deleteHabit = async (req, res) => {
    try {

        await Habit.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Habit Deleted Successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
const completeHabit = async (req, res) => {
    try {

        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({
                message: "Habit Not Found"
            });
        }

        const today = new Date();

const lastDate = habit.lastCompletedDate;

if (lastDate) {
  const diffTime =
    today.getTime() - new Date(lastDate).getTime();

  const diffDays = Math.floor(
    diffTime / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 1) {
    habit.streak += 1;
  } else if (diffDays > 1) {
    habit.streak = 1;
  } else {
    return res.status(400).json({
      message: "Habit already completed today",
    });
  }
} else {
  habit.streak = 1;
}

if (habit.streak > habit.bestStreak) {
  habit.bestStreak = habit.streak;
}

habit.lastCompletedDate = today;

habit.completedDates.push(today);

await habit.save();

        res.status(200).json({
            message: "Habit Completed",
            habit
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
module.exports = {
    createHabit,
    getHabits,
    updateHabit,
    deleteHabit,
    completeHabit
};