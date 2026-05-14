import { motion } from "motion/react";
import { Send, Sparkles } from "lucide-react";

export function Newsletter() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#00eaff]/10 via-purple-500/10 to-transparent border border-white/10 p-8 md:p-16 text-center"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-gray-300">Join the waitlist</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Get Smart Grocery Insights & Offers
          </h2>
          
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive weekly AI-curated recipes, exclusive discounts, and updates on our drone delivery rollout.
          </p>
          
          <form className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!') }}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00eaff]/50 transition-colors"
            />
            <button 
              type="submit" 
              className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-[#00eaff] hover:bg-[#00eaff]/90 text-black font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              Subscribe <Send className="w-4 h-4" />
            </button>
          </form>
          
          <p className="text-xs text-gray-500 mt-4">We respect your privacy. No spam, ever.</p>
        </div>
      </motion.div>
    </section>
  );
}
