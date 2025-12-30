import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductSection from "./ProductSection";

/* ------------------ STATIC PRODUCT DATA ------------------ */
const trendingProducts = [
  { id: 1, name: "Herbal Tea", price: 299 },
  { id: 2, name: "Organic Honey", price: 499 },
  { id: 3, name: "Ashwagandha Capsules", price: 699 },
  { id: 4, name: "Moringa Powder", price: 399 },
];

const newProducts = [
  { id: 5, name: "Turmeric Capsules", price: 599 },
  { id: 6, name: "Aloe Vera Juice", price: 349 },
  { id: 7, name: "Giloy Juice", price: 329 },
  { id: 8, name: "Neem Tablets", price: 279 },
];

const mostPurchased = [
  { id: 9, name: "Chyawanprash", price: 449 },
  { id: 10, name: "Protein Powder", price: 899 },
  { id: 11, name: "Wheatgrass Powder", price: 379 },
  { id: 12, name: "Spirulina Tablets", price: 649 },
];

/* ------------------ HERO SLIDES ------------------ */
const slides = [
  {
    title: "Healthy Living Starts Here",
    subtitle:
      "Discover premium herbal, organic and wellness products trusted by thousands.",
    image: "/Main_banner.jpeg"

  },
  {
    title: "Pure. Natural. Effective.",
    subtitle:
      "Scientifically crafted Ayurvedic products for daily wellness.",
    image: "/banner2.jpeg"

  },
  {
    title: "Wellness for Every Family",
    subtitle:
      "Safe, certified, and powerful health solutions for all ages.",
    image: "/Main_banner.jpeg"

  },
];

/* ========================================================= */

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <>
      {/* ================= HERO SLIDER ================= */}
     <section className="relative h-[520px] md:h-[650px] overflow-hidden">
  {/* Background Image */}
  <img
    src={slide.image}
    alt={slide.title}
    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6 py-32 text-center text-white">
    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
      {slide.title}
    </h1>

    <p className="mt-5 text-lg text-white/90 max-w-2xl mx-auto">
      {slide.subtitle}
    </p>

    <div className="mt-10 flex justify-center gap-6">
      <Link
        to="/shop"
        className="bg-white text-teal-700 px-10 py-4 rounded-full font-semibold shadow-xl hover:scale-105 transition"
      >
        Shop Now
      </Link>

      <Link
        to="/about"
        className="border border-white/70 px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition"
      >
        Learn More
      </Link>
    </div>

    {/* Slider Dots */}
    <div className="mt-12 flex justify-center gap-3">
      {slides.map((_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          className={`w-3 h-3 rounded-full transition ${
            index === i ? "bg-white" : "bg-white/40"
          }`}
        />
      ))}
    </div>
  </div>
</section>


      {/* ================= TRUST BADGES ================= */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-2xl font-bold text-teal-700">10K+</h3>
            <p className="text-gray-600 text-sm">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-teal-700">100%</h3>
            <p className="text-gray-600 text-sm">Natural Products</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-teal-700">ISO</h3>
            <p className="text-gray-600 text-sm">Certified Quality</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-teal-700">COD</h3>
            <p className="text-gray-600 text-sm">Cash on Delivery</p>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT SECTIONS ================= */}
      <ProductSection title="Trending Products" products={trendingProducts} />
      <ProductSection title="New Products" products={newProducts} />
      <ProductSection title="Most Purchased" products={mostPurchased} />
    </>
  );
}
