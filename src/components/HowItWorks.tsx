import { motion } from "motion/react";
import { ShoppingCart, BrainCircuit, Rocket, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: ShoppingCart,
    title: "1. Shop or Ask AI",
    description: "Browse thousands of products manually or tell our AI assistant what you need.",
    color: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
    link: "/category/groceries"
  },
  {
    icon: BrainCircuit,
    title: "2. AI Optimization",
    description: "Our AI optimizes your cart for the best prices, nutrition, and deals.",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    link: "/cart"
  },
  {
    icon: CreditCard,
    title: "3. Quick Checkout",
    description: "Secure payment with smart subscription options for repeat items.",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
    link: "/checkout"
  },
  {
    icon: Rocket,
    title: "4. Fast Delivery",
    description: "Choose standard, express, or experimental drone delivery to your door.",
    color: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
    link: "/analytics"
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative cursor-default">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00eaff] to-purple-500">Works</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Experience the future of grocery shopping. Let AI handle the heavy lifting while you enjoy seamless, hyper-fast deliveries.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative group h-full"
          >
            {/* Connection Line */}
            {index !== steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-white/10 z-10 pointer-events-none"></div>
            )}
            
            <Link to={step.link} className="block h-full glass-panel p-8 rounded-3xl border border-white/5 hover:border-[#00eaff]/30 transition-colors text-center cursor-pointer">
              <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className={`w-10 h-10 ${step.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00eaff] transition-colors">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
