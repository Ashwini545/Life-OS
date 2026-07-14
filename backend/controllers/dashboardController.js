const Goal = require("../models/Goal");
const Habit = require("../models/Habit");
const Journal = require("../models/Journal");
const Budget = require("../models/Budget");

const getDashboard = async (req, res) => {
    try {

        const userId = req.user.id;

        const totalGoals = await Goal.countDocuments({ userId });
        const completedGoals = await Goal.countDocuments({
  userId,
  status: "Completed",
});

const pendingGoals = await Goal.countDocuments({
  userId,
  status: { $ne: "Completed" },
});
        const totalHabits = await Habit.countDocuments({ userId });
        const habits = await Habit.find({ userId });

let longestStreak = 0;

habits.forEach((habit) => {
  if (habit.bestStreak > longestStreak) {
    longestStreak = habit.bestStreak;
  }
});
        const totalJournals = await Journal.countDocuments({ userId });

        const budgets = await Budget.find({ userId });

        let totalIncome = 0;
        let totalExpense = 0;

        budgets.forEach((item) => {
            if (item.type === "Income") {
                totalIncome += item.amount;
            } else {
                totalExpense += item.amount;
            }
        });

        const balance = totalIncome - totalExpense;

   res.status(200).json({
  totalGoals,
  completedGoals,
  pendingGoals,
  totalHabits,
  longestStreak,
  totalJournals,
  totalIncome,
  totalExpense,
  balance,
});

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    getDashboard
};