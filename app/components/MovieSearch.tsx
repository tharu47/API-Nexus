"use client";
import { useState } from "react";
import Image from "next/image";

// Define a type for movie data
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const API_KEY = "4529dbc"; // API key

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]); // Define movies as an array of Movie type

  const fetchMovies = async () => {
    if (!query) return;
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">🎬 Movie Search</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchMovies} className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Search
        </button>
      </div>

      {/* Movie Grid with Clickable Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <a
            key={movie.imdbID}
            href={`https://www.imdb.com/title/${movie.imdbID}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="border p-4 rounded-lg shadow-md flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <Image
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
              alt={movie.Title}
              width={300}
              height={400}
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="font-semibold mt-2 text-lg">{movie.Title}</h2>
            <p className="text-sm text-gray-500">{movie.Year}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
