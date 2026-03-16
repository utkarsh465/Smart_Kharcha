import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SidebarLayout from "./layout/SidebarLayout";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import HowToUse from "./pages/HowToUse";
import About from "./pages/About";

import ReceiptScannerPage from "./pages/ReceiptScannerPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/"
        element={
          isLoggedIn
            ? <Navigate to="/dashboard" />
            : <Login setIsLoggedIn={setIsLoggedIn} />
        }
      />

      {/* Register */}
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        element={
          isLoggedIn ? (
            <SidebarLayout setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Navigate to="/" />
          )
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/scanner" element={<ReceiptScannerPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;