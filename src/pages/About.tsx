import { motion } from "motion/react";
import { Store, Zap, Heart, ShieldCheck } from "lucide-react";

export function About() {
  return (
    <div className="pt-32 pb-20 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00eaff]/10 text-[#00eaff] border border-[#00eaff]/20 text-sm font-bold uppercase tracking-wider mb-6">
          Our Story
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
          Redefining How India <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00eaff] to-[#0055ff]">Buys Groceries.</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Annpurna General Store started with a simple vision: to combine the trust of your local kirana with the speed and intelligence of modern AI technology. Today, we deliver freshness in 10 minutes.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {[
          { icon: Zap, title: "10-Min Delivery", desc: "Our localized dark stores ensure your order reaches you before the water boils." },
          { icon: Heart, title: "Farm Fresh", desc: "We source directly from local farmers, ensuring premium quality and fair prices." },
          { icon: Store, title: "Your Local Kirana", desc: "We retain the warmth and trust of your neighborhood store, powered by tech." },
          { icon: ShieldCheck, title: "AI Verified", desc: "Every item is quality-checked using advanced computer vision before dispatch." }
        ].map((feature, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 rounded-2xl border-t border-t-white/10"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
              <feature.icon className="w-6 h-6 text-[#00eaff]" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12 border border-[#00eaff]/20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a111a] to-[#001122] z-0"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop')] opacity-10 mix-blend-overlay z-0"></div>
        
        <div className="relative z-10 md:w-1/2">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Built for the Future. <br/>Rooted in Tradition.</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            We are not just another delivery app. Annpurna is a lifestyle upgrade. By predicting your needs, offering personalized health insights, and optimizing our supply chain with generative AI, we're reducing food waste and making premium groceries accessible to everyone.
          </p>
          <div className="flex gap-4">
             <div className="text-center border-r border-white/10 pr-6">
                <div className="text-3xl font-bold text-[#00eaff]">50k+</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Families Served</div>
             </div>
             <div className="text-center">
                <div className="text-3xl font-bold text-violet-400">10m</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Avg Delivery Time</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
