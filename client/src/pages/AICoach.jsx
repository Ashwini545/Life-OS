import { useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function AICoach() {
  const [message, setMessage] =
    useState("");

  const [reply, setReply] =
    useState("");

  const askAI = async () => {
    try {
      const res = await API.post(
        "/ai/coach",
        {
          message,
        }
      );

      setReply(res.data.reply);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          AI Coach
        </h1>

        <textarea
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Ask AI..."
          className="w-full p-4 rounded-xl bg-slate-800 mb-4"
        />

        <button
          onClick={askAI}
          className="bg-cyan-500 px-5 py-3 rounded-xl"
        >
          Ask AI
        </button>

        {reply && (
          <div className="bg-slate-900 p-5 rounded-2xl mt-6">
            <h2 className="text-cyan-400 font-bold">
              AI Response
            </h2>

            <p className="mt-2">
              {reply}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AICoach;