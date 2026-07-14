const Goal = require("../models/Goal");

const createGoal = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const {
  title,
  description,
  targetValue,
  currentValue,
} = req.body;

   const goal = new Goal({
  userId: req.user.id,
  title,
  description,
  targetValue,
  currentValue,
});

    console.log("Before Save");

    await goal.save();

    console.log("After Save");

    res.status(201).json({
      message: "Goal Created Successfully",
      goal,
    });
  } catch (error) {
    console.log("CREATE GOAL ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getGoals = async (req, res) => {
    try {

        const goals = await Goal.find({
  userId: req.user.id
});

const goalsWithProgress = goals.map((goal) => ({
  ...goal._doc,
  progress:
    goal.targetValue > 0
      ? (goal.currentValue / goal.targetValue) * 100
      : 0,
}));

res.status(200).json(goalsWithProgress);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Goal Updated Successfully",
      goal
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};
const deleteGoal = async (req, res) => {
    try {

        await Goal.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Goal Deleted Successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
const getGoalStats = async (req, res) => {
  try {
    const goals = await Goal.find({
      userId: req.user.id,
    });

    const totalGoals = goals.length;

    const completedGoals = goals.filter(
      (goal) => goal.status === "Completed"
    ).length;

    const pendingGoals = goals.filter(
      (goal) => goal.status !== "Completed"
    ).length;

    res.status(200).json({
      totalGoals,
      completedGoals,
      pendingGoals,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  getGoalStats,
};