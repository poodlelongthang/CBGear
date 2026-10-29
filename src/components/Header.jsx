
import { Link,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCartCount } from "../utils/cart";
import {
  Search,
  ShoppingCart,
  UserRound,
  Menu,
  X,
} from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
const isHomePage = location.pathname === "/";
const [cartCount, setCartCount] = useState(0);

useEffect(() => {
  const updateCount = () => setCartCount(getCartCount());

  updateCount();
  window.addEventListener("cartUpdated", updateCount);

  return () => {
    window.removeEventListener("cartUpdated", updateCount);
  };
}, []);
  return (
    
<header
  className={`site-header ${
    isHomePage
      ? "header-home"
      : ["/mouse", "/keyboard", "/mousepad"].includes(location.pathname)
      ? "header-category"
      : "header-inner-page"
  }`}
>

      <div className="header-inner">
        <Link to="/" className="logo">
          CBGear
          
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Mở menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Trang chủ
          </Link>
          <Link to="/mouse" onClick={() => setMenuOpen(false)}>
            Chuột
          </Link>
          <Link to="/keyboard" onClick={() => setMenuOpen(false)}>
            Bàn phím
          </Link>
          <Link to="/mousepad" onClick={() => setMenuOpen(false)}>
            Lót chuột
          </Link>
          <a href="#featured" onClick={() => setMenuOpen(false)}>
            Khuyến mãi
          </a>
        </nav>

        <div className="header-actions">
          <button aria-label="Tìm kiếm">
            <Search />
          </button>
          
            <Link to="/cart" className="header-cart-link" aria-label={`Giỏ hàng, ${cartCount} sản phẩm`}>
            <ShoppingCart />
            {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
            )}
            </Link>

          <button aria-label="Tài khoản">
            <UserRound />
          </button>
        </div>
      </div>
    </header>
  );
}
