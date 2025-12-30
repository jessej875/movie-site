import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import './MovieSlider.css';

function MovieSlider({ title, movies }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="movie-slider">
      <h2 className="slider-title">{title}</h2>
      <div className="slider-container">
        <button className="slider-button left" onClick={() => scroll('left')}>
          ‹
        </button>
        <div className="slider-content" ref={sliderRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <button className="slider-button right" onClick={() => scroll('right')}>
          ›
        </button>
      </div>
    </div>
  );
}

export default MovieSlider;