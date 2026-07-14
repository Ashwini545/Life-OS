import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
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
    const res = await API.post("/auth/login", formData);

    localStorage.setItem("token", res.data.token);

    alert("Login Successful");

    navigate("/dashboard");
  } catch (error) {
    console.log(error);
    alert("Invalid Email or Password");
  }
};
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400">
            Life OS
          </h1>
          <p className="text-slate-400 mt-2">
            Manage your goals, habits and life
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
  placeholder="Enter your password"
  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-400"
/>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition p-3 rounded-xl font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;