
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "../utils/cart";

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const refreshCart = () => setCart(getCart());

    refreshCart();
    window.addEventListener("cartUpdated", refreshCart);

    return () => {
      window.removeEventListener("cartUpdated", refreshCart);
    };
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function changeQuantity(id, quantity) {
    updateCartQuantity(id, quantity);
    setCart(getCart());
  }

  function deleteProduct(id) {
    removeFromCart(id);
    setCart(getCart());
  }

  return (
    <>
      <Header />
      <main className="page-container cart-page">
        <h1>Giỏ hàng của bạn</h1>
        <p className="page-subtitle">
          Kiểm tra sản phẩm trước khi tiếp tục.
        </p>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={42} />
            <h2>Giỏ hàng đang trống</h2>
            <p>Hãy chọn một vài món gear cho góc máy của bạn.</p>
            <Link to="/" className="primary-link">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <span className="product-brand">{item.brand}</span>
                    <h2>{item.name}</h2>
                    <strong>{formatPrice(item.price)}</strong>

                    <div className="cart-item-actions">
                      <div className="quantity-control compact">
                        <button
                          aria-label="Giảm số lượng"
                          onClick={() =>
                            changeQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          aria-label="Tăng số lượng"
                          onClick={() =>
                            changeQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        className="remove-cart-item"
                        onClick={() => deleteProduct(item.id)}
                      >
                        <Trash2 size={16} /> Xóa
                      </button>
                    </div>
                  </div>

                  <strong className="cart-line-total">
                    {formatPrice(item.price * item.quantity)}
                  </strong>
                </article>
              ))}
            </div>

            <aside className="cart-summary">
              <h2>Tổng đơn hàng</h2>
              <div>
                <span>Tạm tính</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <div>
                <span>Phí vận chuyển</span>
                <span>Tính sau</span>
              </div>
              <div className="cart-total">
                <span>Tổng cộng</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button
                className="detail-add-button"
                onClick={() =>
                  alert("Chức năng thanh toán sẽ được phát triển ở bước sau.")
                }
              >
                Tiến hành thanh toán
              </button>
              <Link to="/">Tiếp tục mua sắm</Link>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
