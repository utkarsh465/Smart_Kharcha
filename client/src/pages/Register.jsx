import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Registration failed"
      );

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">

      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-96 space-y-4"
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
          className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
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