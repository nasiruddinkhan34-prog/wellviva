import { Outlet } from "react-router-dom";
import MlmSidebar from "./components/MlmSidebar";
import MlmTopbar from "./components/MlmTopbar";

const SIDEBAR_WIDTH = 256; // w-64
const TOPBAR_HEIGHT = 64; // h-16

export default function MlmLayout() {
  return (
    <>
      {/* SIDEBAR */}
      <MlmSidebar />

      {/* TOPBAR */}
      <MlmTopbar />

      {/* MAIN CONTENT */}
      <main
        className="bg-gray-100 min-h-screen p-6"
        style={{
          marginLeft: SIDEBAR_WIDTH,
          paddingTop: TOPBAR_HEIGHT,
        }}
      >
        <Outlet />
      </main>
    </>
  );
}
