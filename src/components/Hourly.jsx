// src/components/Hourly.jsx
import React from "react";
import { FaSun, FaCloud, FaCloudRain, FaBolt, FaSnowflake } from "react-icons/fa";

export default function Hourly({ data }) {
  if (!data) return null;

  // Map weather code to icons
  const getIcon = (code) => {
    if (code === 0) return <FaSun className="w-6 h-6 text-yellow-400" />;
    if ([1, 2, 3].includes(code)) return <FaCloud className="w-6 h-6 text-gray-400" />;
    if ([45, 48].includes(code)) return <FaCloud className="w-6 h-6 text-gray-500" />;
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
      return <FaCloudRain className="w-6 h-6 text-sky-400" />;
    if ([71, 73, 75, 77].includes(code)) return <FaSnowflake className="w-6 h-6 text-blue-200" />;
    if ([95, 96, 99].includes(code)) return <FaBolt className="w-6 h-6 text-yellow-300" />;
    return <FaSun className="w-6 h-6 text-yellow-400" />;
  };

  return (
   <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-6">
  <h3 className="text-xl font-semibold mb-4 bg-white bg-clip-text text-transparent">
    Hourly Forecast
  </h3>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6">
    {data.time.slice(0, 12).map((time, i) => (
      <div
        key={i}
        className="bg-gradient-to-br from-blue-400 via-gray-600 to-blue-800

 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center hover:bg-white/30 transition"
      >
        <span className="text-sm font-medium text-yellow-400">
          {time.split("T")[1].slice(0, 5)}
        </span>
        <div className="my-3 scale-125">{getIcon(data.weathercode[i])}</div>
        <span className="text-xl font-semibold">
          {Math.round(data.temperature_2m[i])}°C
        </span>
      </div>
    ))}
  </div>
</div>

  );
}  


