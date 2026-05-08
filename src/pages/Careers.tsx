import { motion } from "motion/react";
import { Briefcase, ArrowRight, Star } from "lucide-react";

export function Careers() {
  const openPositions = [
    { title: "Senior AI Engineer", department: "Engineering", type: "Full-Time", location: "Remote / New Delhi" },
    { title: "Supply Chain Manager", department: "Operations", type: "Full-Time", location: "New Delhi" },
    { title: "Dark Store Manager", department: "Operations", type: "Full-Time", location: "Gurugram" },
    { title: "React Native Developer", department: "Engineering", type: "Full-Time", location: "Remote" },
    { title: "Delivery Partner", department: "Logistics", type: "Flexible", location: "Multiple Cities" }
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-violet-500/10 text-violet-400 border border-violet-500/20 text-sm font-bold uppercase tracking-wider mb-6">
          Join the Team
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
          Build the Future of <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-[#00eaff]">Grocery Delivery.</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          We are a team of dreamers, builders, and doers. If you are passionate about technology, operations, and making people's lives easier, we want you on our side.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="glass-panel p-6 rounded-2xl border border-white/5">
          <Star className="w-8 h-8 text-yellow-400 mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Premium Benefits</h3>
          <p className="text-sm text-gray-400">Comprehensive health insurance, flexible hours, and employee discounts on all Annpurna products.</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-white/5">
          <Briefcase className="w-8 h-8 text-[#00eaff] mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Growth & Learning</h3>
          <p className="text-sm text-gray-400">Continuous learning budgets, AI training programs, and rapid career progression in a hyper-growth startup.</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-[#00eaff]/5 to-transparent">
          <h3 className="text-xl font-bold text-white mb-2">Did you know?</h3>
          <p className="text-sm text-gray-300 italic mb-4">"Our engineering team deploys AI models that save tons of food from being wasted every single month."</p>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 md:p-10 border border-white/5">
        <h2 className="text-2xl font-display font-bold text-white mb-8 border-b border-white/10 pb-4">Open Positions</h2>
        
        <div className="space-y-4">
          {openPositions.map((job, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-[#00eaff]/30 transition-all cursor-pointer"
            >
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-medium text-white group-hover:text-[#00eaff] transition-colors mb-1">{job.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="bg-white/10 px-2 py-0.5 rounded text-gray-300">{job.department}</span>
                  <span>• {job.location}</span>
                  <span>• {job.type}</span>
                </div>
              </div>
              
              <button className="flex items-center gap-2 text-sm font-medium text-white group-hover:text-[#00eaff] transition-colors self-start md:self-auto">
                Apply Now <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center text-gray-400 text-sm">
          Don't see a perfect fit? Send your resume to <a href="mailto:careers@annpurnastore.com" className="text-[#00eaff] hover:underline">careers@annpurnastore.com</a>
        </div>
      </div>
    </div>
  );
}
