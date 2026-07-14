import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function Habits() {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("Daily");

  const token = localStorage.getItem("token");

  const fetchHabits = async () => {
    try {
      const res = await API.get("/habits", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHabits(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const addHabit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/habits",
        {
          habitName,
          frequency,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHabitName("");
      setFrequency("Daily");

      fetchHabits();
    } catch (error) {
      console.log(error);
    }
  };
  const completeHabit = async (id) => {
  try {
    await API.post(
      `/habits/${id}/complete`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchHabits();
  } catch (error) {
    console.log(error);

    if (error.response?.data?.message) {
      alert(error.response.data.message);
    }
  }
};
const deleteHabit = async (id) => {
  try {
    await API.delete(`/habits/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchHabits();
  } catch (error) {
    console.log(error);
  }
};
const totalHabits = habits.length;

const completedToday = habits.filter(
  (habit) =>
    habit.completedDates &&
    habit.completedDates.length > 0
).length;

const longestStreak =
  habits.length > 0
    ? Math.max(...habits.map((h) => h.streak))
    : 0;
const completedHabits = habits.filter(
  (habit) => habit.streak > 0
).length;

const notCompletedHabits =
  habits.length - completedHabits;

const chartData = [
  {
    name: "Completed",
    value: completedHabits,
  },
  {
    name: "Not Completed",
    value: notCompletedHabits,
  },
];

const COLORS = ["#22c55e", "#ef4444"];
  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          Habits
        </h1>

        <form
          onSubmit={addHabit}
          className="bg-slate-900 p-6 rounded-2xl mb-6"
        >
          <input
            type="text"
            placeholder="Habit Name"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800 mb-4"
          />

          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800 mb-4"
          >
            <option>Daily</option>
            <option>Weekly</option>
          </select>

          <button
            type="submit"
            className="bg-cyan-500 px-5 py-3 rounded-xl"
          >
            Add Habit
          </button>
        </form>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
  <div className="bg-cyan-900 p-4 rounded-xl">
    <h2>Total Habits</h2>
    <p className="text-3xl font-bold">
      {totalHabits}
    </p>
  </div>

  <div className="bg-green-900 p-4 rounded-xl">
    <h2>Completed Today</h2>
    <p className="text-3xl font-bold">
      {completedToday}
    </p>
  </div>

  <div className="bg-orange-900 p-4 rounded-xl">
    <h2>Longest Streak 🔥</h2>
    <p className="text-3xl font-bold">
      {longestStreak}
    </p>
  </div>
</div>
<div className="bg-slate-900 p-6 rounded-2xl mb-6">
  <h2 className="text-2xl font-bold text-cyan-400 mb-4">
    Habit Analytics
  </h2>

  <PieChart width={400} height={300}>
    <Pie
      data={chartData}
      cx="50%"
      cy="50%"
      outerRadius={100}
      dataKey="value"
      label
    >
      {chartData.map((entry, index) => (
        <Cell
          key={index}
          fill={COLORS[index]}
        />
      ))}
    </Pie>

    <Tooltip />
    <Legend />
  </PieChart>
</div>
        <div className="grid gap-4">
          {habits.map((habit) => (
            <div
              key={habit._id}
              className="bg-slate-900 p-5 rounded-2xl"
            >
              <h2 className="text-xl font-bold text-cyan-400">
                {habit.habitName}
              </h2>

              <p className="text-slate-300 mt-2">
                Frequency: {habit.frequency}
              </p>

              <p className="mt-2">
                🔥 Current Streak: {habit.streak}
              </p>

              <p>
                🏆 Best Streak: {habit.bestStreak}
              </p>
              <div className="mt-4 flex gap-3">
  <button
    onClick={() => completeHabit(habit._id)}
    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
  >
    Complete Today
  </button>

  <button
    onClick={() => deleteHabit(habit._id)}
    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
  >
    Delete
  </button>
</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Habits;