import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const token = localStorage.getItem("token");

  const fetchEvents = async () => {
    try {
      const res = await API.get("/calendar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addEvent = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/calendar",
        {
          title,
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDate("");

      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await API.delete(`/calendar/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          Calendar Planner
        </h1>

        <form
          onSubmit={addEvent}
          className="bg-slate-900 p-6 rounded-2xl mb-6"
        >
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-slate-800 mb-4"
          />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-slate-800 mb-4"
          />

          <button
            type="submit"
            className="bg-cyan-500 px-5 py-3 rounded-xl"
          >
            Add Event
          </button>
        </form>

        <div className="grid gap-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-slate-900 p-5 rounded-2xl"
            >
              <h2 className="text-xl font-bold text-cyan-400">
                {event.title}
              </h2>

              <p className="mt-2">
                📅{" "}
                {new Date(
                  event.date
                ).toLocaleDateString()}
              </p>

              <button
                onClick={() =>
                  deleteEvent(event._id)
                }
                className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;