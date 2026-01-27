import { useState } from "react";

export default function ChangeAccountPassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    // 🔐 API integration later
    console.log("Account password payload:", form);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* TOP RIGHT INFO */}
      <div className="flex justify-end mb-4">
        <div className="border border-blue-200 text-sm text-gray-600 px-4 py-2 rounded">
          Never Updated .
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-md shadow">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#6b5a00] to-[#1a7f00] text-white px-6 py-3 rounded-t-md font-semibold">
          Change Account Password
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* OLD PASSWORD */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Your Old Password"
              value={form.oldPassword}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-700"
            />
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-700"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Confirm
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-700"
            />
          </div>

          {/* DIVIDER */}
          <hr />

          {/* SUBMIT */}
          <div>
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded shadow"
            >
              Update Account/Transaction Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
