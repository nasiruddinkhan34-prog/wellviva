import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔐 Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const placeOrder = async () => {
    if (!user) return alert("User not loaded");
    if (!cart.length) return alert("Cart is empty");

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/payment/initiate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            amount: total,
            firstname: user.firstName,
            email: user.email,
            phone: "9999999999",
            userId: user.id,
            productinfo: "Wellviva Order",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Payment initiation failed");
      }

      // 🟢 Redirect to PayU
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.payuUrl;

      Object.entries(data.params).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      alert(err.message);
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {/* ADDRESS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input className="border px-4 py-3 rounded" placeholder="Full Name" />
          <input className="border px-4 py-3 rounded" placeholder="Phone" />
          <input
            className="border px-4 py-3 rounded md:col-span-2"
            placeholder="Address"
          />
          <input className="border px-4 py-3 rounded" placeholder="City" />
          <input className="border px-4 py-3 rounded" placeholder="Pincode" />
        </div>

        {/* PAYMENT */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Payment Method</h3>
          <label className="flex items-center gap-2">
            <input type="radio" checked readOnly />
            Online Payment (PayU)
          </label>
        </div>

        {/* SUMMARY */}
        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          disabled={loading}
          onClick={placeOrder}
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 disabled:opacity-50"
        >
          {loading ? "Redirecting to PayU..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
