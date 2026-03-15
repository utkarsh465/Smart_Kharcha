import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) =>
        u.email === form.email &&
        u.password === form.password
    );

    if (!foundUser) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
      "currentUser",
      JSON.stringify(foundUser)
    );

    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition">

      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-96 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center dark:text-white">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Login
        </button>

        <p className="text-sm text-center dark:text-gray-300">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>

    </div>
  );
};

export default Login;