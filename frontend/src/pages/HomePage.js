import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import MovieSlider from '../components/MovieSlider';
import './HomePage.css';

function HomePage() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const [trendingRes, topRatedRes, popularRes, nowPlayingRes] = await Promise.all([
        axios.get('/api/movies/trending'),
        axios.get('/api/movies/top-rated'),
        axios.get('/api/movies/popular'),
        axios.get('/api/movies/now-playing')
      ]);

      setTrending(trendingRes.data.results);
      setTopRated(topRatedRes.data.results);
      setPopular(popularRes.data.results);
      setNowPlaying(nowPlayingRes.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setIsSearching(false);
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
      
      {isSearching ? (
        <div className="search-results">
          <MovieSlider title="Search Results" movies={searchResults} />
        </div>
      ) : (
        <>
          <MovieSlider title="Trending This Week" movies={trending} />
          <MovieSlider title="Top Rated" movies={topRated} />
          <MovieSlider title="Popular" movies={popular} />
          <MovieSlider title="Now Playing" movies={nowPlaying} />
        </>
      )}
    </div>
  );
}

export default HomePage;