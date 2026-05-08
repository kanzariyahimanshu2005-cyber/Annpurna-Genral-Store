import { motion } from "motion/react";
import { Plus, Minus, Heart, Star, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

const PRODUCTS = [
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
    id: 5,
    name: "Aashirvaad Whole Wheat Atta",
    volume: "5 kg",
    price: 260,
    originalPrice: 300,
    image:
      "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?q=80&w=500&auto=format&fit=crop", // placeholder flour
    tag: "20% OFF",
    rating: 4.9,
  },
];

export function FeaturedProducts() {
  const { addToCart, cart, updateQuantity } = useCart();
  const navigate = useNavigate();

  return (
    <section id="featured-products" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-[#8a2be2]/20 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-[#8a2be2]" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                AI Recommended For You
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Based on your recent neighborhood trends.
              </p>
            </div>
          </div>
          <div className="hidden lg:flex gap-2">
            <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors">
              <span className="text-xl">←</span>
            </button>
            <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors text-[#00eaff]">
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide py-4 -my-4">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex-none w-[240px] md:w-[260px] snap-start"
            >
              <div className="glass-card rounded-2xl h-full flex flex-col relative group hover:border-[#00eaff]/30 transition-all duration-300">
                {/* Badges & Actions */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                  <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-[10px] font-bold px-2 py-1 rounded-md text-white shadow-lg">
                    {product.tag}
                  </span>
                  <button className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-gray-300 hover:text-red-400 hover:bg-black/60 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Image */}
                <Link
                  to={`/product/${product.id}`}
                  className="block h-48 py-6 px-4 w-full flex flex-col items-center justify-center cursor-pointer mt-2 z-10 transition-transform"
                >
                  <div className="w-28 h-28 relative">
                    {/* Background glow behind product */}
                    <div className="absolute inset-0 bg-white/5 rounded-full blur-xl group-hover:bg-[#00eaff]/10 transition-colors"></div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 rounded-lg"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-1 border-t border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent rounded-b-2xl">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 text-yellow-400" fill="#facc15" />
                    <span className="text-xs text-gray-300 font-medium">
                      {product.rating}
                    </span>
                  </div>

                  <h3 className="text-[15px] font-medium text-gray-100 leading-tight mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">{product.volume}</p>

                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <div className="text-[10px] text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold text-white leading-none flex items-center gap-1">
                          ₹{product.price}
                        </div>
                        {product.aiAdjusted && (
                          <div className="flex items-center gap-1 bg-[#8a2be2]/20 px-1.5 py-0.5 rounded text-[10px] text-[#8a2be2] border border-[#8a2be2]/20 font-medium whitespace-nowrap">
                            <Sparkles className="w-3 h-3" />
                            AI Price
                          </div>
                        )}
                      </div>
                    </div>

                    {(() => {
                      const cartItem = cart.find((c) => c.id === product.id);
                      if (cartItem) {
                        return (
                          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-2 py-1">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  cartItem.quantity - 1,
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-bold text-white w-4 text-center">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  cartItem.quantity + 1,
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center text-[#00eaff] hover:text-[#00eaff] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      }
                      return (
                        <button
                          onClick={() => addToCart(product)}
                          className="w-9 h-9 rounded-xl bg-[#00eaff]/10 hover:bg-[#00eaff] text-[#00eaff] hover:text-black border border-[#00eaff]/20 hover:border-[#00eaff] flex items-center justify-center transition-all duration-300 group/btn"
                        >
                          <Plus className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                        </button>
                      );
                    })()}
                  </div>

                  <button
                    onClick={() => {
                      if (!cart.find((c) => c.id === product.id)) {
                        addToCart(product);
                      }
                      navigate("/cart");
                    }}
                    className="w-full mt-3 bg-gradient-to-r from-[#00eaff]/20 to-[#0055ff]/20 hover:from-[#00eaff]/40 hover:to-[#0055ff]/40 text-white border border-[#00eaff]/30 py-2 rounded-xl text-sm font-medium transition-all text-center"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
