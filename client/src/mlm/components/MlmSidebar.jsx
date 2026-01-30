import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FileText,
  Network,
  ShoppingCart,
  Wallet,
  Gift,
  Award,
  AlertCircle,
  BarChart,
  LogOut,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

/* ---------------- MENU CONFIG ---------------- */
const menu = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/mlm/dashboard" },

  {
    label: "Profile",
    icon: User,
    children: [
      { label: "Edit Profile", path: "/mlm/profile/edit" },
      { label: "Edit Nominee", path: "/mlm/profile/nominee" },
      { label: "Edit Bank Details", path: "/mlm/profile/bank" },
      { label: "Edit KYC Details", path: "/mlm/profile/kyc" },
      { label: "Change Login Password", path: "/mlm/profile/change-password" },
      { label: "Change Account Password", path: "/mlm/profile/change-account-password" },
      { label: "ID Card", path: "/mlm/profile/id-card" },
    ],
  },

  {
    label: "Document",
    icon: FileText,
    children: [
      { label: "Business Plan", path: "/mlm/documents/business-plan" },
      { label: "Welcome Letter", path: "/mlm/documents/welcome-letter" },
      { label: "Tax Invoice", path: "/mlm/documents/tax-invoice" },
      { label: "Download Files", path: "/mlm/documents/files" },
    ],
  },

  {
    label: "Genealogy",
    icon: Network,
    children: [
      { label: "My Directs", path: "/mlm/genealogy/my-directs" },
      { label: "Left Downline", path: "/mlm/genealogy/left" },
      { label: "Right Downline", path: "/mlm/genealogy/right" },
      { label: "All Downline", path: "/mlm/genealogy/all" },
      { label: "Tree View", path: "/mlm/genealogy/tree" },
      { label: "Join New Member", path: "/mlm/genealogy/join" },
    ],
  },

  {
    label: "Shopping",
    icon: ShoppingCart,
    children: [
      { label: "Activation Order", path: "/mlm/shopping/activation" },
      { label: "Upgrade Order", path: "/mlm/shopping/activation" },
      { label: "Repurchase Order", path: "/mlm/shopping/activation" },
      { label: "Order History", path: "/mlm/shopping/history" },
    ],
  },

  {
    label: "Product Wallet",
    icon: Wallet,
    children: [
      { label: "Wallet Request", path: "/mlm/wallet/request" },
      { label: "Wallet Transfer", path: "/mlm/wallet/transfer" },
      { label: "Wallet Transaction", path: "/mlm/wallet/transactions" },
    ],
  },

  {
    label: "Daily Bonus",
    icon: Gift,
    children: [
      { label: "Team Development Bonus", path: "/mlm/bonus/team" },
      { label: "Direct Sponsor Bonus", path: "/mlm/bonus/direct" },
      { label: "Self Purchase Bonus", path: "/mlm/bonus/self" },
      { label: "Mentor Bonus", path: "/mlm/bonus/mentor" },
      { label: "Downline Repurchase", path: "/mlm/bonus/downline" },
    ],
  },

  {
    label: "Weekly Bonus",
    icon: Award,
    children: [
      { label: "Business Development Fund", path: "/mlm/weekly/business" },
      { label: "Royalty Bonus", path: "/mlm/weekly/royalty" },
      { label: "Car Fund", path: "/mlm/weekly/car" },
      { label: "House Fund", path: "/mlm/weekly/house" },
      { label: "Lifestyle Fund", path: "/mlm/weekly/lifestyle" },
      { label: "Child Education Fund", path: "/mlm/weekly/education" },
      { label: "Best Performed Leadership", path: "/mlm/weekly/leadership" },
      { label: "Lifetime Royalty", path: "/mlm/weekly/lifetime" },
      { label: "Reward Income", path: "/mlm/weekly/reward" },
    ],
  },

  { label: "Grievance History", icon: AlertCircle, path: "/mlm/grievance" },
  { label: "Reports", icon: BarChart, path: "/mlm/reports" },
];

/* ---------------- COMPONENT ---------------- */
export default function MlmSidebar({ collapsed }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (label) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#1f6f8b] text-white
      transition-all duration-300 z-50
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        {!collapsed && <span className="font-bold text-lg">Wellviva MLM</span>}
      </div>

      {/* MENU */}
      <nav className="mt-4 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          const hasChildren = !!item.children;

          if (!hasChildren) {
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-sm
                  hover:bg-[#145b73]
                  ${isActive ? "bg-[#145b73]" : ""}`
                }
              >
                <Icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          }

          return (
            <div key={item.label}>
              <button
                onClick={() => toggleMenu(item.label)}
                className="flex items-center justify-between w-full px-4 py-3 text-sm hover:bg-[#145b73]"
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  {!collapsed && <span>{item.label}</span>}
                </div>

                {!collapsed &&
                  (openMenu === item.label ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  ))}
              </button>

              {!collapsed && openMenu === item.label && (
                <div className="ml-12">
                  {item.children.map((sub) => (
                    <NavLink
                      key={sub.label}
                      to={sub.path}
                      className={({ isActive }) =>
                        `block py-2 text-sm
                        hover:text-white
                        ${isActive ? "text-white font-medium" : "text-white/80"}`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="absolute bottom-0 w-full">
        <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-600">
          <LogOut size={20} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
