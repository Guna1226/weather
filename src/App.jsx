// src/App.jsx

import React, { useEffect, useState } from "react";

import Hourly from "./components/Hourly";
import Daily from "./components/Daily";
import WeatherDashboard from "./components/WeatherDashboard";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Header from "./components/Header";
import BackgroundVideo from "./components/BackgroundVideo";
import MapView from "./components/MapView";

const DEFAULT_COORDS = { lat: 13.0827, lon: 80.2707 }; // Chennai, India

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Chennai");
  const [coords, setCoords] = useState(DEFAULT_COORDS);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&hourly=temperature_2m,weathercode,relative_humidity_2m,pressure_msl,visibility&daily=temperature_2m_max,temperature_2m_min,weathercode,uv_index_max,precipitation_sum,sunrise,sunset&timezone=auto`;
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("Weather fetch error", err);
      }
    }
    fetchWeather();
  }, [coords]);

  async function handleSearch(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setCoords({
          lat: data.results[0].latitude,
          lon: data.results[0].longitude,
        });
      }
    } catch (err) {
      console.error("Geocoding error", err);
    }
  }

  if (!weather) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-white">
        Loading weather...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <Header />

      {/* Background Video */}
      <BackgroundVideo temperature={weather?.current_weather?.temperature} />

      <div className="absolute inset-0 bg-black/30 -z-5" />

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center gap-2 p-4 mt-10 relative z-10"
      >
        <div className="relative w-72">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
            placeholder="Search city..."
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition shadow-md"
        >
          Search
        </button>
      </form>

      {/* Weather Dashboard */}
      {weather && (
        <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6 relative z-10">

          {/* Main Weather Section */}
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-100 via-blue-300 to-white bg-clip-text text-transparent">
              {city}
            </h1>
            <p className="text-lg text-white/70 mt-2">
              {weather.current_weather.temperature}°C – {weather.current_weather.weathercode}
            </p>
          </div>

          <WeatherDashboard weather={weather} city={city} />

          {/* Forecast Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-6xl mx-auto relative z-10">
            {/* Hourly Forecast */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
              <Hourly data={weather.hourly} />
            </div>

            {/* Daily Forecast */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
              <Daily data={weather.daily} />
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Satellite Map
            </h3>
            <MapView
              lat={coords.lat}
              lon={coords.lon}
              city={city}
              onLocationSelect={(lat, lon) => setCoords({ lat, lon })}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;







