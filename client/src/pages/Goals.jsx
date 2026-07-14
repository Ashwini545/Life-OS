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

function Goals() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [targetValue, setTargetValue] = useState(100);
const [currentValue, setCurrentValue] = useState(0);

  const token = localStorage.getItem("token");

  const fetchGoals = async () => {
    try {
      const res = await API.get("/goals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGoals(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const addGoal = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter goal title");
      return;
    }

    try {
      await API.post(
        "/goals",
        {
          title,
          description,
           targetValue,
            currentValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      setTargetValue(100);
setCurrentValue(0);

      fetchGoals();
    } catch (error) {
      console.log(error);
    }
  };

  const markCompleted = async (id) => {
    try {
      await API.put(
        `/goals/${id}`,
        {
          status: "Completed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchGoals();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await API.delete(`/goals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchGoals();
    } catch (error) {
      console.log(error);
    }
  };
  const startEdit = (goal) => {
  setEditId(goal._id);
  setEditTitle(goal.title);
  setEditDescription(goal.description);
};

const updateGoal = async () => {
  try {
    await API.put(
      `/goals/${editId}`,
      {
        title: editTitle,
        description: editDescription,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setEditId(null);
    setEditTitle("");
    setEditDescription("");

    fetchGoals();
  } catch (error) {
    console.log(error);
  }
};
const completedGoals = goals.filter(
  (goal) => goal.status === "Completed"
).length;

const pendingGoals = goals.filter(
  (goal) => goal.status !== "Completed"
).length;

const completionRate =
  goals.length > 0
    ? Math.round((completedGoals / goals.length) * 100)
    : 0;

const chartData = [
  {
    name: "Completed",
    value: completedGoals,
  },
  {
    name: "Pending",
    value: pendingGoals,
  },
];

const COLORS = ["#22c55e", "#eab308"];
  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          Goals
        </h1>

        <form
          onSubmit={addGoal}
           className="bg-slate-900 p-6 rounded-2xl mb-6 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Goal Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800 mb-4"
          />
          <textarea
            placeholder="Goal Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800 mb-4"
          />
          <input
  type="number"
  placeholder="Target Value"
  value={targetValue}
  onChange={(e) => setTargetValue(e.target.value)}
  className="w-full p-3 rounded-xl bg-slate-800 mb-4"
/>

<input
  type="number"
  placeholder="Current Value"
  value={currentValue}
  onChange={(e) => setCurrentValue(e.target.value)}
  className="w-full p-3 rounded-xl bg-slate-800 mb-4"
/>
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl"
          >
            Add Goal
          </button>
        </form>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
  <div className="bg-green-900 p-4 rounded-xl">
    <h2>Completed Goals</h2>
    <p className="text-3xl font-bold">
      {completedGoals}
    </p>
  </div>

  <div className="bg-yellow-900 p-4 rounded-xl">
    <h2>Pending Goals</h2>
    <p className="text-3xl font-bold">
      {pendingGoals}
    </p>
  </div>

  <div className="bg-cyan-900 p-4 rounded-xl">
    <h2>Completion Rate</h2>
    <p className="text-3xl font-bold">
      {completionRate}%
    </p>
  </div>
</div>
        <div className="grid gap-4">
          {goals.map((goal) => (
            <div
              key={goal._id}
              className="bg-slate-900 p-5 rounded-2xl border border-slate-800"
            >
              <h2 className="text-xl font-bold text-cyan-400">
                {goal.title}
              </h2>
              <p className="text-slate-300 mt-2">
                {goal.description}
              </p>
              <div className="mt-4">
  <div className="flex justify-between text-sm mb-2">
    <span>Progress</span>
    <span>{Math.round(goal.progress || 0)}%</span>
  </div>

  <div className="w-full bg-slate-700 rounded-full h-3">
    <div
      className="bg-cyan-500 h-3 rounded-full"
      style={{
        width: `${goal.progress || 0}%`,
      }}
    ></div>
  </div>
</div>
              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
                  goal.status === "Completed"
                    ? "bg-green-500"
                    : "bg-yellow-500 text-black"
                }`}
              >
                {goal.status}
              </span>
             <div className="mt-4 flex gap-3">
  {goal.status !== "Completed" && (
    <button
      onClick={() => markCompleted(goal._id)}
      className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
    >
      Complete
    </button>
  )}

  <button
    onClick={() => startEdit(goal)}
    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
  >
    Edit
  </button>

  <button
    onClick={() => deleteGoal(goal._id)}
    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
  >
    Delete
  </button>
</div>
            </div>
          ))}
        </div>

        {editId && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
    <div className="bg-slate-900 p-6 rounded-2xl w-[500px] border border-slate-700">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">
        Edit Goal
      </h2>

      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="w-full p-3 rounded-xl bg-slate-800 mb-4"
      />

      <textarea
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        className="w-full p-3 rounded-xl bg-slate-800 mb-4"
      />

      <div className="flex gap-3">
        <button
          onClick={updateGoal}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
        >
          Save Changes
        </button>

        <button
          onClick={() => setEditId(null)}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
<div className="bg-slate-900 p-6 rounded-2xl mb-6">
  <h2 className="text-2xl font-bold text-cyan-400 mb-4">
    Goal Analytics
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
      </div>
    </div>
  );
}

export default Goals;