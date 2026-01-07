import { useCart } from "../context/CartContext";

export default function ProductCard({ product, onClick }) {
  const { addToCart } = useCart();

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden cursor-pointer"
    >
      <div className="relative bg-gray-100 h-56 flex items-center justify-center">
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
          Bestseller
        </span>

        <img
          src={product.image || "https://placehold.co/300x300?text=Product"}
          alt={product.name}
          className="h-40 group-hover:scale-110 transition"
        />
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg text-gray-800">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-teal-700">
            ₹{product.price}
          </span>
          <span className="text-xs text-gray-500 line-through">
            ₹{product.price + 200}
          </span>
        </div>

        {/* IMPORTANT: Stop click bubbling */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="mt-5 w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
