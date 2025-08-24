// src/components/MapView.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Weather-based marker icons
const getWeatherIcon = (condition) => {
  let color = "blue"; // default

  if (condition.includes("rain")) color = "blue";
  else if (condition.includes("sun") || condition.includes("clear")) color = "yellow";
  else if (condition.includes("snow")) color = "white";
  else if (condition.includes("cloud")) color = "gray";
  else if (condition.includes("storm")) color = "red";

  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background:${color};
      width:16px;
      height:16px;
      border-radius:50%;
      border:2px solid black;
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

// Click-to-set marker component
function ClickableMarker({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lon: e.latlng.lng });
    },
  });
  return null;
}

export default function MapView({ lat, lon, city, condition, setLocation }) {
  if (!lat || !lon) return null;

  return (
    <div className="h-96 w-full rounded-2xl overflow-hidden shadow-lg">
      <MapContainer
        center={[lat, lon]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Satellite Tiles */}
        <TileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
        />

        {/* Add dynamic marker */}
        <Marker
          position={[lat, lon]}
          icon={getWeatherIcon(condition?.toLowerCase() || "")}
        >
          <Popup>
            <b>{city}</b> <br />
            Weather: {condition}
          </Popup>
        </Marker>

        {/* Click to move marker */}
        {setLocation && <ClickableMarker setLocation={setLocation} />}
      </MapContainer>
    </div>
  );
}


