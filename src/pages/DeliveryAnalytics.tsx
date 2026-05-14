import { motion } from "motion/react";
import { Activity, Flame, TrendingUp, Store } from "lucide-react";
import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet's default icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const storeIcon = new L.DivIcon({
  html: `<div style="background: rgba(0, 234, 255, 0.2); padding: 4px; border-radius: 50%; border: 1px solid rgba(0, 234, 255, 0.5); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); width: 28px; height: 28px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00eaff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h2V14h8v8h2a2 2 0 0 0 2-2v-8"/><path d="M2 12h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg></div>`,
  className: '',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

export function DeliveryAnalytics() {
  const heatPoints = useMemo(() => {
    // Generate some random coordinates near Mumbai to simulate delivery heatmap
    const points = [];
    for (let i = 0; i < 50; i++) {
      points.push({
        lat: 19.076 + (Math.random() - 0.5) * 0.1,
        lng: 72.8777 + (Math.random() - 0.5) * 0.1,
        weight: Math.random() * 10
      });
    }
    return points;
  }, []);

  const stores = [
    { lat: 19.08, lng: 72.88, name: "Store A (Hyperlocal Hub)" },
    { lat: 19.06, lng: 72.86, name: "Store B (Express Hub)" }
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-8 flex items-center gap-3">
        <Activity className="w-8 h-8 text-[#00eaff]" /> Delivery Heatmap & Analytics
      </h1>

      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4">
           <div className="w-12 h-12 rounded-xl bg-[#00eaff]/20 flex items-center justify-center text-[#00eaff]">
             <TrendingUp className="w-6 h-6" />
           </div>
           <div>
             <p className="text-sm text-gray-400 font-medium">Hyperlocal Deliveries</p>
             <p className="text-2xl font-bold text-white">1,248 <span className="text-sm font-normal text-green-400 border border-green-400/20 bg-green-400/10 px-1 rounded ml-1">+12%</span></p>
           </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4">
           <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
             <Flame className="w-6 h-6" />
           </div>
           <div>
             <p className="text-sm text-gray-400 font-medium">High Demand Zones</p>
             <p className="text-2xl font-bold text-white">14 <span className="text-sm font-normal text-gray-400 ml-1">Active</span></p>
           </div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-white/5 p-6 h-[500px] relative z-0">
        <div className="absolute top-8 left-8 z-10 bg-black/60 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10">
          <h3 className="text-white font-medium mb-2">Live Store Network</h3>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="w-3 h-3 rounded-full bg-[#00eaff] shadow-[0_0_10px_#00eaff]"></span> Hubs
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
            <span className="w-3 h-3 rounded-full bg-red-500/50 shadow-[0_0_10px_red]"></span> Heatmap Activity
          </div>
        </div>

        <div className="h-full w-full rounded-xl overflow-hidden relative z-0">
          <MapContainer
            center={[19.076, 72.8777]}
            zoom={12}
            style={{ width: "100%", height: "100%" }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Simulated Heatmap items */}
            {heatPoints.map((pt, i) => (
              <CircleMarker
                key={`heat-${i}`}
                center={[pt.lat, pt.lng]}
                pathOptions={{
                  fillColor: 'red',
                  fillOpacity: 0.4,
                  stroke: false
                }}
                radius={pt.weight * 2 + 5}
              />
            ))}

            {/* Hyperlocal Stores */}
            {stores.map((store, i) => (
              <Marker key={`store-${i}`} position={[store.lat, store.lng]} icon={storeIcon}>
                <Popup>{store.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
