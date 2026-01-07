import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shipping = 0; // free shipping
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT: CART TABLE */}
        <div className="lg:col-span-2">
          <table className="w-full text-left border-collapse">
            <thead className="border-b">
              <tr className="text-sm text-gray-600">
                <th className="pb-4">Product</th>
                <th>Price</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th className="text-right">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b">
                  {/* PRODUCT */}
                  <td className="py-6 flex gap-4 items-center">
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      className="w-16 h-16 object-contain border"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-gray-500 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </td>

                  {/* PRICE */}
                  <td>₹{item.price.toFixed(2)}</td>

                  {/* SKU */}
                  <td>{item.sku || "—"}</td>

                  {/* QTY */}
                  <td>
                    <div className="flex items-center border w-fit">
                      <button
                        onClick={() =>
                          updateQty(item.id, Math.max(1, item.qty - 1))
                        }
                        className="px-3 py-1"
                      >
                        −
                      </button>
                      <span className="px-4">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="px-3 py-1"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* SUBTOTAL */}
                  <td className="text-right font-semibold">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* COUPON + CLEAR */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
            <div className="flex border">
              <input
                type="text"
                placeholder="Coupon code"
                className="px-4 py-2 outline-none"
              />
              <button className="bg-lime-600 text-white px-4">
                OK
              </button>
            </div>

            <button
              onClick={clearCart}
              className="flex items-center gap-2 bg-lime-600 text-white px-6 py-2 rounded-full"
            >
              🗑 Clear Shopping Cart
            </button>
          </div>
        </div>

        {/* RIGHT: CART TOTALS */}
        <div className="border p-6">
          <h3 className="text-lg font-semibold mb-4">Cart Totals</h3>

          <div className="flex justify-between py-2 border-b">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="py-4 border-b">
            <p className="font-semibold mb-2">Shipping</p>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" checked readOnly />
              Free shipping
            </label>
            <label className="flex items-center gap-2 text-sm mt-1">
              <input type="radio" disabled />
              Flat rate: ₹83.00
            </label>
            <label className="flex items-center gap-2 text-sm mt-1">
              <input type="radio" disabled />
              Local pickup
            </label>

            <p className="text-sm text-gray-500 mt-3">
              Shipping to <b>West Bengal</b>.{" "}
              <span className="underline cursor-pointer">
                Change address
              </span>
            </p>
          </div>

          <div className="flex justify-between py-4 text-lg font-bold">
            <span>TOTAL</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-full font-semibold mb-4"
          >
            Proceed To Checkout
          </button>

          <button
            onClick={() => navigate("/shop")}
            className="w-full bg-lime-600 hover:bg-lime-700 text-white py-3 rounded-full font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
