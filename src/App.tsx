import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AIAssistant } from "./components/AIAssistant";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
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
import { DeliveryAnalytics } from "./pages/DeliveryAnalytics";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen relative selection:bg-[#00eaff]/30 selection:text-white text-slate-50">
          {/* Ambient Glowing Background Layer */}
          <div className="fixed inset-0 z-[-1] bg-[var(--color-background)] overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/10 blur-[120px] mix-blend-screen"></div>
            <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/10 blur-[150px] mix-blend-screen"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-blue-500/10 blur-[150px] mix-blend-screen"></div>
            <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-fuchsia-500/10 blur-[120px] mix-blend-screen"></div>
            
            {/* Subtle noise overlay for texture */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
          </div>

          <div className="relative z-0">
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
              <Route path="/analytics" element={<DeliveryAnalytics />} />
              {/* Add more routes later (Dashboard, Admin) */}
            </Routes>
            <Footer />
            <AIAssistant />
          </div>
        </div>
      </CartProvider>
    </Router>
  );
}
