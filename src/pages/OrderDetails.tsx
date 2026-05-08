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
} from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  "";
const hasValidKey = Boolean(API_KEY) && API_KEY !== "YOUR_API_KEY";

function DeliveryMap() {
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

  if (!hasValidKey) {
    return (
      <div className="h-64 mt-6 rounded-2xl border border-white/5 bg-white/5 flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-white font-medium mb-2">
          Google Maps API Key Required
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Add your API key to see real-time delivery tracking.
        </p>
        <p className="text-xs text-gray-500">
          Go to Settings (⚙️) &rarr; Secrets &rarr; Add GOOGLE_MAPS_PLATFORM_KEY
        </p>
      </div>
    );
  }

  return (
    <div className="h-64 mt-6 rounded-2xl overflow-hidden border border-white/5 relative">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={{ lat: 19.076, lng: 72.8777 }}
          defaultZoom={14}
          mapId="DELIVERY_TRACKING_MAP"
          internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
          style={{ width: "100%", height: "100%" }}
          disableDefaultUI={true}
        >
          <AdvancedMarker position={partnerLocation} title="Delivery Partner">
            <div className="bg-white p-2 rounded-full shadow-lg border-2 border-[#00eaff]">
              <Package className="w-5 h-5 text-[#0055ff]" />
            </div>
          </AdvancedMarker>
          {/* Customer Location */}
          <AdvancedMarker
            position={{ lat: 19.082, lng: 72.88 }}
            title="Your Location"
          >
            <Pin background="#00eaff" glyphColor="#fff" borderColor="#0055ff" />
          </AdvancedMarker>
        </Map>
      </APIProvider>
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
    bill: {
      itemTotal: state?.cartTotal || 228,
      delivery: 0,
      handling: 5,
      total: (state?.cartTotal || 228) + 5,
    },
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
                <h2 className="text-xl font-bold text-white mb-1">
                  Arriving in {order.eta}
                </h2>
                <p className="text-sm text-[#00eaff] font-medium">
                  {order.status}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-[#00eaff] border-t-transparent animate-spin flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#00eaff] animate-pulse" />
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
          <DeliveryMap />

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
                <span>Delivery Partner Fee</span>
                <span className="text-[#00eaff]">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Handling Fee</span>
                <span>₹{order.bill.handling}</span>
              </div>
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

          <button className="w-full flex items-center justify-between glass-card p-4 rounded-xl text-sm font-medium text-white hover:bg-white/5 transition-colors">
            <span>Download Invoice</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
