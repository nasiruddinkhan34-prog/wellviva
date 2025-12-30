import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/login");
    } else {
      setUser(JSON.parse(stored));
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-teal-600 text-white flex items-center justify-center text-4xl font-bold">
            {user.firstName?.charAt(0)}
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-800">
            {user.firstName}
          </h2>

          <p className="text-gray-500 text-sm">{user.email}</p>

          <span className="inline-block mt-3 px-4 py-1 text-sm rounded-full bg-teal-100 text-teal-700 font-medium">
            {user.role === "mlm_user"
              ? "MLM Member"
              : user.role === "admin"
              ? "Administrator"
              : "Customer"}
          </span>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
              window.location.reload();
            }}
            className="mt-6 w-full border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50"
          >
            Logout
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:col-span-2 space-y-8">
          {/* PERSONAL INFO */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                disabled
                value={user.firstName}
                className="border rounded-lg px-4 py-3 bg-gray-100"
                placeholder="First Name"
              />
              <input
                disabled
                value={user.lastName || ""}
                className="border rounded-lg px-4 py-3 bg-gray-100"
                placeholder="Last Name"
              />
              <input
                disabled
                value={user.email}
                className="border rounded-lg px-4 py-3 bg-gray-100"
                placeholder="Email"
              />
              <input
                disabled
                value={user.role}
                className="border rounded-lg px-4 py-3 bg-gray-100"
                placeholder="Role"
              />
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Editing profile will be enabled soon.
            </p>
          </div>

          {/* ADDRESS */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Shipping Address
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                disabled
                placeholder="Address Line"
                className="border rounded-lg px-4 py-3 bg-gray-100"
              />
              <input
                disabled
                placeholder="City"
                className="border rounded-lg px-4 py-3 bg-gray-100"
              />
              <input
                disabled
                placeholder="State"
                className="border rounded-lg px-4 py-3 bg-gray-100"
              />
              <input
                disabled
                placeholder="Pincode"
                className="border rounded-lg px-4 py-3 bg-gray-100"
              />
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Address management coming in checkout flow.
            </p>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white rounded-2xl shadow p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold">
                Want to manage your business?
              </h3>
              <p className="text-sm text-white/80">
                Access your dashboard and grow with Wellviva.
              </p>
            </div>

            <button
              onClick={() =>
                navigate(
                  user.role === "admin"
                    ? "/admin"
                    : user.role === "mlm_user"
                    ? "/mlm"
                    : "/"
                )
              }
              className="bg-white text-teal-700 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
