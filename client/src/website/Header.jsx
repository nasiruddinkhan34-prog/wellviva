import { useCart } from "../context/CartContext";

export default function Header({ onCartClick }) {
  const { cart } = useCart();
  const count = cart.reduce((a, c) => a + c.qty, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-teal-700">Wellviva</h1>
        <nav className="space-x-6 text-gray-700 font-medium">
          <a href="#" className="hover:text-teal-600">Home</a>
          <a href="#" className="hover:text-teal-600">Shop</a>
          <a href="#" className="hover:text-teal-600">About</a>
          <a href="#" className="hover:text-teal-600">Contact</a>
        </nav>

        <button
          className="relative text-teal-700 hover:text-teal-800"
          onClick={onCartClick}
        >
          Cart
          {count > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-xs text-white rounded-full px-2">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
