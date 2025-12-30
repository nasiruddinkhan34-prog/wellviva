import { NavLink } from "react-router-dom";

const menu = [
  { path: "dashboard", label: "Dashboard" },
  { path: "products", label: "Products" },
  { path: "orders", label: "Orders" },
  { path: "payments", label: "Payments" },
  { path: "banners", label: "Banners" },
  { path: "users", label: "Users" },
  { path: "mlm-users", label: "MLM Users" },
  { path: "reports", label: "Reports" },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-4 font-bold text-xl text-teal-700">
        Wellviva Admin
      </div>

      <nav className="mt-4 space-y-1">
        {menu.map((m) => (
          <NavLink
            key={m.path}
            to={`/admin/${m.path}`}
            className={({ isActive }) =>
              `block px-4 py-2 rounded mx-2 ${
                isActive
                  ? "bg-teal-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {m.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
