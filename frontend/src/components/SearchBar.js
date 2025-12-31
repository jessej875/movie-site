import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleHome = () => {
    setQuery('');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="search-bar-container">
      <button className="home-button" onClick={handleHome}>
        Home
      </button>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </form>
    </div>
  );
}

export default SearchBar;