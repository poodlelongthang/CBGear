
import { useEffect, useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";

const slides = [
  {
    eyebrow: "Chuột gaming dành cho game thủ",
    title: "Razer Viper V4 Pro",
    description:
      "Tối ưu tốc độ và độ chính xác trong từng pha xử lý.",
    image: "/src/assets/hero-mouse.jpg",
    category: "MOUSE",
    link: "/mouse",
  },
  {
    eyebrow: "Tối ưu từng lần nhấn phím",
    title: "Gaming Keyboard",
    description:
      "Khám phá những mẫu bàn phím gaming với tốc độ phản hồi và trải nghiệm gõ ấn tượng.",
    image: "/src/assets/hero-keyboard.webp",
    category: "KEYBOARD",
    link: "/keyboard",
  },
  {
    eyebrow: "Nâng cấp trải nghiệm di chuột",
    title: "Pad chuột",
    description:
      "Bề mặt di chuột mượt mà, kiểm soát tốt và phù hợp với phong cách setup của bạn.",
    image: "/src/assets/hero-mousepad.webp",
    category: "MOUSEPAD",
    link: "/mousepad",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const slide = slides[activeSlide];

  return (
    <section className="hero hero-slider">
      {slides.map((item, index) => (
        <div
          className={`hero-slide ${index === activeSlide ? "active" : ""}`}
          key={item.category}
          style={{ backgroundImage: `url("${item.image}")` }}
          aria-hidden={index !== activeSlide}
        />
      ))}

      <div className="hero-overlay" />

      <div className="hero-slide-content" key={slide.category}>
        <span className="hero-slide-eyebrow">{slide.eyebrow}</span>

        <h1>{slide.title}</h1>

        <p>{slide.description}</p>

        <a href={slide.link} className="hero-slide-button">
          Xem thêm <ArrowUpRight size={18} />
        </a>
      </div>

      <div className="hero-controls">
        <div className="hero-pagination" aria-label="Chọn banner">
          {slides.map((item, index) => (
            <button
              key={item.category}
              className={`hero-dot ${
                activeSlide === index ? "active" : ""
              }`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Chuyển đến slide ${index + 1}`}
              aria-pressed={activeSlide === index}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className="hero-play-button"
          onClick={() => setIsPlaying((playing) => !playing)}
          aria-label={isPlaying ? "Tạm dừng banner" : "Phát banner"}
          title={isPlaying ? "Tạm dừng" : "Phát"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>
    </section>
  );
}
