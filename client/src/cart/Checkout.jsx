import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

const placeOrder = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/payment/initiate`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: total,
        firstname: user.firstName,
        email: user.email,
        phone: "9999999999",
        userId: user.id,
      }),
    }
  );

  const data = await res.json();

  const form = document.createElement("form");
  form.method = "POST";
  form.action = data.payuUrl;

  Object.entries(data.params).forEach(([k, v]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = k;
    input.value = v;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
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
            Cash on Delivery
          </label>
        </div>

        {/* SUMMARY */}
        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={placeOrder}
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
