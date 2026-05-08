import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Apple, Milk, Coffee, IceCream, Pizza, Cookie, Droplets, PenTool, Sparkles } from "lucide-react"; // Using reasonable approximations for icons

const CATEGORIES = [
  { id: "fruits-veggies", name: "Fresh Vegetables", icon: Apple, color: "from-green-400 to-emerald-600" },
  { id: "dairy", name: "Dairy & Bakery", icon: Milk, color: "from-blue-400 to-indigo-600" },
  { id: "snacks", name: "Snacks & Beverages", icon: Cookie, color: "from-orange-400 to-red-500" },
  { id: "ice-cream", name: "Ice Cream", icon: IceCream, color: "from-pink-400 to-rose-600" },
  { id: "instant", name: "Instant Food", icon: Pizza, color: "from-yellow-400 to-orange-500" },
  { id: "personal-care", name: "Personal Care", icon: Droplets, color: "from-teal-400 to-emerald-500" },
  { id: "home-essentials", name: "Home Essentials", icon: Sparkles, color: "from-purple-400 to-fuchsia-600" },
];

export function Categories() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Shop by Category</h2>
            <p className="text-gray-400">Smartly curated for your daily needs.</p>
          </div>
          <button className="text-[#00eaff] hover:text-white transition-colors flex items-center gap-1 font-medium">
            View All <span className="text-xl leading-none">→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                <Link to={`/category/${category.id}`} className="block">
                  <div className="glass-card aspect-square rounded-2xl p-4 flex flex-col items-center justify-center gap-4 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10 overflow-hidden">
                    {/* Subtle background glow on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`}></div>
                    
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg relative z-10`}>
                      <Icon className="w-7 h-7 text-white drop-shadow-md" />
                    </div>
                    <span className="font-medium text-sm text-center text-gray-200 group-hover:text-white transition-colors relative z-10">
                      {category.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
