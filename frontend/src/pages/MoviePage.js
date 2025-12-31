import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieDetail from '../components/MovieDetail';
import './MoviePage.css';

function MoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`/api/movies/${id}`);
      setMovie(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="movie-page loading">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-page error">
        <h2>Movie not found</h2>
        <button onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    );
  }

  return (
    <div className="movie-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
      <MovieDetail movie={movie} />
    </div>
  );
}

export default MoviePage;