import { useState } from "react";
import { motion } from "motion/react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Minus,
  Heart,
  Star,
  ArrowLeft,
  Filter,
  Sparkles,
} from "lucide-react";
import { useCart } from "../context/CartContext";

// Simple mock data for different categories
const CATEGORY_DATA: Record<
  string,
  { title: string; description: string; items: any[] }
> = {
  "fruits-veggies": {
    title: "Fresh Vegetables",
    description: "Farm fresh produce delivered straight to your door.",
    items: [
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
    ],
  },
  dairy: {
    title: "Dairy & Bakery",
    description: "Fresh milk, paneer, breads, and everyday dairy essentials.",
    items: [
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
    ],
  },
  snacks: {
    title: "Snacks & Beverages",
    description: "Perfect for your evening cravings.",
    items: [
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
    ],
  },
  "ice-cream": {
    title: "Ice Cream",
    description: "Cool down with delicious frozen treats.",
    items: [
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
    ],
  },
  instant: {
    title: "Instant Food",
    description: "Quick meals ready in minutes.",
    items: [
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
    ],
  },
  "personal-care": {
    title: "Personal Care",
    description: "Daily hygiene and personal care products.",
    items: [
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
    ],
  },
  "home-essentials": {
    title: "Home Essentials",
    description:
      "Everything you need to keep your home clean and running smoothly.",
    items: [
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
    ],
  },
};

const DEFAULT_CATEGORY = {
  title: "All Products",
  description: "Explore our wide range of groceries.",
  items: [
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
  ],
};

