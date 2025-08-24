// src/components/Daily.jsx
import React from "react";
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaBolt } from "react-icons/fa";

// Map Open-Meteo weather codes to icons
const weatherCodeToIcon = (code) => {
  if (code >= 0 && code <= 1) return <FaSun className="w-6 h-6 text-yellow-400" />; // Clear
  if (code >= 2 && code <= 3) return <FaCloud className="w-6 h-6 text-gray-400" />; // Partly cloudy
  if (code >= 45 && code <= 48) return <FaCloud className="w-6 h-6 text-gray-500" />; // Fog/mist
  if (code >= 51 && code <= 67) return <FaCloudRain className="w-6 h-6 text-blue-400" />; // Rain
  if (code >= 71 && code <= 77) return <FaSnowflake className="w-6 h-6 text-blue-200" />; // Snow
  if (code >= 95) return <FaBolt className="w-6 h-6 text-yellow-300" />; // Thunderstorm
  return <FaSun className="w-6 h-6 text-yellow-400" />; // Default
};

export default function Daily({ data }) {
  if (!data) return null;

  return (
   <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-6">
  <h3 className="text-xl font-semibold mb-4 bg-white bg-clip-text text-transparent">
    Daily Forecast
  </h3>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4 md:gap-6">
    {data.time.map((day, i) => (
      <div
        key={i}
        className="bg-gradient-to-r from-blue-500 to-purple-500 backdrop-blur-md p-4 md:p-6 lg:p-8 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/30 transition"
      >
        <span className="font-medium text-xs sm:text-sm md:text-base mb-2 text-white">
          {new Date(day).toLocaleDateString("en-US", { weekday: "short" })}
        </span>

        <div className="mb-2 scale-110 md:scale-125">
          {weatherCodeToIcon(data.weathercode[i])}
        </div>

        <span className="text-sm sm:text-base md:text-lg font-semibold">
          {data.temperature_2m_min[i]}°C - {data.temperature_2m_max[i]}°C
        </span>
      </div>
    ))}
  </div>
</div>

  );
}


