require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const authRoutes = require("./routes/authRoutes");
const goalRoutes = require("./routes/goalRoutes");
const habitRoutes = require("./routes/habitRoutes");
const journalRoutes = require("./routes/journalRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const calendarRoutes = require("./routes/calendarRoutes");
const aiRoutes = require("./routes/aiRoutes");
const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/ai", aiRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Connection Error:");
    console.log(err);
});

// Test Route
app.get("/", (req, res) => {
    res.send("Life OS Backend Running");
});

// Server Start
app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
});


