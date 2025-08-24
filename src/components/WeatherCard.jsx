import React from "react";

export default function WeatherCard({ data, city }) {
  // Optional chaining to avoid undefined errors
  const temp = data?.current_weather?.temperature;
  const desc = data?.current_weather?.weathercode;

  // Render a loading state if data is not available yet
  if (!data || !data.current_weather) {
    return (
      <div className="bg-white/20 p-6 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold">{city}</h2>
        <p className="mt-2 text-lg">Loading weather...</p>
      </div>
    );
  }

  return (
    <div className="bg-white/20 p-6 rounded-2xl shadow-lg text-center">
      <h2 className="text-2xl font-bold">{city}</h2>
      <p className="text-6xl font-semibold mt-2">{temp}°C</p>
      <p className="mt-2 text-lg">Weather code: {desc}</p>
    </div>
  );
}


