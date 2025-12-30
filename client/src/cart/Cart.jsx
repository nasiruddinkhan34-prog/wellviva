import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, updateQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (!cart.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ITEMS */}
        <div className="md:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="px-3 py-1 border rounded"
                  >
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Total</span>
            <span className="font-bold">₹{total}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-6 w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
