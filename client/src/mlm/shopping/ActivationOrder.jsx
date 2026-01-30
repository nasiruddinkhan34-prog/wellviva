import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./product.css";

export default function ActivationOrder() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "DuroSlim Shake 500 gm",
    image: "/products/duroslim.png",
    dp: 1399,
    bv: 973,
  },
  {
    id: 2,
    name: "FemiFirst Capsule 30 none",
    image: "/products/femifirst.png",
    dp: 360,
    bv: 252,
  },
  {
    id: 3,
    name: "Haldi Chandan Face wash 100 ml",
    image: "/products/haldi.png",
    dp: 225,
    bv: 90,
  },
];

  return (
    <div className="p-6">
      {/* Top Search Bar */}
      <div className="flex justify-center gap-3 mb-6">
        <input
          className="border px-4 py-2 w-72 rounded"
          placeholder="Type to Search Product"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="btn-search">Search Product</button>
        <button className="btn-cart" onClick={() => navigate("/mlm/shopping/view-cart")}>
          View Cart
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MOCK_PRODUCTS.map(p => (
          <div key={p.id} className="product-card">
            <div className="image-wrap">
              <img src={p.image} alt={p.name} />
              <div className="price-overlay">₹ {p.dp}</div>
            </div>

            <h3 className="product-title">{p.name}</h3>

            <div className="price-bar">
              <span>DP : ₹ {p.dp}</span>
              <span>BV : {p.bv}</span>
            </div>

            <button className="btn-add">Add To Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
