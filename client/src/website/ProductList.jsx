import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Categories from "./Categories";

const allProducts = [
  { id: 1, name: "Herbal Tea", price: 299 },
  { id: 2, name: "Organic Honey", price: 499 },
  { id: 3, name: "Ashwagandha Capsules", price: 699 },
  { id: 4, name: "Moringa Powder", price: 399 },
];

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState(allProducts);

  useEffect(() => {
    if (selectedCategory === "All") {
      setProducts(allProducts);
    } else {
      // filter logic can be improved once real API exists
      setProducts(allProducts.filter((p) => p.name.toLowerCase().includes(selectedCategory.toLowerCase())));
    }
  }, [selectedCategory]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <Categories selected={selectedCategory} onSelect={setSelectedCategory} />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
