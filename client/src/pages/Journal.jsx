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

function Journal() {
  const [editId, setEditId] = useState(null);
const [editTitle, setEditTitle] = useState("");
const [editMood, setEditMood] = useState("Happy");
const [editContent, setEditContent] = useState("");
  const [journals, setJournals] = useState([]);
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("Happy");
  const [content, setContent] = useState("");
  const [moodStats, setMoodStats] = useState({
  happy: 0,
  neutral: 0,
  sad: 0,
});
const chartData = [
  {
    name: "Happy",
    value: moodStats.happy,
  },
  {
    name: "Neutral",
    value: moodStats.neutral,
  },
  {
    name: "Sad",
    value: moodStats.sad,
  },
];

const COLORS = [
  "#22c55e",
  "#eab308",
  "#ef4444",
];

  const token = localStorage.getItem("token");

  const fetchJournals = async () => {
    try {
      const res = await API.get("/journals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJournals(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  fetchJournals();
  fetchMoodStats();
}, []);
const fetchMoodStats = async () => {
  try {
    const res = await API.get("/journals/mood-stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMoodStats(res.data);
  } catch (error) {
    console.log(error);
  }
};
  const addJournal = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/journals",
        {
          title,
          mood,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setMood("Happy");
      setContent("");

      fetchJournals();
      fetchMoodStats();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJournal = async (id) => {
    try {
      await API.delete(`/journals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchJournals();
      fetchMoodStats();
    } catch (error) {
      console.log(error);
    }
  };
  const startEdit = (journal) => {
  setEditId(journal._id);
  setEditTitle(journal.title);
  setEditMood(journal.mood);
  setEditContent(journal.content);
};
const updateJournal = async () => {
  try {
    await API.put(
      `/journals/${editId}`,
      {
        title: editTitle,
        mood: editMood,
        content: editContent,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setEditId(null);

    fetchJournals();
    fetchMoodStats();

  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          Journal
        </h1>

        <form
          onSubmit={addJournal}
          className="bg-slate-900 p-6 rounded-2xl mb-6"
        >
          <input
            type="text"
            placeholder="Journal Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800 mb-4"
          />

          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800 mb-4"
          >
            <option>Happy</option>
            <option>Neutral</option>
            <option>Sad</option>
          </select>

          <textarea
            placeholder="Write your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800 mb-4"
            rows="5"
          />

          <button
            type="submit"
            className="bg-cyan-500 px-5 py-3 rounded-xl"
          >
            Add Journal
          </button>
        </form>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
  <div className="bg-green-900 p-4 rounded-xl">
    <h2>Happy 😊</h2>
    <p className="text-3xl font-bold">
      {moodStats.happy}
    </p>
  </div>

  <div className="bg-yellow-900 p-4 rounded-xl">
    <h2>Neutral 😐</h2>
    <p className="text-3xl font-bold">
      {moodStats.neutral}
    </p>
  </div>

  <div className="bg-red-900 p-4 rounded-xl">
    <h2>Sad 😔</h2>
    <p className="text-3xl font-bold">
      {moodStats.sad}
    </p>
  </div>
</div>
<div className="bg-slate-900 p-6 rounded-2xl mb-6">
  <h2 className="text-2xl font-bold text-cyan-400 mb-4">
    Mood Analytics
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
          {journals.map((journal) => (
            <div
              key={journal._id}
              className="bg-slate-900 p-5 rounded-2xl"
            >
              <h2 className="text-xl font-bold text-cyan-400">
                {journal.title}
              </h2>

              <p className="mt-2">
                Mood: {journal.mood}
              </p>

              <p className="mt-2 text-slate-300">
                {journal.content}
              </p>
              <button
  onClick={() => startEdit(journal)}
  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg mr-2"
>
  Edit
</button>

              <button
                onClick={() => deleteJournal(journal._id)}
                className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {editId && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
    <div className="bg-slate-900 p-6 rounded-2xl w-[500px]">
      <h2 className="text-2xl font-bold mb-4">
        Edit Journal
      </h2>

      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="w-full p-3 bg-slate-800 rounded-xl mb-4"
      />

      <select
        value={editMood}
        onChange={(e) => setEditMood(e.target.value)}
        className="w-full p-3 bg-slate-800 rounded-xl mb-4"
      >
        <option>Happy</option>
        <option>Neutral</option>
        <option>Sad</option>
      </select>

      <textarea
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        className="w-full p-3 bg-slate-800 rounded-xl mb-4"
      />

      <div className="flex gap-3">
        <button
          onClick={updateJournal}
          className="bg-green-500 px-4 py-2 rounded-lg"
        >
          Save
        </button>

        <button
          onClick={() => setEditId(null)}
          className="bg-red-500 px-4 py-2 rounded-lg"
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

export default Journal;