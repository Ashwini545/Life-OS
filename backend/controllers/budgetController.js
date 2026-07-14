const Budget = require("../models/Budget");

// Create Budget Entry
const createBudget = async (req, res) => {
    try {
        const { title, amount, type } = req.body;

        const budget = new Budget({
            userId: req.user.id,
            title,
            amount,
            type
        });

        await budget.save();

        res.status(201).json({
            message: "Budget Entry Created Successfully",
            budget
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Get All Budget Entries
const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({
            userId: req.user.id
        });

        res.status(200).json(budgets);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Delete Budget Entry
const deleteBudget = async (req, res) => {
    try {
        await Budget.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Budget Deleted Successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
const updateBudget = async (req, res) => {
    try {

        const budget = await Budget.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Budget Updated Successfully",
            budget
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
const getBudgetSummary = async (req, res) => {
    try {

        const budgets = await Budget.find({
            userId: req.user.id
        });

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
            totalIncome,
            totalExpense,
            balance
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    createBudget,
    getBudgets,
    updateBudget,
    deleteBudget,
    getBudgetSummary
};