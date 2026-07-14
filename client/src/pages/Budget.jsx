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

function Budget() {
  const [editId, setEditId] = useState(null);
const [editTitle, setEditTitle] = useState("");
const [editAmount, setEditAmount] = useState("");
const [editType, setEditType] = useState("Income");
  const [budgets, setBudgets] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Income");
  const [summary, setSummary] = useState({
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
});
const chartData = [
  {
    name: "Income",
    value: summary.totalIncome,
  },
  {
    name: "Expense",
    value: summary.totalExpense,
  },
];

const COLORS = ["#22c55e", "#ef4444"];

  const token = localStorage.getItem("token");

  const fetchBudgets = async () => {
    try {
      const res = await API.get("/budgets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBudgets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  fetchBudgets();
  fetchSummary();
}, []);
const fetchSummary = async () => {
  try {
    const res = await API.get("/budgets/summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSummary(res.data);
  } catch (error) {
    console.log(error);
  }
};
  const addBudget = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/budgets",
        {
          title,
          amount,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setAmount("");
      setType("Income");

      fetchBudgets();
      fetchSummary();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteBudget = async (id) => {
  try {
    await API.delete(`/budgets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchBudgets();
    fetchSummary();
  } catch (error) {
    console.log(error);
  }
};
const startEdit = (item) => {
  setEditId(item._id);
  setEditTitle(item.title);
  setEditAmount(item.amount);
  setEditType(item.type);
};
const updateBudget = async () => {
  try {
    await API.put(
      `/budgets/${editId}`,
      {
        title: editTitle,
        amount: editAmount,
        type: editType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setEditId(null);

    fetchBudgets();
    fetchSummary();
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          Budget Tracker
        </h1>

        <form
          onSubmit={addBudget}
          className="bg-slate-900 p-6 rounded-2xl mb-6"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800 mb-4"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800 mb-4"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800 mb-4"
          >
            <option>Income</option>
            <option>Expense</option>
          </select>

          <button
            type="submit"
            className="bg-cyan-500 px-5 py-3 rounded-xl"
          >
            Add Transaction
          </button>
        </form>
<div className="grid md:grid-cols-3 gap-4 mb-6">
  <div className="bg-green-900 p-4 rounded-xl">
    <h2>Total Income</h2>
    <p className="text-2xl font-bold">
      ₹{summary.totalIncome}
    </p>
  </div>

  <div className="bg-red-900 p-4 rounded-xl">
    <h2>Total Expense</h2>
    <p className="text-2xl font-bold">
      ₹{summary.totalExpense}
    </p>
  </div>

  <div className="bg-cyan-900 p-4 rounded-xl">
    <h2>Balance</h2>
    <p className="text-2xl font-bold">
      ₹{summary.balance}
    </p>
  </div>
</div>
<div className="bg-slate-900 p-6 rounded-2xl mb-6">
  <h2 className="text-2xl font-bold text-cyan-400 mb-4">
    Budget Analytics
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
          {budgets.map((item) => (
            <div
              key={item._id}
              className="bg-slate-900 p-5 rounded-2xl"
            >
              <h2 className="text-xl font-bold">
                {item.title}
              </h2>

              <p className="mt-2">
                ₹{item.amount}
              </p>

              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full ${
                  item.type === "Income"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {item.type}
              </span>
       <div className="mt-3 flex gap-3">
  <button
    onClick={() => startEdit(item)}
    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
  >
    Edit
  </button>

  <button
    onClick={() => deleteBudget(item._id)}
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
        Edit Transaction
      </h2>

      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="w-full p-3 rounded-xl bg-slate-800 mb-4"
      />

      <input
        type="number"
        value={editAmount}
        onChange={(e) => setEditAmount(e.target.value)}
        className="w-full p-3 rounded-xl bg-slate-800 mb-4"
      />

      <select
        value={editType}
        onChange={(e) => setEditType(e.target.value)}
        className="w-full p-3 rounded-xl bg-slate-800 mb-4"
      >
        <option>Income</option>
        <option>Expense</option>
      </select>

      <div className="flex gap-3">
        <button
          onClick={updateBudget}
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
      </div>
    </div>
  );
}

export default Budget;