import { useState } from "react";
import { motion } from "motion/react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  Check,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";
import { useCart } from "../context/CartContext";

// Reuse the same DB for simplicity, or we would normally fetch this
// Flatten the CATEGORY_DATA items
import { Category } from "./Category";
const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Amul Taaza Toned Milk",
    volume: "1 L",
    price: 72,
    originalPrice: 75,
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=500&auto=format&fit=crop",
    tag: "10 MINS",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Maggi 2-Minute Noodles",
    volume: "140 g",
    price: 28,
    originalPrice: 30,
    image:
      "https://www.bigbasket.com/media/uploads/p/l/266160_19-maggi-2-minute-instant-noodles-masala.jpg",
    tag: "BESTSELLER",
    rating: 4.9,
    aiAdjusted: true,
  },
  {
    id: 3,
    name: "Farm Fresh Tomatoes",
    volume: "500 g",
    price: 35,
    originalPrice: 45,
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=500&auto=format&fit=crop",
    tag: "FRESH",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Lay's India's Magic Masala",
    volume: "90 g",
    price: 35,
    originalPrice: 40,
    image:
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=500&auto=format&fit=crop",
    tag: "TRENDING",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Aashirvaad Whole Wheat Atta",
    volume: "5 kg",
    price: 260,
    originalPrice: 300,
    image:
      "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?q=80&w=500&auto=format&fit=crop",
    tag: "20% OFF",
    rating: 4.9,
  },
  {
    id: 101,
    name: "Fresh Red Apples",
    volume: "1 kg",
    price: 150,
    originalPrice: 180,
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?q=80&w=500&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: 102,
    name: "Bananas (Robusta)",
    volume: "1/2 Dozen",
    price: 40,
    originalPrice: 50,
    image:
      "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?q=80&w=500&auto=format&fit=crop",
    rating: 4.5,
  },
  {
    id: 103,
    name: "Green Capsicum",
    volume: "500 g",
    price: 60,
    originalPrice: 80,
    image:
      "https://images.unsplash.com/photo-1563514981141-8f837da6b9c9?q=80&w=500&auto=format&fit=crop",
    rating: 4.6,
  },
  {
    id: 104,
    name: "Potatoes",
    volume: "1 kg",
    price: 45,
    originalPrice: 50,
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=500&auto=format&fit=crop",
    tag: "ESSENTIAL",
    rating: 4.9,
    aiAdjusted: true,
  },
  {
    id: 105,
    name: "Red Onions",
    volume: "1 kg",
    price: 55,
    originalPrice: 65,
    image:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=500&auto=format&fit=crop",
    rating: 4.7,
  },
  {
    id: 106,
    name: "Fresh Carrots",
    volume: "500 g",
    price: 30,
    originalPrice: 40,
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=500&auto=format&fit=crop",
    tag: "FRESH",
    rating: 4.8,
  },
  {
    id: 107,
    name: "Broccoli",
    volume: "1 pc",
    price: 80,
    originalPrice: 95,
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?q=80&w=500&auto=format&fit=crop",
    rating: 4.5,
  },
  {
    id: 201,
    name: "Amul Malai Paneer",
    volume: "200 g",
    price: 85,
    originalPrice: 90,
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc3?q=80&w=500&auto=format&fit=crop",
    rating: 4.7,
  },
  {
    id: 202,
    name: "Amul Butter",
    volume: "100 g",
    price: 58,
    originalPrice: 60,
    image:
      "https://images.unsplash.com/photo-1588195538328-92e1069eb070?q=80&w=500&auto=format&fit=crop",
    rating: 4.9,
  },
  {
    id: 203,
    name: "Britannia Multigrain Bread",
    volume: "400 g",
    price: 50,
    originalPrice: 55,
    image:
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=500&auto=format&fit=crop",
    rating: 4.5,
  },
  {
    id: 204,
    name: "Fresh Eggs",
    volume: "6 pcs",
    price: 45,
    originalPrice: 50,
    image:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=500&auto=format&fit=crop",
    tag: "FRESH",
    rating: 4.6,
  },
  {
    id: 301,
    name: "Kurkure Masala Munch",
    volume: "90 g",
    price: 20,
    originalPrice: 20,
    image:
      "https://images.unsplash.com/photo-1599507593450-716b9b32b904?q=80&w=500&auto=format&fit=crop",
    rating: 4.5,
  },
  {
    id: 302,
    name: "Coca-Cola Original",
    volume: "750 ml",
    price: 40,
    originalPrice: 40,
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=500&auto=format&fit=crop",
    tag: "BESTSELLER",
    rating: 4.8,
  },
  {
    id: 303,
    name: "Real Fruit Power Tropicana Juice",
    volume: "1 L",
    price: 110,
    originalPrice: 120,
    image:
      "https://images.unsplash.com/photo-1622597467836-f3083db462d7?q=80&w=500&auto=format&fit=crop",
    rating: 4.7,
  },
  {
    id: 401,
    name: "Kwality Wall's Cornetto Double Chocolate",
    volume: "1 pc",
    price: 60,
    originalPrice: 60,
    image:
      "https://images.unsplash.com/photo-1558500204-c361427c38ac?q=80&w=500&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: 402,
    name: "Vadilal Vanilla Ice Cream",
    volume: "1 L",
    price: 180,
    originalPrice: 220,
    image:
      "https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?q=80&w=500&auto=format&fit=crop",
    rating: 4.6,
  },
  {
    id: 403,
    name: "Amul Frostik Ice Cream Stick",
    volume: "1 pc",
    price: 35,
    originalPrice: 40,
    image: "https://images.unsplash.com/photo-1557142046-c704a3adf364?q=80&w=500&auto=format&fit=crop",
    rating: 4.5,
  },
  {
    id: 404,
    name: "Magnum Almond Ice Cream",
    volume: "80 ml",
    price: 90,
    originalPrice: 100,
    image: "https://images.unsplash.com/photo-1570197781417-0c7f2129cde1?q=80&w=500&auto=format&fit=crop",
    tag: "PREMIUM",
    rating: 4.9,
  },
  {
    id: 405,
    name: "Baskin Robbins Butterscotch Ribbon",
    volume: "500 ml",
    price: 290,
    originalPrice: 320,
    image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?q=80&w=500&auto=format&fit=crop",
    rating: 4.7,
  },
  {
    id: 501,
    name: "Colgate Strong Teeth Toothpaste",
    volume: "200 g",
    price: 110,
    originalPrice: 120,
    image:
      "https://images.unsplash.com/photo-1556228578-8d89b6acd8fa?q=80&w=500&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: 502,
    name: "Dove Beauty Bathing Bar",
    volume: "3x100 g",
    price: 165,
    originalPrice: 180,
    image:
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=500&auto=format&fit=crop",
    tag: "POPULAR",
    rating: 4.6,
  },
  {
    id: 601,
    name: "Surf Excel Easy Wash Detergent Powder",
    volume: "1 kg",
    price: 130,
    originalPrice: 150,
    image:
      "https://images.unsplash.com/photo-1584824388155-24bf47b33783?q=80&w=500&auto=format&fit=crop",
    rating: 4.5,
  },
  {
    id: 602,
    name: "Vim Dishwash Liquid Gel Lemon",
    volume: "250 ml",
    price: 55,
    originalPrice: 60,
    image:
      "https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?q=80&w=500&auto=format&fit=crop",
    tag: "BESTSELLER",
    rating: 4.7,
  },
];

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart, updateQuantity } = useCart();
  const [isShared, setIsShared] = useState(false);

  const product =
    ALL_PRODUCTS.find((p) => p.id === parseInt(id || "1")) || ALL_PRODUCTS[0];
  const itemInCart = cart.find((c) => c.id === product.id);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on Annpurna General Store!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Link
        to={-1 as any}
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors glass-card px-4 py-2 rounded-xl"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </Link>

      <div className="glass-panel p-6 md:p-10 rounded-3xl border border-white/5">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Photo in a product */}
          <div className="relative group rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center p-12 min-h-[400px]">
            {product.tag && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-violet-600 text-xs font-bold px-3 py-1.5 rounded-lg text-white shadow-lg z-10">
                {product.tag}
              </span>
            )}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button className="p-2.5 rounded-lg bg-black/40 backdrop-blur-md text-gray-300 hover:text-red-400 hover:bg-black/60 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button 
                onClick={handleShare}
                className="p-2.5 rounded-lg bg-black/40 backdrop-blur-md text-gray-300 hover:text-[#00eaff] hover:bg-black/60 transition-colors"
                title="Share product"
              >
                {isShared ? <Check className="w-5 h-5 text-green-400" /> : <Share2 className="w-5 h-5" />}
              </button>
            </div>

            {/* The Photo */}
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={product.image}
              alt={product.name}
              className="w-full max-w-sm object-cover drop-shadow-2xl rounded-xl"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-md text-sm font-semibold">
                <Star className="w-4 h-4 fill-current mr-1" /> {product.rating}
              </div>
              <span className="text-gray-400 text-sm">| 1,234 Ratings</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 tracking-tight">
              {product.name}
            </h1>
            <p className="text-gray-400 text-lg mb-6">{product.volume}</p>

            <div className="flex items-end gap-3 mb-8">
              <span className="text-4xl font-bold text-[#00eaff] flex items-center gap-2">
                ₹{product.price}
                {product.aiAdjusted && (
                  <div className="flex items-center gap-1 bg-[#8a2be2]/20 px-2 py-1 rounded text-sm text-[#8a2be2] border border-[#8a2be2]/20 font-medium whitespace-nowrap mt-1">
                    <Sparkles className="w-4 h-4" />
                    AI Adjusted Status
                  </div>
                )}
              </span>
              <span className="text-lg text-gray-500 line-through mb-1">
                ₹{product.originalPrice}
              </span>
              <span className="text-green-400 font-medium mb-1 ml-2">
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100,
                )}
                % OFF
              </span>
            </div>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-sm text-gray-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                <Truck className="w-5 h-5 text-[#00eaff]" />
                <span>
                  Superfast delivery in{" "}
                  <strong className="text-white">10 minutes</strong>
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                <span>100% Genuine and AI Quality Checked product</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              {itemInCart ? (
                <div className="flex-1 flex items-center justify-between bg-white/10 p-2 rounded-xl border border-white/10 h-14">
                  <button
                    onClick={() =>
                      updateQuantity(product.id, itemInCart.quantity - 1)
                    }
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-300 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="font-bold text-xl text-white">
                    {itemInCart.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(product.id, itemInCart.quantity + 1)
                    }
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 text-[#00eaff] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 h-14 flex items-center justify-center gap-2 bg-[#00eaff]/10 hover:bg-[#00eaff]/20 text-[#00eaff] border border-[#00eaff]/30 rounded-xl font-semibold transition-colors"
                >
                  <Plus className="w-5 h-5" /> Add to Cart
                </button>
              )}
              <button
                onClick={() => {
                  if (!itemInCart) addToCart(product);
                  navigate("/cart");
                }}
                className="flex-1 h-14 flex items-center justify-center bg-gradient-to-r from-[#00eaff] to-[#0055ff] hover:from-[#00b3cc] hover:to-[#0044cc] text-white rounded-xl font-bold shadow-[0_0_20px_rgba(0,85,255,0.3)] transition-all"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-8 glass-panel p-6 md:p-10 rounded-3xl border border-white/5">
        <h2 className="text-xl font-bold text-white mb-4">Product Details</h2>
        <div className="text-gray-400 space-y-4 leading-relaxed">
          <p>
            Experience the finest quality with <strong>{product.name}</strong>.
            Meticulously sourced from the best farms, our products undergo a
            rigorous AI-driven visual inspection process to ensure you only get
            the freshest and safest groceries.
          </p>
          <p>
            Packed with essential nutrients and flavor, this product conforms to
            the highest standards of our{" "}
            <span className="text-[#00eaff]">Annpurna Quality Guarantee</span>.
            Your health is our top priority.
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
            <li>Sourced locally and sustainably.</li>
            <li>No artificial preservatives added.</li>
            <li>Hygienically packed to retain freshness.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
