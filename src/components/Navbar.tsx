import { ReactNode, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, Bell, Mic, CheckCircle, Percent, TrendingDown, Package } from "lucide-react";
import { cn } from "../lib/utils";
import { useCart } from "../context/CartContext";

const MOCK_NOTIFICATIONS = [
  { id: 1, title: "Order Delivered!", message: "Your Annpurna order has arrived.", time: "2m ago", unread: true, icon: CheckCircle, color: "text-green-400", bg: "bg-green-400/10" },
  { id: 2, title: "Special Offer", message: "Get 20% off on premium dairy products today.", time: "1h ago", unread: true, icon: Percent, color: "text-[#00eaff]", bg: "bg-[#00eaff]/10" },
  { id: 3, title: "Price Drop Alert", message: "Farm Fresh Tomatoes are now ₹35/500g.", time: "3h ago", unread: false, icon: TrendingDown, color: "text-orange-400", bg: "bg-orange-400/10" },
];

export function Navbar() {
  const { cartCount, cartTotal } = useCart();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const notificationRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00eaff] to-[#0055ff] flex items-center justify-center shadow-[0_0_20px_rgba(0,234,255,0.4)]">
              <span className="text-black font-display font-bold text-xl">A</span>
            </div>
            <Link to="/" className="hidden sm:flex flex-col">
              <span className="font-display font-bold text-xl leading-tight text-white tracking-tight">Annpurna</span>
              <span className="text-[10px] uppercase tracking-wider text-[#00eaff] font-medium leading-none">General Store</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 ml-6 mr-auto">
            <Link to="/category/all" className="text-sm font-medium text-gray-300 hover:text-[#00eaff] transition-colors">Categories</Link>
            <Link to="/about" className="text-sm font-medium text-gray-300 hover:text-[#00eaff] transition-colors">About</Link>
            <Link to="/contact" className="text-sm font-medium text-gray-300 hover:text-[#00eaff] transition-colors">Contact</Link>
          </div>

          {/* AI Smart Search */}
          <div className="flex-1 max-w-xl mx-8 hidden lg:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#00eaff] transition-colors" />
              </div>
              <input
                id="global-search-input"
                type="text"
                className="block w-full pl-11 pr-12 py-3 border border-white/10 rounded-2xl leading-5 bg-white/5 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00eaff]/50 focus:border-[#00eaff] focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                placeholder="Ask AI: 'Ingredients for Butter Chicken...'"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-[#00eaff]">
                  <Mic className="h-4 w-4" />
                </button>
              </div>
              {/* Glowing background effect on focus */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00eaff] to-[#0055ff] rounded-2xl opacity-0 group-focus-within:opacity-20 blur transition duration-500 -z-10"></div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-gray-300 hover:text-white transition-colors relative"
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-[#00eaff] rounded-full shadow-[0_0_10px_#00eaff]"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-4 w-80 glass-card rounded-2xl border border-white/10 shadow-2xl py-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                      <h3 className="font-medium text-white">Notifications</h3>
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-xs text-[#00eaff] hover:text-white transition-colors">
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => {
                          const Icon = notification.icon;
                          return (
                            <div 
                              key={notification.id} 
                              className={cn(
                                "px-4 py-3 flex gap-3 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-0",
                                notification.unread ? "bg-white/[0.03]" : ""
                              )}
                            >
                              <div className={cn("mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0", notification.bg)}>
                                <Icon className={cn("w-4 h-4", notification.color)} />
                              </div>
                              <div>
                                <h4 className={cn("text-sm font-medium", notification.unread ? "text-white" : "text-gray-300")}>
                                  {notification.title}
                                </h4>
                                <p className="text-xs text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">
                                  {notification.message}
                                </p>
                                <span className="text-[10px] text-gray-500 mt-1 block">
                                  {notification.time}
                                </span>
                              </div>
                              {notification.unread && (
                                <div className="w-2 h-2 rounded-full bg-[#00eaff] shrink-0 mt-2"></div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="px-4 py-8 text-center text-gray-400 text-sm">
                          No new notifications
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="h-8 w-px bg-white/10"></div>
            <Link to="/orders" className="flex items-center gap-2 group text-gray-300 hover:text-white transition-colors">
              <Package className="h-5 w-5 group-hover:drop-shadow-[0_0_8px_#00eaff] transition-all" />
            </Link>

            <Link to="/cart" className="flex items-center gap-2 group text-gray-300 hover:text-white transition-colors">
              <div className="relative">
                <ShoppingCart className="h-6 w-6 group-hover:drop-shadow-[0_0_8px_#00eaff] transition-all" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#00eaff] to-[#0055ff] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="font-medium text-sm">₹{cartTotal}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-gray-300 relative"
            >
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-[#00eaff] rounded-full shadow-[0_0_10px_#00eaff]"></span>
              )}
            </button>
            <button className="text-gray-300">
              <Search className="h-6 w-6" />
            </button>
            <Link to="/orders" className="relative text-gray-300">
              <Package className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="relative text-gray-300">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#00eaff] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">{cartCount}</span>
              )}
            </Link>
            <button className="text-gray-300 hover:text-white p-2">
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
        </div>
      </div>
    </motion.nav>
  );
}
