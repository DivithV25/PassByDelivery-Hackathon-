import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for marker icon not displaying properly in some environments
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Track({ order }) {
  if (!order || !order.pickup || !order.delivery) {
    return <p>Error: Missing order location details.</p>;
  }

  const { pickup, delivery } = order;

  // Ensure pickup and delivery are valid coordinates
  useEffect(() => {
    if (!Array.isArray(pickup) || !Array.isArray(delivery) || pickup.length !== 2 || delivery.length !== 2) {
      console.error('Invalid coordinates for order:', { pickup, delivery });
    }
  }, [pickup, delivery]);

  return (
    <div>
      <h1>Track Order</h1>
      <MapContainer
        center={pickup}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={pickup} />
        <Marker position={delivery} />
      </MapContainer>
    </div>
  );
}
