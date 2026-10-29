
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import mouseImage from "../assets/category-mouse.jpg";
import keyboardImage from "../assets/category-keyboard.webp";
import mousepadImage from "../assets/category-mousepad.webp";

const categories = [
  {
    id: 1,
    name: "Gaming Mouse",
    subtitle: "",
    number: "",
    image: mouseImage,
    link: "/mouse",
  },
  {
    id: 2,
    name: "Gaming Keyboard",
    subtitle: "",
    number: "",
    image: keyboardImage,
    link: "/keyboard",
  },
  {
    id: 3,
    name: "Mousepad",
    subtitle: "",
    number: "",
    image: mousepadImage,
    link: "/mousepad",
  },
];

export default function Categories() {
  return (
    <section className="section categories-section" id="categories">
      <div className="section-heading">
        <div>
          
          <h2>
            Danh mục chính<span>.</span>
          </h2>
        </div>

        
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            to={category.link}
            className="category-card"
            key={category.id}
          >
            <img src={category.image} alt={category.name} />

            <div className="category-overlay" />

            <span className="category-number">
              {category.number}
            </span>

            <div className="category-info">
              <span>{category.subtitle}</span>
              <h3>{category.name}</h3>
            </div>

            <span className="category-arrow">
              <ArrowUpRight size={20} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
