"use client";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
        Welcome to API Nexus
      </h1>
      <p className="text-base md:text-lg text-gray-700 max-w-lg md:max-w-2xl">
        API Nexus is a powerful web platform designed to simplify your digital experience. 
        Offering <strong>Movie Search</strong>, <strong>Language Translation</strong>, and <strong>Weather Updates</strong>, it helps you 
        access essential information effortlessly.
      </p>
      <p className="text-base md:text-lg text-gray-700 max-w-lg md:max-w-2xl mt-4">
        Developed by <strong>Tharaka Dharmarathne</strong>, a <strong>BSc IT undergraduate at BCI Campus</strong>, API Nexus 
        is constantly evolving, with exciting new features planned for the future.
      </p>
      <p className="text-lg font-semibold text-blue-500 mt-6">
        🌟 Explore. Innovate. Experience the Power of APIs. 🌟
      </p>
    </div>
  );
}
