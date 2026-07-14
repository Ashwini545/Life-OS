import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function Dashboard() {
const [stats, setStats] = useState({
  totalGoals: 0,
  completedGoals: 0,
  pendingGoals: 0,
  totalHabits: 0,
  longestStreak: 0,
  totalJournals: 0,
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
});

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);
return (
  <div className="flex bg-slate-950 text-white">
    <Sidebar />

   <div className="flex-1 p-4 md:p-8">
      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Life OS Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Goals */}
        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-slate-400">Goals</h2>
          <p className="text-3xl font-bold">{stats.totalGoals}</p>
        </div>

        {/* Habits */}
        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-slate-400">Habits</h2>
          <p className="text-3xl font-bold">{stats.totalHabits}</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-orange-500">
  <h2 className="text-orange-400">
    Longest Streak 🔥
  </h2>

  <p className="text-3xl font-bold">
    {stats.longestStreak}
  </p>
</div>

        {/* Journals */}
        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-slate-400">Journals</h2>
          <p className="text-3xl font-bold">{stats.totalJournals}</p>
        </div>
        {/* Completed Goals */}
<div className="bg-slate-900 p-6 rounded-2xl border border-green-500">
  <h2 className="text-green-400">Completed Goals</h2>
  <p className="text-3xl font-bold">
    {stats.completedGoals}
  </p>
</div>

{/* Pending Goals */}
<div className="bg-slate-900 p-6 rounded-2xl border border-yellow-500">
  <h2 className="text-yellow-400">Pending Goals</h2>
  <p className="text-3xl font-bold">
    {stats.pendingGoals}
  </p>
</div>

        {/* Income */}
        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-slate-400">Income</h2>
          <p className="text-3xl font-bold">₹{stats.totalIncome}</p>
        </div>

        {/* Expense */}
        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-slate-400">Expense</h2>
          <p className="text-3xl font-bold">₹{stats.totalExpense}</p>
        </div>

        {/* Balance */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-cyan-500">
          <h2 className="text-cyan-400">Balance</h2>
          <p className="text-3xl font-bold">₹{stats.balance}</p>
        </div>
      </div>
      
    </div>
  </div>
);
}

export default Dashboard;