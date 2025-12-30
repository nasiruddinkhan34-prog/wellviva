import { useCart } from "../context/CartContext";

export default function Cart({ onClose }) {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end">
      <div className="w-80 bg-white h-full p-6 shadow-xl">
        <h3 className="text-xl font-bold mb-4">Your Cart</h3>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="mt-6 font-bold text-lg">Total: ₹{total}</div>
            <button className="mt-3 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700">
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="mt-2 w-full border text-gray-700 py-2 rounded-lg hover:bg-gray-100"
            >
              Clear Cart
            </button>
          </div>
        )}

        <button onClick={onClose} className="mt-4 w-full text-center text-gray-700">
          Close
        </button>
      </div>
    </div>
  );
}
