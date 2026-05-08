import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Package, ArrowRight, Clock, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

export function MyOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // Load orders manually stored in localStorage
    const savedOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  return (
    <div className="pt-28 pb-20 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-8 flex items-center gap-3">
        <Package className="w-8 h-8 text-[#00eaff]" /> My Orders
      </h1>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-3xl border border-white/5">
            <Package className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-white mb-2">No orders yet</h2>
            <p className="text-gray-400 mb-6">Looks like you haven't placed any orders.</p>
            <Link to="/" className="inline-flex items-center justify-center gap-2 bg-[#00eaff]/10 hover:bg-[#00eaff]/20 text-[#00eaff] border border-[#00eaff]/30 px-6 py-3 rounded-xl font-medium transition-all">
              Start Shopping
            </Link>
          </div>
        ) : (
          orders.map((order, index) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-[#00eaff]/30 transition-colors group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-white text-lg">{order.id}</span>
                    <span className="text-xs font-medium px-2 py-1 bg-white/10 rounded-md text-gray-300">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{order.items?.length || 0} items • ₹{order.total}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${
                    order.status === 'Processing' ? 'bg-orange-400/10 text-orange-400 border-orange-400/20' :
                    order.status === 'Out for Delivery' ? 'bg-[#00eaff]/10 text-[#00eaff] border-[#00eaff]/20' :
                    'bg-green-400/10 text-green-400 border-green-400/20'
                  }`}>
                    {order.status === 'Delivered' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    {order.status}
                  </div>
                  <Link 
                    to={`/order/${order.id}`}
                    // pass state here to view details correctly
                    state={{ customerDetails: order.customerDetails, orderItems: order.items, cartTotal: order.total - 5 }}
                    className="flex items-center justify-center p-2 rounded-full glass-card hover:bg-[#00eaff]/20 hover:text-[#00eaff] text-gray-300 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Items Preview */}
              <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                {order.items?.map((item: any, i: number) => (
                  <div key={i} className="relative w-16 h-16 shrink-0 bg-white/5 rounded-xl border border-white/5 overflow-hidden group-hover:border-white/10 transition-colors">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-white">
                      x{item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
