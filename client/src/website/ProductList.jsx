import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Categories from "./Categories";

const allProducts = [
  {
    id: 1,
    name: "Herbal Tea",
    price: 299,
    rating: 4.5,
    images: ["/images/tea1.jpg", "/images/tea2.jpg"],
    bv: 120,
    pv: 90,
    shortDescription: "Boost immunity and energy naturally.",
    description: "This herbal nutrition powder helps improve metabolism...",
    specifications: {
      Weight: "500g",
      Ingredients: "Ashwagandha, Tulsi",
      "Shelf Life": "18 months"
    },
    reviews: [
      { user: "Rahul", rating: 5, comment: "Excellent product!" }
    ],
    commission: { direct: 200, level: 350, repurchase: 150 }
  },
{
    id: 2,
    name: "Organic Honey",
    price: 499,
    rating: 4.2,
    images: ["/images/honey1.jpg"],
    bv: 80,
    pv: 60,
    shortDescription: "Pure organic honey from forests.",
    description: "Collected from natural bee farms...",
    specifications: {},
    reviews: [],
    commission: { direct: 120, level: 200, repurchase: 80 }
  },
  {
    id: 3,
    name: "Ashwagandha Capsules",
    price: 699,
    rating: 4.6,
    images: [],
    bv: 100,
    pv: 70,
    shortDescription: "Stress relief and strength booster.",
    description: "Made from certified Ashwagandha roots...",
    specifications: {},
    reviews: [],
    commission: { direct: 150, level: 250, repurchase: 100 }
  },

  {
    id: 4,
    name: "Moringa Powder",
    price: 399,
    rating: 4.1,
    images: [],
    bv: 60,
    pv: 40,
    shortDescription: "Rich in antioxidants and nutrients.",
    description: "Naturally dried moringa leaves powder...",
    specifications: {},
    reviews: [],
    commission: { direct: 90, level: 160, repurchase: 70 }
  }
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
