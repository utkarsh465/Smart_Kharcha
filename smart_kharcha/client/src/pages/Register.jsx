import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    // Email already exists check
    const userExists = existingUsers.find(
      (u) => u.email === form.email
    );

    if (userExists) {
      setError("User already exists with this email");
      return;
    }

    const updatedUsers = [...existingUsers, form];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Registration successful");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-96 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center dark:text-white">
          Register
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={form.username}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
        />

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
          placeholder="Create Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Register
        </button>

        <p className="text-sm text-center dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;