import { motion } from "motion/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { MapPin, Phone, User, CreditCard, ArrowRight, ShieldCheck } from "lucide-react";

export function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    paymentMethod: "upi"
  });

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order placement
    
    // Navigate to a mock order confirmation page
    const orderId = "ANP-" + Math.floor(10000000 + Math.random() * 90000000);

    const savedOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      status: "Processing",
      total: cartTotal + 5,
      items: cart,
      customerDetails: formData
    };
    savedOrders.unshift(newOrder);
    localStorage.setItem('user_orders', JSON.stringify(savedOrders));

    navigate(`/order/${orderId}`, { 
      state: { 
        customerDetails: formData, 
        orderItems: cart,
        cartTotal: cartTotal
      } 
    });

    if (clearCart) {
      clearCart();
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-8">Checkout Details</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-2">
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
            
            {/* Personal Details */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-[#00eaff]" /> Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00eaff] focus:ring-1 focus:ring-[#00eaff] transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Phone Number</label>
                  <input 
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00eaff] focus:ring-1 focus:ring-[#00eaff] transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#00eaff]" /> Delivery Address
              </h2>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Complete Address</label>
                  <textarea 
                    required
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00eaff] focus:ring-1 focus:ring-[#00eaff] transition-all resize-none"
                    placeholder="House/Flat No., Building Name, Street, Area"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Landmark (Optional)</label>
                  <input 
                    type="text" 
                    value={formData.landmark}
                    onChange={(e) => setFormData({...formData, landmark: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00eaff] focus:ring-1 focus:ring-[#00eaff] transition-all"
                    placeholder="e.g. Near Apollo Hospital"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#00eaff]" /> Payment Method
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className={`cursor-pointer flex items-center gap-3 p-4 rounded-xl border transition-colors ${formData.paymentMethod === 'upi' ? 'bg-[#00eaff]/10 border-[#00eaff]' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="accent-[#00eaff] w-4 h-4 cursor-pointer" 
                    />
                    <span className="text-white font-medium">UPI (GPay, PhonePe)</span>
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  <label className={`cursor-pointer flex items-center gap-3 p-4 rounded-xl border transition-colors ${formData.paymentMethod === 'card' ? 'bg-[#00eaff]/10 border-[#00eaff]' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="accent-[#00eaff] w-4 h-4 cursor-pointer" 
                    />
                    <span className="text-white font-medium">Credit / Debit Card</span>
                  </label>
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className={`cursor-pointer flex items-center gap-3 p-4 rounded-xl border transition-colors ${formData.paymentMethod === 'cod' ? 'bg-[#00eaff]/10 border-[#00eaff]' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="accent-[#00eaff] w-4 h-4 cursor-pointer" 
                    />
                    <span className="text-white font-medium">Cash on Delivery</span>
                  </label>
                </div>

                {formData.paymentMethod === 'upi' && (
                  <div className="sm:col-span-2 mt-2">
                    <input 
                      type="text" 
                      placeholder="Enter UPI ID (e.g., username@upi)" 
                      required 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00eaff] focus:ring-1 focus:ring-[#00eaff] transition-all" 
                    />
                  </div>
                )}

                {formData.paymentMethod === 'card' && (
                  <div className="sm:col-span-2 grid gap-4 mt-2">
                    <input 
                      type="text" 
                      placeholder="Card Number" 
                      required 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00eaff] focus:ring-1 focus:ring-[#00eaff] transition-all" 
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="MM/YY" 
                        required 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00eaff] focus:ring-1 focus:ring-[#00eaff] transition-all" 
                      />
                      <input 
                        type="text" 
                        placeholder="CVV" 
                        required 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00eaff] focus:ring-1 focus:ring-[#00eaff] transition-all" 
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass-panel rounded-2xl p-6 sticky top-28 border border-[#00eaff]/20">
            <h2 className="text-lg font-medium text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm text-gray-300">
              <div className="max-h-48 overflow-y-auto pr-2 space-y-3 mb-4 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                       <span className="text-gray-500">{item.quantity}x</span>
                       <span className="text-white truncate max-w-[120px]">{item.name}</span>
                    </div>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-between">
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
            
            <button 
              type="submit" 
              form="checkout-form"
              className="w-full mt-8 flex items-center justify-center gap-2 bg-gradient-to-r from-[#00eaff] to-[#0055ff] hover:from-[#00b3cc] hover:to-[#0044cc] text-white py-4 rounded-xl font-semibold shadow-[0_0_20px_rgba(0,85,255,0.3)] transition-all"
            >
              Place Order <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
               <ShieldCheck className="w-4 h-4 text-green-400" /> Secure encrypt payment
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
