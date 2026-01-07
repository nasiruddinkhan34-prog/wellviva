import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/*                            Product Detail Page                             */
/* -------------------------------------------------------------------------- */

const ProductDetail = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  /* -------------------------------------------------------------------------- */
  /*                               API FETCH                                    */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Replace with real API later
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();

        setProduct(data);
        setActiveImage(data.images?.[0] || "");
      } catch (error) {
        console.error("Failed to load product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  /* -------------------------------------------------------------------------- */
  /*                               UI STATES                                    */
  /* -------------------------------------------------------------------------- */

  if (loading) return <div className="pd-loading">Loading product...</div>;
  if (!product) return <div className="pd-error">Product not found</div>;

  /* -------------------------------------------------------------------------- */
  /*                                   JSX                                      */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="product-detail-container">
      {/* ===================== TOP SECTION ===================== */}
      <div className="product-top">
        {/* ---------- IMAGE GALLERY ---------- */}
        <div className="product-gallery">
          <img
            src={activeImage}
            alt={product.name}
            className="main-image"
          />

          <div className="thumbnail-row">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumbnail"
                className={`thumbnail ${
                  activeImage === img ? "active" : ""
                }`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>

        {/* ---------- PRODUCT INFO ---------- */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>

          <div className="rating-row">
            <span className="rating">⭐ {product.rating}</span>
            <span className="review-count">
              ({product.reviews.length} Reviews)
            </span>
          </div>

          <div className="price-section">
            <span className="price">₹{product.price}</span>
            {product.mrp && (
              <span className="mrp">₹{product.mrp}</span>
            )}
          </div>

          {/* MLM POINTS */}
          <div className="mlm-points">
            <strong>BV:</strong> {product.bv} |
            <strong> PV:</strong> {product.pv}
          </div>

          <p className="short-description">
            {product.shortDescription}
          </p>

          {/* CTA */}
          <div className="cta-buttons">
            <button className="btn primary">Add to Cart</button>
            <button className="btn secondary">Buy Now</button>
          </div>
        </div>
      </div>

      {/* ===================== DESCRIPTION ===================== */}
      <section className="product-section">
        <h2>Description</h2>
        <p>{product.description}</p>
      </section>

      {/* ===================== SPECIFICATIONS ===================== */}
      <section className="product-section">
        <h2>Specifications</h2>
        <table className="spec-table">
          <tbody>
            {Object.entries(product.specifications || {}).map(
              ([key, value]) => (
                <tr key={key}>
                  <td className="spec-key">{key}</td>
                  <td className="spec-value">{value}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>

      {/* ===================== REVIEWS ===================== */}
      <section className="product-section">
        <h2>Customer Reviews</h2>

        {product.reviews.length === 0 && (
          <p>No reviews yet.</p>
        )}

        {product.reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <strong>{review.user}</strong>
              <span>⭐ {review.rating}</span>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </section>

      {/* ===================== MLM COMMISSION ===================== */}
      <section className="product-section highlight">
        <h2>MLM Earnings</h2>
        <ul>
          <li>Direct Referral: ₹{product.commission.direct}</li>
          <li>Level Income: ₹{product.commission.level}</li>
          <li>Repurchase Income: ₹{product.commission.repurchase}</li>
        </ul>
      </section>
    </div>
  );
};

export default ProductDetail;
