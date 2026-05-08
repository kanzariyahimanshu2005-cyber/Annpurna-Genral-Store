import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export function Contact() {
  return (
    <div className="pt-32 pb-20 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
          We'd love to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00eaff] to-[#0055ff]">hear from you.</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Whether you have a question about our delivery, your recent order, or just want to say hi, our team is always ready to assist.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#00eaff]/10 blur-[50px]"></div>
            
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00eaff]/10 flex items-center justify-center shrink-0 border border-[#00eaff]/20">
                  <MapPin className="w-6 h-6 text-[#00eaff]" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-1">Store Address</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Rameshwar 11 shop 5<br/>
                    near murlidhar hotel<br/>
                    kashindara
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0 border border-violet-500/20">
                  <Phone className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-1">Phone Number</h3>
                  <p className="text-gray-400">1-800-ANNPURNA</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20">
                  <Mail className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-1">Email Address</h3>
                  <p className="text-gray-400">support@annpurnastore.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-panel p-8 rounded-3xl border border-white/5">
          <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
          
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">First Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00eaff] focus:ring-1 focus:ring-[#00eaff] transition-all"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Last Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00eaff] focus:ring-1 focus:ring-[#00eaff] transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00eaff] focus:ring-1 focus:ring-[#00eaff] transition-all"
                placeholder="john@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Message</label>
              <textarea 
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00eaff] focus:ring-1 focus:ring-[#00eaff] transition-all resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#00eaff] to-[#0055ff] hover:from-[#00b3cc] hover:to-[#0044cc] text-white py-4 rounded-xl font-semibold shadow-[0_0_20px_rgba(0,85,255,0.3)] transition-all">
              Send Message <Send className="w-4 h-4 ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
