import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-[#02050a] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#00eaff]/50 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0055ff]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00eaff] to-[#0055ff] flex items-center justify-center">
                 <span className="text-black font-display font-bold">A</span>
               </div>
               <span className="font-display font-bold text-xl text-white">Annpurna</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Smart Grocery Shopping for Every Home. Experience premium quality, AI-curated selections, and hyper-fast delivery.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-[#00eaff] transition-colors"><Facebook className="w-5 h-5"/></a>
              <a href="#" className="text-gray-400 hover:text-[#00eaff] transition-colors"><Twitter className="w-5 h-5"/></a>
              <a href="#" className="text-gray-400 hover:text-[#00eaff] transition-colors"><Instagram className="w-5 h-5"/></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-medium text-white text-lg">Categories</h3>
            <ul className="space-y-2">
              {[
                { name: 'Fresh Vegetables', path: '/category/fruits-veggies' },
                { name: 'Dairy & Bakery', path: '/category/dairy' },
                { name: 'Snacks & Beverages', path: '/category/snacks' },
                { name: 'Personal Care', path: '/category/personal-care' },
                { name: 'Home Essentials', path: '/category/home-essentials' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-sm text-gray-400 hover:text-white transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="space-y-4">
            <h3 className="font-medium text-white text-lg">Company</h3>
            <ul className="space-y-2">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Careers', path: '/careers' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms of Service', path: '/terms-of-service' },
                { name: 'Delivery Analytics', path: '/analytics' },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-sm text-gray-400 hover:text-white transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-medium text-white text-lg">Get in Touch</h3>
            <div className="flex items-start gap-3 text-sm text-gray-400">
              <MapPin className="w-5 h-5 text-[#00eaff] shrink-0 mt-0.5" />
              <p>Rameshwar 11  shop 5   near murlidhar hotel kashindara</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Phone className="w-5 h-5 text-[#00eaff] shrink-0" />
              <p>1-800-ANNPURNA</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Mail className="w-5 h-5 text-[#00eaff] shrink-0" />
              <p>hello@annpurnastore.com</p>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 Annpurna General Store. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
             <span>Crafted with AI & Next-Gen Tech</span>
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse ml-2 shadow-[0_0_10px_#22c55e]"></span>
             <span className="text-green-500">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
