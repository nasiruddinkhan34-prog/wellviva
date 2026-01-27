import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import MlmSidebar from "./components/MlmSidebar";
import MlmTopbar from "./components/MlmTopbar";
import api from "../api/axios";
const SIDEBAR_WIDTH = 256; // expanded (w-64)
const SIDEBAR_COLLAPSED = 80; // collapsed
const TOPBAR_HEIGHT = 64;

export default function MlmLayout() {
  const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    api.get("/mlm/dashboard").then((res) => {
      setUser(res.data.profile);
      setBalance(res.data.wallet);
    });
  }, []);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <>
      {/* SIDEBAR */}
      <MlmSidebar collapsed={collapsed} />

      {/* TOPBAR */}
      <MlmTopbar user={user?.name}
        balance={balance} onToggle={toggleSidebar} />

      {/* MAIN CONTENT */}
      <main
        className="bg-gray-100 min-h-screen p-6 transition-all duration-300"
        style={{
          marginLeft: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH,
          paddingTop: TOPBAR_HEIGHT,
        }}
      >
        <Outlet />
      </main>
    </>
  );
}
