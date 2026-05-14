import { motion } from "motion/react";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(0,234,255,0.1)]">
          <ShoppingBag className="w-12 h-12 text-gray-500" />
        </div>
        <h1 className="text-3xl font-display font-bold text-white mb-3">Your Cart is Empty</h1>
        <p className="text-gray-400 mb-8 max-w-md text-center">
          Looks like you haven't added anything to your cart yet. Let's get you some fresh groceries!
        </p>
        <Link 
          to="/"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#00eaff] to-[#0055ff] hover:from-[#00b3cc] hover:to-[#0044cc] text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(0,85,255,0.4)]"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="text-lg font-medium text-white mb-4 border-b border-white/10 pb-4">
              Items in Cart ({cart.length})
            </h2>
            
            <div className="flex flex-col gap-6">
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex gap-4 items-center bg-white/[0.02] p-3 rounded-xl border border-white/5 hover:bg-white/5 transition-colors"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-lg overflow-hidden shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.volume}</p>
                    <div className="text-lg font-bold text-[#00eaff] mt-1">₹{item.price}</div>
                  </div>

                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1 border border-white/10">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 text-gray-300 transition-colors"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-white w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 text-[#00eaff] transition-colors"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="glass-panel p-4 rounded-xl flex items-center gap-4 border border-green-500/20 bg-green-500/5">
            <ShieldCheck className="w-6 h-6 text-green-400 shrink-0" />
            <p className="text-sm text-green-100">
              Your order quality is verified by AI. Items will stay fresh during our 10-minute delivery.
            </p>
          </div>
        </div>

        {/* Order Summary & Bill Details */}
        <div className="lg:col-span-1">
          <div className="glass-panel rounded-2xl p-6 sticky top-28">
            <h2 className="text-lg font-medium text-white mb-6">Bill Details</h2>
            
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Item Total ({cart.length} items)</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="text-[#00eaff]">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Handling Fee</span>
                <span>₹5</span>
              </div>
              
              <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center text-white">
                <span className="font-medium text-lg">Grand Total</span>
                <span className="font-bold text-2xl text-[#00eaff]">₹{cartTotal + 5}</span>
              </div>
            </div>
            
            <Link to="/checkout" className="w-full mt-8 flex items-center justify-center gap-2 bg-gradient-to-r from-[#00eaff] to-[#0055ff] hover:from-[#00b3cc] hover:to-[#0044cc] text-white py-4 rounded-xl font-semibold shadow-[0_0_20px_rgba(0,85,255,0.3)] transition-all">
              Proceed to Pay <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-xs text-center text-gray-500 mt-4">
              By proceeding, you adhere to our T&C and Privacy Policy.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
