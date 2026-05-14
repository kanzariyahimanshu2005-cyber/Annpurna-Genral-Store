import { motion } from "motion/react";
import {
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Phone,
  MessageSquare,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Plane,
  RefreshCcw
} from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix Leaflet's default icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function DeliveryMap({ deliveryMode }: { deliveryMode?: string }) {
  const [partnerLocation, setPartnerLocation] = useState({
    lat: 19.076,
    lng: 72.8777,
  });

  // Simulate movement
  useEffect(() => {
    const interval = setInterval(() => {
      setPartnerLocation((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const droneIcon = new L.DivIcon({
    html: `<div style="background: white; padding: 4px; border-radius: 50%; border: 2px solid #a855f7; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l6 5.5-3.5 3.5-3.5-1L1 17l6 6 1-1 1.5-3.55L14 15l5.5 6 1.2-.7c.4-.2.7-.6.6-1.1Z"/></svg></div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  const partnerIcon = new L.DivIcon({
    html: `<div style="background: white; padding: 4px; border-radius: 50%; border: 2px solid #00eaff; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0055ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg></div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  return (
    <div className="h-64 mt-6 rounded-2xl overflow-hidden border border-white/5 relative z-0">
      <MapContainer
        center={[19.076, 72.8777]}
        zoom={14}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[partnerLocation.lat, partnerLocation.lng]} icon={deliveryMode === 'drone' ? droneIcon : partnerIcon}>
          <Popup>Delivery Partner</Popup>
        </Marker>
        <Marker position={[19.082, 72.88]}>
          <Popup>Your Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export function OrderDetails() {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as {
    customerDetails?: any;
    orderItems?: any[];
    cartTotal?: number;
  } | null;

  // Mock order data
  const order = {
    id: id || "ANP-84729104",
    status: "Out for Delivery",
    eta: "8 mins",
    items: state?.orderItems?.map((item) => ({
      ...item,
      qty: item.quantity,
    })) || [
      {
        id: 1,
        name: "Amul Taaza Toned Milk",
        volume: "1 L",
        price: 72,
        qty: 2,
        image:
          "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=500&auto=format&fit=crop",
      },
      {
        id: 2,
        name: "Maggi 2-Minute Noodles",
        volume: "140 g",
        price: 28,
        qty: 3,
        image:
          "https://www.bigbasket.com/media/uploads/p/l/266160_19-maggi-2-minute-instant-noodles-masala.jpg",
      },
    ],
    deliveryPartner: {
      name: "Ramesh Kumar",
      rating: 4.8,
      vehicle: "Electric Bike",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop",
    },
    address:
      state?.customerDetails?.address ||
      "Rameshwar 11  shop 5   near murlidhar hotel kashindara",
    customerName: state?.customerDetails?.name || "John Doe",
    customerPhone: state?.customerDetails?.phone || "+91 9876543210",
    landmark: state?.customerDetails?.landmark || "",
    paymentMethod: state?.customerDetails?.paymentMethod || "upi",
    deliveryMode: state?.customerDetails?.deliveryMode || "standard",
    isSubscription: state?.customerDetails?.isSubscription || false,
    bill: (() => {
      const itemTotal = state?.cartTotal || 228;
      const deliveryMode = state?.customerDetails?.deliveryMode || "standard";
      const isSubscription = state?.customerDetails?.isSubscription || false;
      
      let delivery = 0;
      if (deliveryMode === 'express') delivery = 20;
      if (deliveryMode === 'drone') delivery = 50;
      
      const discount = isSubscription ? Math.round(itemTotal * 0.10) : 0;
      const handling = 5;
      
      return {
        itemTotal,
        delivery,
        handling,
        discount,
        total: itemTotal + delivery + handling - discount,
      };
    })(),
  };

  return (
    <div className="pt-28 pb-20 min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/"
          className="p-2 rounded-full glass-card hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-300" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
            Order Details
          </h1>
          <p className="text-gray-400 text-sm">Order #{order.id}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column: Tracking & Items */}
        <div className="md:col-span-2 space-y-6">
          {/* Tracking Card */}
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00eaff]/10 blur-[50px]"></div>

            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-white">
                    Arriving in {order.eta}
                  </h2>
                  <div className="flex items-center gap-1 bg-[#8a2be2]/20 px-2 py-0.5 rounded text-[10px] text-[#8a2be2] border border-[#8a2be2]/20 font-medium">
                     <Sparkles className="w-3 h-3" />
                     AI ETA Prediction
                  </div>
                </div>
                <p className="text-sm text-[#00eaff] font-medium">
                  {order.status} • {order.deliveryMode === 'drone' ? 'Drone Delivery' : order.deliveryMode === 'express' ? 'Express Delivery' : 'Standard Delivery'}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full border-2 ${order.deliveryMode === 'drone' ? 'border-purple-500 text-purple-500' : 'border-[#00eaff] text-[#00eaff]'} border-t-transparent animate-spin flex items-center justify-center relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  {order.deliveryMode === 'drone' ? <Plane className="w-5 h-5 animate-pulse" /> : <Clock className="w-5 h-5 animate-pulse" />}
                </div>
              </div>
            </div>

            {/* Stepper */}
            <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-7 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#00eaff] before:via-white/20 before:to-transparent z-10">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-4 h-4 rounded-full border-4 border-black bg-[#00eaff] shadow-[0_0_10px_#00eaff] shadow-[#00eaff] absolute left-0 -translate-x-[11px]"></div>
                <div className="w-[calc(100%-2rem)]">
                  <h4 className="text-white font-medium text-sm">
                    Order Accepted
                  </h4>
                  <span className="text-xs text-gray-500">10:42 AM</span>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-4 h-4 rounded-full border-4 border-black bg-[#00eaff] shadow-[0_0_10px_#00eaff] absolute left-0 -translate-x-[11px]"></div>
                <div className="w-[calc(100%-2rem)]">
                  <h4 className="text-white font-medium text-sm">
                    Packed by Store
                  </h4>
                  <span className="text-xs text-gray-500">10:45 AM</span>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-4 h-4 rounded-full border-4 border-black bg-[#00eaff] shadow-[0_0_10px_#00eaff] absolute left-0 -translate-x-[11px]"></div>
                <div className="w-[calc(100%-2rem)]">
                  <div className="glass-card -ml-2 p-3 rounded-xl flex items-center gap-3 border-[#00eaff]/30">
                    <img
                      src={order.deliveryPartner.image}
                      alt="Partner"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-white font-medium text-sm">
                        {order.deliveryPartner.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        is on the way • {order.deliveryPartner.rating}★
                      </p>
                    </div>
                    <div className="ml-auto flex gap-2">
                      <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#0055ff] transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-green-500 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-4 h-4 rounded-full border-4 border-black bg-white/20 absolute left-0 -translate-x-[11px]"></div>
                <div className="w-[calc(100%-2rem)]">
                  <h4 className="text-gray-400 font-medium text-sm">
                    Delivered
                  </h4>
                  <span className="text-xs text-gray-600">Pending</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <DeliveryMap deliveryMode={order.deliveryMode} />

          {/* Items Summary */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-medium text-white mb-4">
              Items Ordered
            </h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center pl-2">
                  <div className="w-12 h-12 bg-white/5 rounded-md overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.volume} x {item.qty}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-white">
                    ₹{item.price * item.qty}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Address & Bill */}
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-base font-medium text-white mb-3">
              Customer Details
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Name</span>
                <span className="font-medium text-white">
                  {order.customerName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Phone</span>
                <span className="font-medium text-white">
                  {order.customerPhone}
                </span>
              </div>
              {order.landmark && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Landmark</span>
                  <span className="font-medium text-white">
                    {order.landmark}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Delivery Address
              </h3>
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <MapPin className="w-5 h-5 text-[#00eaff] shrink-0 mt-0.5" />
                <p className="leading-relaxed">{order.address}</p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-base font-medium text-white mb-4">
              Bill Summary
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span>₹{order.bill.itemTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery {order.deliveryMode === 'drone' ? '(Drone)' : order.deliveryMode === 'express' ? '(Express)' : ''}</span>
                <span className={order.bill.delivery === 0 ? "text-[#00eaff]" : "text-white"}>
                  {order.bill.delivery === 0 ? "FREE" : `₹${order.bill.delivery}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Handling Fee</span>
                <span>₹{order.bill.handling}</span>
              </div>
              {order.isSubscription && (
                <div className="flex justify-between text-green-400">
                  <span>Subscription Discount</span>
                  <span>-₹{order.bill.discount}</span>
                </div>
              )}
              <div className="border-t border-white/10 pt-3 mt-3 flex justify-between items-center text-white font-medium">
                <span>Total Paid</span>
                <span className="text-lg">₹{order.bill.total}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-green-400 bg-green-400/10 p-3 rounded-xl border border-green-400/20">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery - Pending integration"
                  : `Paid via ${order.paymentMethod.toUpperCase()} successfully.`}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => {
                // Mock one click repeat order logic
                alert("Order successfully copied to cart!");
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white font-medium py-4 rounded-xl shadow-lg transition-colors"
            >
              <RefreshCcw className="w-5 h-5" />
              One-Click Repeat Order
            </button>

            <button 
              onClick={() => {
                const invoiceContent = `
========================================
             INVOICE
========================================
Order ID: ${order.id}
Date: ${new Date().toLocaleDateString()}
Status: ${order.status}
Delivery Mode: ${order.deliveryMode === 'drone' ? 'Drone Delivery' : order.deliveryMode === 'express' ? 'Express Delivery' : 'Standard Delivery'}

----------------------------------------
Items:
${order.items.map((item: any) => `- ${item.name} x${item.quantity} (₹${item.price * item.quantity})`).join('\n')}

----------------------------------------
Subtotal: ₹${order.bill.itemTotal}
Delivery Fee: ₹${order.bill.delivery}
Handling Fee: ₹${order.bill.handling}
Subscription Discount: ${order.isSubscription ? '-₹' + order.bill.discount : '₹0'}
Total: ₹${order.bill.total}

Thank you for shopping with us!
========================================
                `.trim();

                const blob = new Blob([invoiceContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Invoice-${order.id}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="w-full flex items-center justify-between glass-card p-4 rounded-xl text-sm font-medium text-white hover:bg-white/5 transition-colors"
            >
              <span>Download Invoice</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
