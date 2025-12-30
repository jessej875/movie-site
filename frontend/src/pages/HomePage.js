import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import './HomePage.css';

function HomePage() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const exampleMovie = {
    id: 123,
    title: "The Matrix",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    vote_average: 8.7
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    setIsSearching(true);
    setSearchResults([]);
  };

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />

      <h2>Random Movie:</h2>
      <div className="single-movie-container">
        <MovieCard movie={exampleMovie} />
      </div>

      {isSearching && (
        <div className="search-results">
          <p>Search results would go here</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
