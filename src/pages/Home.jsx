
import Header from "../components/Header";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import RecentlyViewed from "../components/RecentlyViewed";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <RecentlyViewed />
      </main>

      <Footer />
    </>
  );
}