export function Category() {
  const { id } = useParams();
  const { addToCart, cart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const categoryId = id || "";
  const categoryData = CATEGORY_DATA[categoryId] || DEFAULT_CATEGORY;

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("smart");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  let displayedItems = [...categoryData.items];

  // Apply filters
  if (filter === "under-50") {
    displayedItems = displayedItems.filter((item) => item.price < 50);
  } else if (filter === "highly-rated") {
    displayedItems = displayedItems.filter((item) => item.rating >= 4.7);
  }

  // Apply sort
  if (sortBy === "price-asc") {
    displayedItems.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    displayedItems.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    displayedItems.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "name") {
    displayedItems.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link
                to="/"
                className="p-2 rounded-full glass-card hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-300" />
              </Link>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                {categoryData.title}
              </h1>
            </div>
            <p className="text-gray-400 ml-12">{categoryData.description}</p>
          </div>

          <div className="flex items-center gap-3 ml-12 md:ml-0 relative">
            <div className="relative">
              <button
                onClick={() => {
                  setShowFilterMenu(!showFilterMenu);
                  setShowSortMenu(false);
                }}
                className={`flex items-center gap-2 glass-card px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter !== "all" || showFilterMenu ? "text-[#00eaff] border-[#00eaff]/50" : "text-gray-300 hover:text-white"}`}
              >
                <Filter className="w-4 h-4" /> Filter{" "}
                {filter !== "all" && "• 1"}
              </button>

              {showFilterMenu && (
                <div className="absolute right-0 md:right-auto md:left-0 top-full mt-2 w-48 glass-panel rounded-xl shadow-2xl border border-white/10 overflow-hidden z-30">
                  <div className="p-2 flex flex-col gap-1">
                    <button
                      onClick={() => {
                        setFilter("all");
                        setShowFilterMenu(false);
                      }}
                      className={`text-left px-3 py-2 text-sm rounded-lg hover:bg-white/5 ${filter === "all" ? "text-[#00eaff] bg-[#00eaff]/10" : "text-gray-300"}`}
                    >
                      All Products
                    </button>
                    <button
                      onClick={() => {
                        setFilter("under-50");
                        setShowFilterMenu(false);
                      }}
                      className={`text-left px-3 py-2 text-sm rounded-lg hover:bg-white/5 ${filter === "under-50" ? "text-[#00eaff] bg-[#00eaff]/10" : "text-gray-300"}`}
                    >
                      Under ₹50
                    </button>
                    <button
                      onClick={() => {
                        setFilter("highly-rated");
                        setShowFilterMenu(false);
                      }}
                      className={`text-left px-3 py-2 text-sm rounded-lg hover:bg-white/5 ${filter === "highly-rated" ? "text-[#00eaff] bg-[#00eaff]/10" : "text-gray-300"}`}
                    >
                      Highly Rated (4.7+)
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setShowSortMenu(!showSortMenu);
                  setShowFilterMenu(false);
                }}
                className="bg-[#00eaff]/10 border border-[#00eaff]/20 hover:bg-[#00eaff]/20 px-4 py-2 rounded-xl flex items-center gap-2 text-sm transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#00eaff]" />
                <span className="text-[#00eaff] font-medium whitespace-nowrap">
                  {sortBy === "smart"
                    ? "Smart Sort"
                    : sortBy === "price-asc"
                      ? "Low to High"
                      : sortBy === "price-desc"
                        ? "High to Low"
                        : sortBy === "rating"
                          ? "Highest Rated"
                          : "Name: A-Z"}
                </span>
              </button>

              {showSortMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 glass-panel rounded-xl shadow-2xl border border-white/10 overflow-hidden z-30">
                  <div className="p-2 flex flex-col gap-1">
                    <button
                      onClick={() => {
                        setSortBy("smart");
                        setShowSortMenu(false);
                      }}
                      className={`text-left px-3 py-2 text-sm rounded-lg hover:bg-white/5 ${sortBy === "smart" ? "text-[#00eaff] bg-[#00eaff]/10" : "text-gray-300"}`}
                    >
                      Smart Sort
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("price-asc");
                        setShowSortMenu(false);
                      }}
                      className={`text-left px-3 py-2 text-sm rounded-lg hover:bg-white/5 ${sortBy === "price-asc" ? "text-[#00eaff] bg-[#00eaff]/10" : "text-gray-300"}`}
                    >
                      Price: Low to High
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("price-desc");
                        setShowSortMenu(false);
                      }}
                      className={`text-left px-3 py-2 text-sm rounded-lg hover:bg-white/5 ${sortBy === "price-desc" ? "text-[#00eaff] bg-[#00eaff]/10" : "text-gray-300"}`}
                    >
                      Price: High to Low
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("rating");
                        setShowSortMenu(false);
                      }}
                      className={`text-left px-3 py-2 text-sm rounded-lg hover:bg-white/5 ${sortBy === "rating" ? "text-[#00eaff] bg-[#00eaff]/10" : "text-gray-300"}`}
                    >
                      Highest Rated
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("name");
                        setShowSortMenu(false);
                      }}
                      className={`text-left px-3 py-2 text-sm rounded-lg hover:bg-white/5 ${sortBy === "name" ? "text-[#00eaff] bg-[#00eaff]/10" : "text-gray-300"}`}
                    >
                      Name: A to Z
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {displayedItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="h-full"
            >
              <div className="glass-card rounded-2xl h-full flex flex-col relative group hover:border-[#00eaff]/30 transition-all duration-300">
                {/* Badges & Actions */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                  {product.tag ? (
                    <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-[10px] font-bold px-2 py-1 rounded-md text-white shadow-lg">
                      {product.tag}
                    </span>
                  ) : (
                    <span />
                  )}
                  <button className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-gray-300 hover:text-red-400 hover:bg-black/60 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

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

                  <div className="mt-auto flex items-end justify-between gap-2">
                    <div>
                      <div className="text-[10px] text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold text-white leading-none">
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

                    <div className="shrink-0">
                      {(() => {
                        const cartItem = cart.find((c) => c.id === product.id);
                        if (cartItem) {
                          return (
                            <div className="flex items-center gap-1 bg-white/10 rounded-xl px-2 py-1">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    product.id,
                                    cartItem.quantity - 1,
                                  )
                                }
                                className="w-7 h-7 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
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
                                className="w-7 h-7 flex items-center justify-center text-[#00eaff] hover:text-[#00eaff] transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          );
                        }
                        return (
                          <button
                            onClick={() => addToCart(product)}
                            className="w-10 h-10 rounded-xl bg-[#00eaff]/10 hover:bg-[#00eaff] text-[#00eaff] hover:text-black border border-[#00eaff]/20 hover:border-[#00eaff] flex items-center justify-center transition-all duration-300 group/btn"
                          >
                            <Plus className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                          </button>
                        );
                      })()}
                    </div>
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

        {displayedItems.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl text-white font-medium mb-2">
              No products found
            </h2>
            <p className="text-gray-400">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
