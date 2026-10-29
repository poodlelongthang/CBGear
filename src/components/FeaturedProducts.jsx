
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";
import products from "../data/products";
import { addRecentlyViewed } from "../utils/recentlyViewed";
import { addToCart } from "../utils/cart";
function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);

  function handleViewProduct() {
    addRecentlyViewed(product);
  }

  return (
    <article className="product-card">
      <div className="product-image">
        <img
          className="product-img-main"
          src={product.image}
          alt={product.name}
        />

        <img
          className="product-img-hover"
          src={product.hoverImage || product.image}
          alt=""
        />

        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}

        <button
          className={`favorite-btn ${liked ? "liked" : ""}`}
          aria-label="Yêu thích sản phẩm"
          aria-pressed={liked}
          onClick={() => setLiked((value) => !value)}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
        </button>

        
        <button
          className="quick-add"
          onClick={() => addToCart(product, 1)}
        >
          <ShoppingBag size={17} />
          Thêm vào giỏ
        </button>

      </div>

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
          onClick={handleViewProduct}
        >
          Chi tiết <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="section featured-section" id="featured">
      <div className="section-heading">
        <div>
          
          <h2>
            Sản phẩm nổi bật<span>.</span>
          </h2>
        </div>

        <Link to="/mouse" className="view-all">
          Xem tất cả <ArrowUpRight size={17} />
        </Link>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
