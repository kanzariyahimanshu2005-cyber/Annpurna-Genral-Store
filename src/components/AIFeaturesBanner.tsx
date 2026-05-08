import { motion } from "motion/react";
import { BrainCircuit, Cpu, ScanFace, TrendingUp } from "lucide-react";

export function AIFeaturesBanner() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000a18] via-[#0a001a] to-[#000a18] z-0"></div>
        <div className="absolute inset-0 opacity-20 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[200%] bg-gradient-to-r from-[#00eaff]/10 to-transparent rotate-12 blur-3xl point-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[40%] h-[100%] bg-[#8a2be2]/20 blur-[100px] pointer-events-none"></div>

        {/* Border Glow line */}
        <div className="absolute top-0 left-0 w-full height-[1px] bg-gradient-to-r from-transparent via-[#00eaff] to-transparent opacity-50"></div>

        <div className="relative z-10 p-8 md:p-12 lg:flex lg:items-center lg:justify-between lg:gap-8">
          
          <div className="lg:max-w-xl mb-8 lg:mb-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00eaff]/10 text-[#00eaff] border border-[#00eaff]/20 text-xs font-bold uppercase tracking-wider mb-4">
              <BrainCircuit className="w-4 h-4" /> Powered By Gemini
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Smart Shopping, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-[#00eaff]">Tailored to You.</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Our advanced AI anticipates what you need before you run out. Build carts with voice commands, discover recipes, and get hyper-personalized offers seamlessly.
            </p>
            
            <button 
              onClick={() => {
                document.getElementById('global-search-input')?.focus();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 px-6 py-3 rounded-xl text-white font-medium transition-all group"
            >
              Try Smart Search <span className="text-[#00eaff] group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-[450px] shrink-0">
            <div className="glass-panel p-5 rounded-2xl border-t border-t-[#00eaff]/20">
               <Cpu className="w-8 h-8 text-[#00eaff] mb-3" />
               <h3 className="text-white font-medium mb-1">Predictive Carts</h3>
               <p className="text-sm text-gray-400">Auto-adds your weekly essentials.</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl border-t border-t-violet-500/20">
               <ScanFace className="w-8 h-8 text-violet-400 mb-3" />
               <h3 className="text-white font-medium mb-1">Voice & Vision</h3>
               <p className="text-sm text-gray-400">Search by voice or scanning a barcode.</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl border-t border-t-pink-500/20 sm:col-span-2 flex items-center gap-4">
               <div className="bg-pink-500/10 p-3 rounded-full">
                 <TrendingUp className="w-6 h-6 text-pink-400" />
               </div>
               <div>
                  <h3 className="text-white font-medium mb-1">Dynamic Pricing</h3>
                  <p className="text-sm text-gray-400">AI finds the best deals based on your habits.</p>
               </div>
            </div>
          </div>
          
        </div>
      </motion.div>
    </section>
  );
}
