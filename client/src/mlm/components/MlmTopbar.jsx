import { Bell, Menu } from "lucide-react";

export default function MlmTopbar({ onToggle, userName, balance }) {
  return (
   <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b flex items-center px-6 z-40 " style={{justifyContent:'space-between'}}>
      
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggle}
          className="p-2 rounded hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

        <div>
          <p className="text-xs text-gray-400">ACCOUNT BALANCE</p>
          <p className="font-semibold text-lg">₹ {balance ?? 0}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <Bell size={20} className="text-gray-500 cursor-pointer" />

        <div className="text-right">
          <p className="text-sm font-semibold">{userName}</p>
          <p className="text-xs text-gray-400">User Dashboard</p>
        </div>
      </div>
    </header>
  );
}
