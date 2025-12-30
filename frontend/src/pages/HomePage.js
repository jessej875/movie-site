import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import './HomePage.css';

function HomePage() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(`/api/movies/search?query=${query}`);
      setSearchResults(response.data.results);
      setIsSearching(true);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />

      {isSearching && (
        <div className="search-results">
          <h2>Search Results:</h2>
          <ul>
            {searchResults.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default HomePage;
