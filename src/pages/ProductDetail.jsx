
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Minus, Plus } from "lucide-react";
import products from "../data/products";
import { addToCart } from "../utils/cart";
import { addRecentlyViewed } from "../utils/recentlyViewed";
import Header from "../components/Header";
import Footer from "../components/Footer";

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  if (!product) {
    return (
      <>
        <Header />
        <main className="page-container">
          <h1>Không tìm thấy sản phẩm</h1>
          <Link to="/">Quay lại trang chủ</Link>
        </main>
        <Footer />
      </>
    );
  }

  function handleAddToCart() {
    addToCart(product, quantity);
    addRecentlyViewed(product);
    setMessage("Đã thêm sản phẩm vào giỏ hàng!");
  }

  return (
    <>
      <Header />
      <main className="page-container product-detail-page">
        <Link to="/" className="back-link">
          <ArrowLeft size={17} /> Về trang chủ
        </Link>

        <div className="product-detail-layout">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <span className="product-brand">{product.brand}</span>
            <h1>{product.name}</h1>

           

            <div className="product-detail-price">
              <strong>{formatPrice(product.price)}</strong>
              {product.oldPrice && (
                <del>{formatPrice(product.oldPrice)}</del>
              )}
            </div>

            <p>
              Sản phẩm gaming gear được lựa chọn cho góc máy CBGear.
              Xem thông số và mô tả chi tiết khi bạn bổ sung dữ liệu sản phẩm.
            </p>

            <div className="quantity-control">
              <span>Số lượng</span>
              <div>
                <button
                  aria-label="Giảm số lượng"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button
                  aria-label="Tăng số lượng"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button className="detail-add-button" onClick={handleAddToCart}>
              <ShoppingCart size={18} />
              Thêm vào giỏ hàng
            </button>

            {message && <p className="cart-success-message">{message}</p>}

            <Link to="/cart" className="go-to-cart-link">
              Xem giỏ hàng
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
