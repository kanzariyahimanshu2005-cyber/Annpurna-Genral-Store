import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Sparkles, Clock, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-[#00eaff]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-[#8a2be2]/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[30%] w-64 h-64 bg-[#0055ff]/15 rounded-full blur-[80px]" />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '50px 50px', backgroundPosition: 'center center' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-glow w-fit">
              <Zap className="w-4 h-4 text-[#00eaff]" fill="#00eaff" />
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#00eaff] to-[#0055ff]">
                Ultra-Fast 10 Min Delivery
              </span>
            </div>
            
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Smart Grocery <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00eaff] via-[#0055ff] to-[#8a2be2] text-glow animation-gradient">
                For Every Home
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              Experience the future of shopping with Annpurna. AI-curated fresh produce, daily essentials, and premium groceries delivered at warp speed.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to="/category/all" className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#00eaff] to-[#0055ff] hover:from-[#00b3cc] hover:to-[#0044cc] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all shadow-[0_0_20px_rgba(0,85,255,0.4)] hover:shadow-[0_0_30px_rgba(0,234,255,0.6)] hover:scale-105 active:scale-95">
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
              
              <a href="#featured-products" className="flex items-center justify-center gap-2 glass-card hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold text-lg transition-all border border-white/10 hover:border-white/30 text-white">
                <Sparkles className="w-5 h-5 text-[#8a2be2]" /> View Offers
              </a>
            </div>

            <div className="flex items-center gap-8 pt-8 mt-4 border-t border-white/5">
              <div className="flex flex-col">
                <span className="text-3xl font-display font-bold text-white">50k+</span>
                <span className="text-sm text-gray-400">Happy Families</span>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-display font-bold text-white">4.9★</span>
                <span className="text-sm text-gray-400">Store Rating</span>
              </div>
              <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col hidden sm:flex">
                <span className="text-3xl font-display font-bold text-white">5k+</span>
                <span className="text-sm text-gray-400">Products</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Visuals */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[600px] hidden lg:block"
          >
            {/* Main Holographic Platform */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Product Floating Group */}
              <div className="relative w-full h-full max-w-lg mx-auto top-10">
                
                {/* Center Image/Concept (e.g. Fresh Groceries Box or Storefront 3D) */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/20 backdrop-blur-xl shadow-2xl flex items-center justify-center overflow-hidden z-20 object-cover"
                >
                  {/* Pseudo-image for the unuploaded store reference: a beautiful lush abstract representation */}
                  <img 
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop" 
                    alt="Fresh Groceries Concept"
                    className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-display font-bold text-2xl text-white mb-1">Annpurna Premium</h3>
                    <p className="text-sm text-gray-300">Farm-fresh arrives in minutes.</p>
                  </div>
                </motion.div>

                {/* Floating Cards / Badges */}
                <motion.div 
                   initial={{ x: 50, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: 1, duration: 0.5 }}
                   className="absolute top-[20%] -right-10 glass-card px-4 py-3 rounded-xl flex items-center gap-3 z-30 shadow-[0_0_30px_rgba(0,0,0,0.5)] border-glow"
                >
                  <div className="bg-[#00eaff]/20 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-[#00eaff]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Live Status</div>
                    <div className="text-sm font-bold text-white">Arriving in 8 mins</div>
                  </div>
                </motion.div>

                <motion.div 
                   initial={{ x: -50, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: 1.2, duration: 0.5 }}
                   className="absolute bottom-[25%] -left-4 glass-card px-4 py-3 rounded-xl flex items-center gap-3 z-30 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                >
                  <div className="bg-green-500/20 p-2 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Quality Checked</div>
                    <div className="text-sm font-bold text-white">AI Verified Fresh</div>
                  </div>
                </motion.div>

              </div>
              
              {/* Glowing Base Platform */}
              <div className="absolute bottom-0 w-3/4 h-12 bg-gradient-to-r from-transparent via-[#00eaff]/30 to-transparent blur-xl rounded-[100%]"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
