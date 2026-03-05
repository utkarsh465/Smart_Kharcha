import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const SidebarLayout = ({ setIsLoggedIn }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">

      <Header
        openSidebar={() => setSidebarOpen(true)}
        setIsLoggedIn={setIsLoggedIn}
      />

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div className="p-4 md:p-8">
        <Outlet />
      </div>

    </div>
  );
};

export default SidebarLayout;