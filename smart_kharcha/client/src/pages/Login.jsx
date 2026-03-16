import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

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
      (u) => u.email === form.email && u.password === form.password
    );

    if (!foundUser) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-brand-darker relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-primary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-brand-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onSubmit={handleLogin}
        className="relative z-10 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-xl border border-white/20 dark:border-white/10 p-10 rounded-3xl shadow-2xl w-[26rem] flex flex-col gap-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-brand-primary to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium">Log in to manage your finances</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-slate-800/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all font-medium placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-slate-800/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all font-medium placeholder-slate-400"
            />
          </div>
        </div>

        {error && (
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-rose-500 bg-rose-50 dark:bg-rose-500/10 px-4 py-2 rounded-lg text-sm font-medium text-center"
          >
            {error}
          </motion.p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-medium py-3.5 rounded-xl shadow-lg shadow-brand-primary/30 hover:shadow-brand-primary/50 hover:-translate-y-0.5 transition-all text-lg"
        >
          Sign In
        </button>

        <p className="text-sm text-center font-medium text-slate-600 dark:text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-brand-primary hover:text-brand-secondary transition-colors font-semibold">
            Create one
          </Link>
        </p>
      </motion.form>

    </div>
  );
};

export default Login;