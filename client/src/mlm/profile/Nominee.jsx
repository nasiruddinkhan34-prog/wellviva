import { useState } from "react";

export default function Nominee() {
  const [form, setForm] = useState({
    nomineeName: "",
    relation: "Father",
    dob: "",
    address: "",
    state: "Andhra Pradesh",
    city: "Kurnool",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nominee Data:", form);
    // 🔗 connect API here later
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-gray-700 font-semibold">
          <span className="text-xl">📘</span>
          <span>Edit Nominee</span>
        </div>

        <div className="border border-blue-300 text-blue-500 px-4 py-2 rounded-md text-sm">
          Never Updated .
        </div>
      </div>

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow overflow-hidden"
      >
        {/* SECTION HEADER */}
        <div className="bg-gradient-to-r from-[#6b5a00] to-[#1a7f00] px-6 py-3 text-white font-semibold">
          Nominee Information
        </div>

        {/* FORM BODY */}
        <div className="p-6 space-y-5">
          {/* Nominee Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              <span className="text-red-500">*</span> Nominee Name
            </label>
            <input
              type="text"
              name="nomineeName"
              value={form.nomineeName}
              onChange={handleChange}
              placeholder="Nominee Name"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-green-200"
              required
            />
          </div>

          {/* Relation */}
          <div>
            <label className="block text-sm font-medium mb-1">
              <span className="text-red-500">*</span> Relation
            </label>
            <select
              name="relation"
              value={form.relation}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2"
              required
            >
              <option>Father</option>
              <option>Mother</option>
              <option>Spouse</option>
              <option>Brother</option>
              <option>Sister</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Date Of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2"
            >
              <option>Andhra Pradesh</option>
              <option>Telangana</option>
              <option>Karnataka</option>
              <option>Tamil Nadu</option>
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2"
            >
              <option>Kurnool</option>
              <option>Anantapur</option>
              <option>Nellore</option>
              <option>Vijayawada</option>
            </select>
          </div>

          {/* SUBMIT */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
            >
              Update Nominee Details
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
