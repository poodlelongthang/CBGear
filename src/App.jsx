
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/mouse" element={<CategoryPage />} />
        <Route path="/keyboard" element={<CategoryPage />} />
        <Route path="/mousepad" element={<CategoryPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
