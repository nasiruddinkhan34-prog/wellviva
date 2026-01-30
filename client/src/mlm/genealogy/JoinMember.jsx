import { useState } from "react";
import api from "../../api/axios";

export default function JoinMember() {
  const [form, setForm] = useState({
    sponsorId: "",
    sponsorName: "",
    position: "left",
    name: "",
    mobile: "",
    email: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    bankName: "",
    branchName: "",
    accountName: "",
    accountNumber: "",
    accountType: "saving",
    ifsc: "",
    pan: "",
    agree: false,
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const submit = async () => {
    if (!form.agree) {
      alert("Please accept the agreement");
      return;
    }
    await api.post("/mlm/register", form);
    alert("Member registered successfully");
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow rounded-lg border">

      {/* PERSONAL DETAILS */}
      <Header title="Personal Details" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <Input label="Sponsor Id *" name="sponsorId" onChange={onChange} />
        <Input label="Sponsor Name *" name="sponsorName" onChange={onChange} />

        <Select
          label="Position *"
          name="position"
          value={form.position}
          onChange={onChange}
          options={[
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ]}
        />

        <Input label="Name *" name="name" onChange={onChange} />
        <Input label="Mobile Number *" name="mobile" onChange={onChange} />
        <Input label="Email Id" name="email" onChange={onChange} />

        <Textarea
          label="Address *"
          name="address"
          onChange={onChange}
        />

        <Select
          label="Select State"
          name="state"
          onChange={onChange}
          options={[
            { label: "- Select State -", value: "" },
            { label: "West Bengal", value: "WB" },
            { label: "Delhi", value: "DL" },
          ]}
        />

        <Select
          label="City"
          name="city"
          onChange={onChange}
          options={[
            { label: "- Select City -", value: "" },
            { label: "Kolkata", value: "Kolkata" },
          ]}
        />

        <Input label="Pin Code *" name="pincode" onChange={onChange} />
      </div>

      {/* BANK DETAILS */}
      <Header title="Bank Details" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <Input label="Bank Name" name="bankName" onChange={onChange} />
        <Input label="Branch Name" name="branchName" onChange={onChange} />
        <Input label="Account Name" name="accountName" onChange={onChange} />
        <Input label="Account Number" name="accountNumber" onChange={onChange} />

        <Select
          label="Account Type"
          name="accountType"
          value={form.accountType}
          onChange={onChange}
          options={[
            { label: "Saving", value: "saving" },
            { label: "Current", value: "current" },
          ]}
        />

        <Input label="IFSC Code" name="ifsc" onChange={onChange} />
        <Input label="Pan Number *" name="pan" onChange={onChange} />
      </div>

      {/* AGREEMENT + ACTION */}
      <div className="px-6 pb-6">
        <label className="flex items-center gap-2 text-sm mb-4">
          <input type="checkbox" name="agree" onChange={onChange} />
          I accept the agreement.
        </label>

        <div className="flex justify-between items-center">
          <span className="text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-green-700 font-semibold">
              Sign In
            </a>
          </span>

          <button
            onClick={submit}
            className="bg-gradient-to-r from-[#7a5a00] to-green-700 text-white px-8 py-2 rounded font-semibold"
          >
            REGISTER NOW
          </button>
        </div>
      </div>
    </div>
  );
}

/* =======================
   UI HELPERS (MATCH UI)
======================= */

function Header({ title }) {
  return (
    <div className="bg-gradient-to-r from-[#7a5a00] to-green-700 text-white px-6 py-3 font-semibold">
      {title}
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <input
        {...props}
        placeholder={label}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="md:col-span-2">
      <textarea
        {...props}
        placeholder={label}
        rows={3}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <select {...props} className="w-full border rounded px-3 py-2">
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
    