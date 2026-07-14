
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
    const navigate = useNavigate();

const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
});
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.post("/auth/register", formData);

    alert("Registration Successful");
    navigate("/");
  } catch (error) {
    console.log(error);
    alert("Registration Failed");
  }
};
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400">
            Create Account
          </h1>
          <p className="text-slate-400 mt-2">
            Start your Life OS journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-slate-300">
              Name
            </label>
            <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Enter your name"
  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-400"
/>
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Email
            </label>
           <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter your email"
  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-400"
/>
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Password
            </label>
            <input
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Create password"
  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-400"
/>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition p-3 rounded-xl font-semibold"
          >
            Register
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-cyan-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;