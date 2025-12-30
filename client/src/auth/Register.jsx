import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    uplineReferralCode: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <input
            name="firstName"
            placeholder="First Name"
            required
            className="border px-4 py-3 rounded"
            onChange={handleChange}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            required
            className="border px-4 py-3 rounded"
            onChange={handleChange}
          />
        </div>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border px-4 py-3 rounded w-full mb-4"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="border px-4 py-3 rounded w-full mb-4"
          onChange={handleChange}
        />

        <input
          name="uplineReferralCode"
          placeholder="Referral Code (optional)"
          className="border px-4 py-3 rounded w-full mb-4"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
