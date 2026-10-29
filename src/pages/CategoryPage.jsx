
import { useMemo, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import products from "../data/products";

const categoryInfo = {
  mouse: {
    title: "Chuột Gaming - Nhẹ, Chuẩn Form, Aim Tốt",
    description:
      "Khám phá những mẫu chuột gaming phù hợp với tốc độ, phong cách chơi và góc máy của bạn.",
    banner:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1800&q=85",
  },
  keyboard: {
    title: "Bàn phím Gaming - Phản Hồi Nhanh, Gõ Chính Xác",
    description:
      "Khám phá bàn phím gaming dành cho trải nghiệm gõ và chiến game của bạn.",
    banner:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1800&q=85",
  },
  mousepad: {
    title: "Mousepad - Hoàn Thiện Góc Máy",
    description:
      "Lựa chọn bề mặt di chuột phù hợp với phong cách chơi của bạn.",
    banner:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1800&q=85",
  },
};

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

export default function CategoryPage() {
  const { category: routeCategory } = useParams();
  const location = useLocation();

  const category =
    routeCategory ||
    ({
      "/mouse": "mouse",
      "/keyboard": "keyboard",
      "/mousepad": "mousepad",
    }[location.pathname] || "");

  const [maxPrice, setMaxPrice] = useState("all");
  const [sort, setSort] = useState("default");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [openFilters, setOpenFilters] = useState({
    brand: true,
    price: true,
  });

  const info = categoryInfo[category];

  const categoryProducts = useMemo(
    () => products.filter((product) => product.category === category),
    [category]
  );

  const brands = useMemo(
    () => [...new Set(categoryProducts.map((product) => product.brand))],
    [categoryProducts]
  );

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    if (maxPrice !== "all") {
      result = result.filter(
        (product) => product.price <= Number(maxPrice)
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (sort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name, "vi"));
    }

    return result;
  }, [categoryProducts, maxPrice, selectedBrands, sort]);

  function toggleBrand(brand) {
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand]
    );
  }

  function toggleFilter(name) {
    setOpenFilters((current) => ({
      ...current,
      [name]: !current[name],
    }));
  }

  if (!info) {
    return (
      <>
        <Header />
        <main className="page-container">
          <h1>Danh mục không tồn tại</h1>
          <Link to="/">Về trang chủ</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="catalog-page">
        <section
          className="catalog-banner"
          style={{ backgroundImage: `url("${info.banner}")` }}
        >
          <div className="catalog-banner-content">
            <span className="catalog-eyebrow">CBGEAR GAMING GEAR</span>
            <h1>{info.title}</h1>
            <p>{info.description}</p>
          </div>
        </section>

        <div className="catalog-layout">
          <aside className="catalog-sidebar">
            <h2 className="catalog-filter-title">
              <SlidersHorizontal size={17} />
              Lọc sản phẩm
            </h2>

            <section className="catalog-filter-section">
              <button
                className="catalog-filter-heading"
                onClick={() => toggleFilter("brand")}
              >
                Thương hiệu
                <ChevronDown
                  size={16}
                  className={openFilters.brand ? "filter-chevron open" : "filter-chevron"}
                />
              </button>

              {openFilters.brand && (
                <div className="catalog-filter-options">
                  {brands.map((brand) => (
                    <label key={brand} className="catalog-filter-option">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              )}
            </section>

            <section className="catalog-filter-section">
              <button
                className="catalog-filter-heading"
                onClick={() => toggleFilter("price")}
              >
                Giá tối đa
                <ChevronDown
                  size={16}
                  className={openFilters.price ? "filter-chevron open" : "filter-chevron"}
                />
              </button>

              {openFilters.price && (
                <div className="catalog-filter-options">
                  {[
                    ["all", "Tất cả mức giá"],
                    ["500000", "Đến 500.000₫"],
                    ["1000000", "Đến 1.000.000₫"],
                    ["1500000", "Đến 1.500.000₫"],
                    ["2000000", "Đến 2.000.000₫"],
                  ].map(([value, label]) => (
                    <label key={value} className="catalog-filter-option">
                      <input
                        type="radio"
                        name="maxPrice"
                        checked={maxPrice === value}
                        onChange={() => setMaxPrice(value)}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              )}
            </section>

            <button
              className="catalog-reset"
              onClick={() => {
                setMaxPrice("all");
                setSelectedBrands([]);
                setSort("default");
              }}
            >
              Xóa bộ lọc
            </button>
          </aside>

          <section className="catalog-results">
            <div className="catalog-results-toolbar">
              <span>
                <strong>{filteredProducts.length}</strong> sản phẩm
              </span>

              <label className="catalog-sort">
                Sắp xếp:
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="default">Nổi bật</option>
                  <option value="low-high">Giá tăng dần</option>
                  <option value="high-low">Giá giảm dần</option>
                  <option value="name">Tên A–Z</option>
                </select>
              </label>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="catalog-empty">
                Không có sản phẩm phù hợp với bộ lọc.
              </div>
            ) : (
              <div className="catalog-product-grid">
                {filteredProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <Link
                      to={`/product/${product.id}`}
                      className="catalog-product-image"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                      />
                      {product.badge && (
                        <span className="catalog-product-badge">
                          {product.badge}
                        </span>
                      )}
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
                        Xem chi tiết <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
