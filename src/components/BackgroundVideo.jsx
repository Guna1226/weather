import React from "react";

const videoMap = {
  Clear: "/videos/clear.mp4",
  Clouds: "/videos/clouds.mp4",
  Snow: "/videos/snow.mp4",
  Heat: "/videos/heat.mp4",  // create this video or reuse clear.mp4
};

function getTemperatureCategory(temp) {
  if (temp === undefined || temp === null) return "Clear";

  if (temp < 10) return "Snow";
  if (temp >= 10 && temp < 20) return "Clouds";
  if (temp >= 20 && temp < 30) return "Clear";
  if (temp >= 30) return "Heat";

  return "Clear";
}

export default function BackgroundVideo({ temperature }) {
  const category = getTemperatureCategory(temperature);
  const videoSrc = videoMap[category];

  return (
    <video
      className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}


