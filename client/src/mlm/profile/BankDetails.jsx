import { useState } from "react";

export default function BankDetails() {
  const [form, setForm] = useState({
    accountName: "NASIR UDDIN KHAN",
    bankName: "KOTAK MAHINDRA BANK",
    branchName: "HB SARANI",
    accountNumber: "3712509267",
    pan: "DITPK3409R",
    ifsc: "KKBK0006570",
    accountType: "Saving",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bank Details:", form);
    // 🔗 API integration later
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-gray-700 font-semibold">
          <span className="text-xl">✏️</span>
          <span>Bank Details</span>
        </div>

        <div className="border border-blue-300 text-blue-500 px-4 py-2 rounded-md text-sm">
          Last Updated on Jan 12 2025 5:14PM .
        </div>
      </div>

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow overflow-hidden"
      >
        {/* SECTION HEADER */}
        <div className="bg-gradient-to-r from-[#6b5a00] to-[#1a7f00] px-6 py-3 text-white font-semibold">
          Bank Details
        </div>

        {/* FORM BODY */}
        <div className="p-6 space-y-5">
          {/* Account Name */}
          <Input
            label="Account Name"
            name="accountName"
            value={form.accountName}
            onChange={handleChange}
          />

          {/* Bank Name */}
          <Input
            label="Bank Name"
            name="bankName"
            value={form.bankName}
            onChange={handleChange}
          />

          {/* Branch Name */}
          <Input
            label="Branch Name"
            name="branchName"
            value={form.branchName}
            onChange={handleChange}
          />

          {/* Account Number */}
          <Input
            label="Account Number"
            name="accountNumber"
            value={form.accountNumber}
            onChange={handleChange}
          />

          {/* PAN */}
          <Input
            label="PAN"
            name="pan"
            value={form.pan}
            onChange={handleChange}
          />

          {/* IFSC */}
          <Input
            label="IFSC"
            name="ifsc"
            value={form.ifsc}
            onChange={handleChange}
          />

          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              AccountType
            </label>
            <select
              name="accountType"
              value={form.accountType}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2"
            >
              <option>Saving</option>
              <option>Current</option>
            </select>
          </div>

          {/* SUBMIT */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
            >
              Update Bank Details
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

/* ===============================
   REUSABLE INPUT
================================ */

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-green-200"
      />
    </div>
  );
}
