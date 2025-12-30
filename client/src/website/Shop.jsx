import ProductSection from "./ProductSection";

const allProducts = [
  { id: 1, name: "Herbal Tea", price: 299 },
  { id: 2, name: "Organic Honey", price: 499 },
  { id: 3, name: "Ashwagandha Capsules", price: 699 },
  { id: 4, name: "Moringa Powder", price: 399 },
  { id: 5, name: "Turmeric Capsules", price: 599 },
  { id: 6, name: "Aloe Vera Juice", price: 349 },
];

export default function Shop() {
  return (
    <ProductSection title="All Products" products={allProducts} />
  );
}
