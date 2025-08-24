// src/components/Header.jsx
import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";


export default function SearchBar() {
  const [city, setCity] = useState("San Francisco"); // default city
  return (
    <header className=" flex items-center justify-between px-4 py-3 backdrop-blur-md bg-white/10 text-white sticky top-0 z-50">
       {/* Display current city */}
      <div className="flex items-center gap-2">
  <img src="/public/weather1.png" alt="Weather Icon" className="w-6 h-6" />
  <span className="font-medium text-transparent bg-clip-text bg-white">
  Weather App
</span>

</div>



     

      {/* Right - Dummy Profile */}
      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
        <span className="text-xs font-bold">W</span>
      </div>
    </header>
  );
}
