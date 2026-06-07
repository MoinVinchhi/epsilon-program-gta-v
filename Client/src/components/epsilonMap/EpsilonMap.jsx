// src/EpsilonMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useEffect } from 'react';
import './epslionmap.css'


// Fix default icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});
const centers = [
  {
    name: 'Epsilon Center - Vinewood Hills',
    position: [34.0712, -118.3228],
    description: 'The main headquarters of the Epsilon Program located in the upscale Vinewood Hills. This large and distinctive building serves as the central hub for the cult’s activities and leadership.'
  },
  {
    name: 'Epsilon Center - El Burro Heights',
    position: [34.0451, -118.2442],
    description: 'A secondary Epsilon Program location situated in the El Burro Heights area. This center is less prominent but still plays a significant role in the cult’s operations within the region.'
  },
  {
    name: 'Epsilon Center - South Los Santos',
    position: [34.0250, -118.4955],
    description: 'A smaller Epsilon Program center located in South Los Santos. This facility serves as a local meeting place for members and supporters in the southern part of the city.'
  },
  {
    name: 'Epsilon Program Billboard - Downtown',
    position: [34.0219, -118.4814],
    description: 'A billboard advertisement for the Epsilon Program located in a high-traffic area. This billboard is used to promote the cult’s message and attract new followers.'
  },
  {
    name: 'Epsilon Program Retreat - Countryside',
    position: [33.9270, -118.4011],
    description: 'A secluded retreat area used by the Epsilon Program for spiritual gatherings and isolation. This tranquil location is where members go for meditation and deeper immersion in the cult’s beliefs.'
  },
  {
    name: 'Epsilon Program Statue - Downtown Vinewood',
    position: [34.0738, -118.3263],
    description: 'A statue of the Epsilon Program’s founder located in Downtown Vinewood. This statue serves as a monument to the cult’s influence and presence in the city.'
  },
  {
    name: 'Epsilon Program Research Lab - East Los Santos',
    position: [34.0135, -118.2473],
    description: 'A research facility associated with the Epsilon Program, where members conduct studies related to their beliefs and practices. Located in the industrial area of East Los Santos.'
  },
  {
    name: 'Epsilon Program Festival Grounds - Sandy Shores',
    position: [33.9121, -118.4111],
    description: 'An open area used for large Epsilon Program gatherings and festivals. Located in the desert region of Sandy Shores, this site hosts major events and ceremonies for cult members.'
  },
  {
    name: 'Epsilon Program Church - Paleto Bay',
    position: [36.0068, -120.5001],
    description: 'A small church in Paleto Bay used by the Epsilon Program for religious services and gatherings. It serves the community of members located in the northern outskirts of Los Santos.'
  },
  {
    name: 'Epsilon Program Vehicle - Vinewood',
    position: [34.0674, -118.3450],
    description: 'A distinctive Epsilon Program vehicle often seen patrolling the Vinewood area. This vehicle is used for promotional purposes and to maintain a visible presence in the city.'
  }
];


const customIcon = new L.Icon({
  iconUrl: 'https://static.vecteezy.com/system/resources/previews/012/932/929/large_2x/kingdom-blue-flag-free-png.png',
  iconSize: [105, 141],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


const InitialView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), {
      animate: true,
    });
  }, [map, center]);
  return null;
};

const EpsilonMap = () => {
  const mapCenter = centers[0].position; // Use the position of the first marker as the initial view

  return (
    <div className="flex flex-col h-screen justify-center">
      {/* Fixed header */}
      <header className="bg-zinc-900 p-4 z-10 shadow-md">
        <h1 className="text-xl font-bold">Epsilon Program Locations</h1>
        <p className="text-sm">Explore the various centers and significant locations of the Epsilon Program.</p>
      </header>

      {/* Map container */}
      <div className="map-wrapper">
        {/* <div className="flex-1 map-container"> */}
        <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {centers.map((center, index) => (
            <Marker key={index} position={center.position} icon={customIcon}>
              <Popup>
                <b>{center.name}</b><br />
                {center.description}
              </Popup>
            </Marker>
          ))}
          <InitialView center={mapCenter} />
        </MapContainer>
        {/* </div> */}
      </div>
    </div>
  );
}

export default EpsilonMap;