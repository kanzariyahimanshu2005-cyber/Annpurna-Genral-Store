import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Working Mother",
    content: "The AI meal planner and auto-subscription saved me completely. I just tell the app what my family likes, and the groceries magically arrive every week.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "Rahul Desai",
    role: "Fitness Enthusiast",
    content: "The nutrition recommendations are spot on! The AI assistant swapped my regular snacks with healthier, budget-friendly options without me even asking.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Anjali Gupta",
    role: "Tech Professional",
    content: "Tried the drone delivery option last night when I ran out of milk at 10 PM. It dropped the package in my balcony in literally 5 minutes. Mind blown!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=9"
  }
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Thousands</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Don't just take our word for it. See what our customers are saying about the AI-first shopping experience.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-8 rounded-3xl border border-white/5 relative group hover:border-purple-500/30 transition-colors"
          >
            <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5 group-hover:text-purple-500/10 transition-colors" />
            
            <div className="flex items-center gap-1 mb-6 text-yellow-400">
              {[...Array(testimonial.rating)].map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-current" />
              ))}
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-8 italic">
              "{testimonial.content}"
            </p>
            
            <div className="flex items-center gap-4">
              <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-white/10" />
              <div>
                <h4 className="text-white font-medium">{testimonial.name}</h4>
                <span className="text-xs text-gray-500">{testimonial.role}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
