import { useState } from "react";

export default function EditProfile() {
  const [form, setForm] = useState({
    name: "NASIR UDDIN KHAN",
    fatherName: "AYEN ALI KHAN",
    motherName: "MAYNA BIBI",
    dob: "1995-03-12",
    gender: "Male",
    maritalStatus: "Married",
    mobile: "8250894500",
    email: "nasiruddinkhan34@gmail.com",
    qualification: "GRADUATE",
    occupation: "BUSINESS",
    address:
      "VILL+P.O- GHOSHPUR, P.S- HAROA, NORTH 24 PARGANAS, 743502",
    state: "West Bengal",
    city: "North 24 Parganas",
    pincode: "743502",
    country: "India",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      {/* TOP HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Personal Details</h2>
          <p className="text-gray-500">Welcome NASIR UDDIN KHAN</p>
        </div>

        <div className="border px-4 py-2 rounded text-sm text-gray-600">
          Last Updated on Jan 12 2025 5:13PM
        </div>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* LEFT PHOTO */}
          <div className="text-center">
            <img
              src="https://via.placeholder.com/160"
              alt="profile"
              className="w-40 h-40 object-cover mx-auto border"
            />

            <input
              type="file"
              className="mt-3 text-sm"
            />
          </div>

          {/* RIGHT FORM */}
          <div className="md:col-span-3">
            {/* SECTION HEADER */}
            <div className="bg-gradient-to-r from-yellow-700 to-green-700 text-white px-4 py-2 mb-6 font-semibold">
              Basic Information
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Name" required name="name" value={form.name} onChange={handleChange} />
              <Input label="Father Name" required name="fatherName" value={form.fatherName} onChange={handleChange} />
              <Input label="Mother Name" required name="motherName" value={form.motherName} onChange={handleChange} />
              <Input label="Date Of Birth" type="date" name="dob" value={form.dob} onChange={handleChange} />
              <Select label="Gender" required name="gender" value={form.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
              <Select label="Marital Status" name="maritalStatus" value={form.maritalStatus} onChange={handleChange} options={["Single", "Married"]} />
              <Input label="Mobile" required name="mobile" value={form.mobile} onChange={handleChange} />
              <Input label="Email" name="email" value={form.email} onChange={handleChange} />
              <Input label="Qualification" name="qualification" value={form.qualification} onChange={handleChange} />
              <Input label="Occupation/Job" name="occupation" value={form.occupation} onChange={handleChange} />

              <Textarea label="Address" required name="address" value={form.address} onChange={handleChange} />

              <Select label="State" required name="state" value={form.state} onChange={handleChange} options={["West Bengal"]} />
              <Select label="City" required name="city" value={form.city} onChange={handleChange} options={["North 24 Parganas"]} />
              <Input label="Pincode" required name="pincode" value={form.pincode} onChange={handleChange} />
              <Select label="Country" required name="country" value={form.country} onChange={handleChange} options={["India"]} />
            </div>

            {/* BUTTON */}
            <div className="mt-8">
              <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded">
                Update Personal Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SMALL INPUT COMPONENTS ---------------- */

function Input({ label, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {required && <span className="text-red-500">*</span>} {label}
      </label>
      <input
        {...props}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
      />
    </div>
  );
}

function Textarea({ label, required, ...props }) {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium mb-1">
        {required && <span className="text-red-500">*</span>} {label}
      </label>
      <textarea
        {...props}
        rows="3"
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
      />
    </div>
  );
}

function Select({ label, required, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {required && <span className="text-red-500">*</span>} {label}
      </label>
      <select
        {...props}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
