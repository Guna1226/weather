// src/components/OtherCities.jsx
import { MapPin } from "lucide-react";

const cities = [
  { name: "Chennai", temp: "32°C", condition: "Sunny" },
  { name: "Coimbatore", temp: "28°C", condition: "Cloudy" },
  { name: "Trichy", temp: "31°C", condition: "Partly Cloudy" },
  { name: "Salem", temp: "29°C", condition: "Rain" },
  { name: "Madurai", temp: "33°C", condition: "Sunny" },
];

export default function OtherCities() {
  return (
    <section className="w-full px-4 py-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        Other Large Cities
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cities.map((city) => (
          <div
            key={city.name}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-md hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={18} className="text-blue-400" />
              <h3 className="text-lg font-medium text-white">{city.name}</h3>
            </div>
            <p className="text-white text-2xl font-bold">{city.temp}</p>
            <p className="text-gray-300 text-sm">{city.condition}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
