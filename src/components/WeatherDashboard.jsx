// src/components/WeatherDashboard.jsx
import React from "react";
import { 
  FaSun, 
  FaCloud, 
  FaTint, 
  FaEye, 
  FaWind, 
  FaArrowDown, 
  FaFire 
} from "react-icons/fa";


function WeatherDashboard({ weather, city }) {
  if (!weather) return null;

  const current = weather.current_weather;
  const daily = weather.daily;
  const hourly = weather.hourly;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{city}</h1>
        <p className="text-gray-300">
          Today • {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      {/* Main Grid */}
      {/* Main Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

  {/* Temperature Card */}
  <div className="col-span-1 md:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg flex flex-col items-center md:items-start gap-2">
    <div className="flex items-center gap-2">
      <FaSun className="w-6 h-6 text-yellow-400" />
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
        {current.temperature}°
      </h2>
    </div>
    <p className="text-gray-300">Feels like {current.temperature}°</p>
    <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-300 text-sm">
      <div className="flex items-center gap-1">
        <FaWind className="w-4 h-4 text-blue-300" /> {current.windspeed} km/h
      </div>
      <div className="flex items-center gap-1">
        <FaTint className="w-4 h-4 text-sky-400" /> {hourly.relative_humidity_2m?.[0] || "--"}%
      </div>
      <div className="flex items-center gap-1">
        <FaSun className="w-4 h-4 text-yellow-400" /> Sunrise {daily.sunrise?.[0]}
      </div>
      <div className="flex items-center gap-1">
        <FaSun className="w-4 h-4 rotate-180 text-yellow-300" /> Sunset {daily.sunset?.[0]}
      </div>
    </div>
  </div>

  {/* UV Index */}
  <div className="bg-white/10 rounded-2xl p-6 shadow-lg flex flex-col items-center md:items-start gap-2">
    <FaFire className="w-6 h-6 text-orange-400" />
    <h3 className="text-lg font-semibold text-yellow-400">UV Index</h3>
    <p className="text-2xl font-bold">{daily.uv_index_max?.[0] || "--"}</p>
    <p className="text-sm text-yellow-400">
      {daily.uv_index_max?.[0] < 3
        ? "Low"
        : daily.uv_index_max?.[0] < 6
        ? "Moderate"
        : "High"}
    </p>
  </div>

  {/* Precipitation */}
  <div className="bg-white/10 rounded-2xl p-6 shadow-lg flex flex-col items-center md:items-start gap-2">
    <FaCloud className="w-6 h-6 text-blue-400" />
    <h3 className="text-lg font-semibold text-sky-200">Precipitation</h3>
    <p className="text-2xl font-bold">{daily.precipitation_sum?.[0] || 0} mm</p>
    <p className="text-sm text-sky-200">Today</p>
  </div>

  {/* Visibility */}
  <div className="bg-white/10 rounded-2xl p-6 shadow-lg flex flex-col items-center md:items-start gap-2">
    <FaEye className="w-6 h-6 text-green-400" />
    <h3 className="text-lg font-semibold text-green-400">Visibility</h3>
    <p className="text-2xl font-bold">{(hourly.visibility?.[0] / 1000).toFixed(1) || "--"} km</p>
    <p className="text-sm text-green-400">Now</p>
  </div>

  {/* Pressure */}
  <div className="bg-white/10 rounded-2xl p-6 shadow-lg flex flex-col items-center md:items-start gap-2">
    <FaArrowDown className="w-6 h-6 text-indigo-300" />
    <h3 className="text-lg font-semibold text-indigo-300">Pressure</h3>
    <p className="text-2xl font-bold">{hourly.pressure_msl?.[0] || "--"} hPa</p>
    <p className="text-sm text-indigo-300">Normal</p>
  </div>

  {/* Wind */}
  <div className="bg-white/10 rounded-2xl p-6 shadow-lg flex flex-col items-center md:items-start gap-2">
    <FaWind className="w-6 h-6 text-blue-300" />
    <h3 className="text-lg font-semibold text-blue-300">Wind</h3>
    <p className="text-2xl font-bold">{current.windspeed} m/s</p>
  </div>

  {/* Humidity */}
  <div className="bg-white/10 rounded-2xl p-6 shadow-lg flex flex-col items-center md:items-start gap-2">
    <FaTint className="w-6 h-6 text-blue-400" />
    <h3 className="text-lg font-semibold text-sky-400">Humidity</h3>
    <p className="text-2xl font-bold">{hourly.relative_humidity_2m?.[0] || "--"}%</p>
    <p className="text-sm text-sky-400">
      {hourly.relative_humidity_2m?.[0] > 80 ? "Feels uncomfortable" : "Comfortable"}
    </p>
  </div>
</div>
</div>

  );
}

export default WeatherDashboard;



