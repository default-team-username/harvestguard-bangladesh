import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Coordinates } from '@/utils/location';
import { useLanguage } from '@/contexts/LanguageContext';

// Define farmer data structure
export interface FarmerLocation {
  position: Coordinates;
  risk: 'Low' | 'Moderate' | 'High';
}

export interface UserLocation {
  position: Coordinates;
  name: string;
}

interface InteractiveMapProps {
  center: Coordinates;
  zoom?: number;
  userLocation: UserLocation;
  otherFarmers: FarmerLocation[];
}

// --- Custom Icon Definitions ---
const createIcon = (color: string) => {
  const html = `
    <div style="
      background-color: ${color};
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 14px;
      font-weight: bold;
    ">
      🌾
    </div>`;
  return L.divIcon({
    html: html,
    className: 'custom-leaflet-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const userIconHtml = `
  <div style="
    background-color: #2563EB; /* Blue-600 */
    width: 40px;
    height: 40px;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    border: 3px solid white;
    box-shadow: 0 4px 8px rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  ">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(45deg);">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  </div>`;

const userIcon = L.divIcon({
  html: userIconHtml,
  className: 'custom-leaflet-user-icon',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const farmerIcons = {
  Low: createIcon('#16A34A'), // Green-600
  Moderate: createIcon('#F59E0B'), // Amber-500
  High: createIcon('#DC2626'), // Red-600
};
// --- End Custom Icons ---

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  center,
  zoom = 11,
  userLocation,
  otherFarmers,
}) => {
  const { language } = useLanguage();
  const getTranslation = (en: string, bn: string) => (language === 'en' ? en : bn);

  return (
    <MapContainer 
      center={[center.lat, center.lng]} 
      zoom={zoom} 
      scrollWheelZoom={true} 
      style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* User's Marker */}
      <Marker position={[userLocation.position.lat, userLocation.position.lng]} icon={userIcon}>
        <Popup>
          <b>{getTranslation("Your Location", "আপনার অবস্থান")}</b>
          <br />
          {userLocation.name}
        </Popup>
      </Marker>

      {/* Other Farmers' Markers */}
      {otherFarmers.map((farmer, index) => (
        <Marker 
          key={index} 
          position={[farmer.position.lat, farmer.position.lng]} 
          icon={farmerIcons[farmer.risk]}
        >
          <Popup>
            <b>{getTranslation("Neighboring Farm", "প্রতিবেশী খামার")}</b>
            <br />
            {getTranslation("Risk Level:", "ঝুঁকির মাত্রা:")} {getTranslation(farmer.risk, farmer.risk === 'Low' ? 'নিম্ন' : farmer.risk === 'Moderate' ? 'মাঝারি' : 'উচ্চ')}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default InteractiveMap;