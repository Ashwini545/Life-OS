import { Link } from "react-router-dom";
import {
  FaHome,
  FaBullseye,
  FaWallet,
  FaUser,
  FaCalendar,
  FaBook
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        Life OS
      </h1>

      <div className="flex flex-col gap-4">
        <Link
          to="/dashboard"
          className="text-slate-300 hover:text-cyan-400"
        >
          📊 Dashboard
        </Link>

        <Link
          to="/goals"
          className="text-slate-300 hover:text-cyan-400"
        >
          🎯 Goals
        </Link>

        <Link
          to="/habits"
          className="text-slate-300 hover:text-cyan-400"
        >
          🔥 Habits
        </Link>

        <Link
          to="/budget"
          className="text-slate-300 hover:text-cyan-400"
        >
          💰 Budget
        </Link>

        <Link
          to="/journal"
          className="text-slate-300 hover:text-cyan-400"
        >
          📝 Journal
        </Link>
        <Link
  to="/profile"
  className="text-slate-300 hover:text-cyan-400"
>
  🙍 Profile
</Link>
<Link
  to="/calendar"
  className="text-slate-300 hover:text-cyan-400"
>
  📅 Calendar
</Link>
<Link
  to="/ai-coach"
  className="text-slate-300 hover:text-cyan-400"
>
  🤖 AI Coach
</Link>
      </div>
    </div>
  );
}

export default Sidebar;