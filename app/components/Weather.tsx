"use client";
import { useState } from "react";
import Image from "next/image";

// Define types for weather data
interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
  };
}

const API_KEY = "17e2af8104664a6095891927253101"; // WeatherAPI key

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null); // Use correct type instead of `any`
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error.message);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch {
      setError("Failed to fetch weather data.");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-700">🌤️ Weather App</h1>

      {/* Search Input and Button - Stacked on Mobile, Side-by-Side on Larger Screens */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 w-full max-w-md mx-auto">
        <input
          type="text"
          className="w-full p-3 text-lg border border-gray-300 rounded-lg shadow-sm"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button 
          onClick={fetchWeather} 
          className="w-full md:w-auto px-5 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-500 text-lg">Fetching weather data...</p>}
      {error && <p className="text-red-500 text-lg">{error}</p>}

      {/* Weather Display */}
      {weather && (
        <div className="mt-6 p-6 border rounded-2xl shadow-lg bg-white w-full max-w-md mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {weather.location.name}, {weather.location.country}
          </h2>
          <Image 
           src={`https:${weather.current.condition.icon}`} // Ensure absolute URL
           alt={weather.current.condition.text} 
           width={100}
           height={100}
           className="mx-auto my-4"
          />

          <p className="text-4xl md:text-5xl font-extrabold text-blue-600">{weather.current.temp_c}°C</p>
          <p className="text-lg md:text-xl text-gray-600 mt-2">{weather.current.condition.text}</p>
          <div className="mt-4 text-lg text-gray-700">
            <p>💨 Wind Speed: {weather.current.wind_kph} kph</p>
            <p>💧 Humidity: {weather.current.humidity}%</p>
            <p>🌡️ Feels Like: {weather.current.feelslike_c}°C</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
