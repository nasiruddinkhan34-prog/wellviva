import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function ProductSection({ title, products }) {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {title}
          </h2>
          <span className="text-sm text-gray-500 cursor-pointer">
            View all →
          </span>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onClick={() => navigate(`/product/${p.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
