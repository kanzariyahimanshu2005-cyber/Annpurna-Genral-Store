import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Categories } from "./components/Categories";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { AIFeaturesBanner } from "./components/AIFeaturesBanner";
import { Footer } from "./components/Footer";
import { Cart } from "./pages/Cart";
import { OrderDetails } from "./pages/OrderDetails";
import { Category } from "./pages/Category";
import { Checkout } from "./pages/Checkout";
import { ProductDetails } from "./pages/ProductDetails";
import { MyOrders } from "./pages/MyOrders";
import { About } from "./pages/About";
import { Careers } from "./pages/Careers";
import { Contact } from "./pages/Contact";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { CartProvider } from "./context/CartContext";

// Homepage Component combining all sections
function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <AIFeaturesBanner />
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-[var(--color-background)] selection:bg-[#00eaff]/30 selection:text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            {/* Add more routes later (Dashboard, Admin) */}
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}
