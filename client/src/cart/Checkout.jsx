import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    const u = JSON.parse(storedUser);
    setUser(u);
    setForm((f) => ({
      ...f,
      firstName: u.firstName || "",
      email: u.email || "",
    }));
  }, [navigate]);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 83;
  const total = subtotal + shipping;

  const placeOrder = async () => {
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
            firstname: form.firstName,
            email: form.email,
            phone: form.phone,
            userId: user.id,
            productinfo: "Wellviva Order",
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const formEl = document.createElement("form");
      formEl.method = "POST";
      formEl.action = data.payuUrl;

      Object.entries(data.params).forEach(([k, v]) => {
        const i = document.createElement("input");
        i.type = "hidden";
        i.name = k;
        i.value = v;
        formEl.appendChild(i);
      });

      document.body.appendChild(formEl);
      formEl.submit();
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* LEFT – BILLING */}
        <div className="md:col-span-2 bg-white p-8 border rounded">
          <h2 className="text-lg font-semibold mb-6 border-b pb-3">
            Billing Details
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input placeholder="First Name *" className="input" />
            <input placeholder="Last Name *" className="input" />
          </div>

          <input placeholder="Company Name (optional)" className="input mt-4" />
          <input value="India" disabled className="input mt-4 bg-gray-100" />

          <input placeholder="Street Address *" className="input mt-4" />
          <input placeholder="Town / City *" className="input mt-4" />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input placeholder="State *" className="input" />
            <input placeholder="PIN Code *" className="input" />
          </div>

          <input
            placeholder="Phone *"
            className="input mt-4"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            placeholder="Email Address *"
            className="input mt-4"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <textarea
            placeholder="Order Notes (optional)"
            className="input mt-6 h-24"
          />
        </div>

        {/* RIGHT – ORDER SUMMARY */}
        <div className="bg-white p-6 border rounded h-fit">
          <h3 className="font-semibold border-b pb-3 mb-4">Your Order</h3>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-2">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <div className="flex justify-between border-t pt-3 mt-3 text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between text-sm mt-2">
            <span>Shipping</span>
            <span>₹{shipping}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <strong>PayU</strong> – Secure payment via Cards, UPI & NetBanking
          </div>

          <button
            disabled={loading}
            onClick={placeOrder}
            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold disabled:opacity-50"
          >
            {loading ? "Redirecting..." : "Place Order"}
          </button>
        </div>
      </div>

      {/* INPUT STYLE */}
      <style>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          padding: 10px 12px;
          border-radius: 4px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
