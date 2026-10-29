
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getRecentlyViewed } from "../utils/recentlyViewed";

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

export default function RecentlyViewed() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const updateProducts = () => {
      setProducts(getRecentlyViewed());
    };

    updateProducts();

    window.addEventListener("recentlyViewedUpdated", updateProducts);

    return () => {
      window.removeEventListener(
        "recentlyViewedUpdated",
        updateProducts
      );
    };
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="section recently-viewed">
      <div className="section-heading">
        <div>
          
          <h2>
            Sản phẩm vừa xem<span>.</span>
          </h2>
        </div>

        <button
          className="view-all"
          onClick={() => {
            localStorage.removeItem("cbgear_recently_viewed");
            setProducts([]);
          }}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          Xóa lịch sử
        </button>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <Link
              to={`/product/${product.id}`}
              className="recent-product-image"
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
              />
            </Link>

            <div className="product-info">
              <span className="product-brand">{product.brand}</span>
              <h3>{product.name}</h3>

              <div className="product-price">
                <strong>{formatPrice(product.price)}</strong>
                {product.oldPrice && (
                  <del>{formatPrice(product.oldPrice)}</del>
                )}
              </div>

              <Link
                to={`/product/${product.id}`}
                className="product-detail-link"
              >
                Xem sản phẩm <ArrowUpRight size={15} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
