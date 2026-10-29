
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a href="/" className="logo">
            CBGear
            <small>LEVEL UP YOUR GAME</small>
          </a>
          <p>
            Phân phối chính hãng.
          </p>
        </div>

        <div className="footer-column">
          <h4>SẢN PHẨM</h4>
          <a href="/mouse">Gaming Mouse</a>
          <a href="/keyboard">Gaming Keyboard</a>
          <a href="/mousepad">Mousepad</a>
        </div>

        <div className="footer-column">
          <h4>HỖ TRỢ</h4>
          <a href="#support">Chính sách bảo hành</a>
          <a href="#support">Hướng dẫn mua hàng</a>
          <a href="#support">Liên hệ</a>
        </div>

        <div className="footer-column">
          <h4></h4>
          <p></p>
          <a href="#newsletter" className="footer-link">
            Khám phá thêm <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 CBGear.</span>
        <span>BUILT FOR THE NEXT LEVEL.</span>
      </div>
    </footer>
  );
}
