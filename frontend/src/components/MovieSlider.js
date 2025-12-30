import React, { useRef, useState } from 'react';
import MovieCard from './MovieCard';
import './MovieSlider.css';

function MovieSlider({ title, movies }) {
  const sliderRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const cardWidth = 280;
      const cardsToScroll = 4;
      const scrollAmount = cardWidth * cardsToScroll;
      
      let newPosition;
      if (direction === 'left') {
        newPosition = Math.max(scrollPosition - scrollAmount, 0);
      } else {
        const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        newPosition = Math.min(scrollPosition + scrollAmount, maxScroll);
      }
      
      sliderRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      
      setScrollPosition(newPosition);
    }
  };


  const showButtons = movies.length > 4;

  return (
    <div className="movie-slider">
      <h2 className="slider-title">{title}</h2>
      <div className="slider-container">
        {showButtons && scrollPosition > 0 && (
          <button className="slider-button left" onClick={() => scroll('left')}>
            ‹
          </button>
        )}
        <div className="slider-content" ref={sliderRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {showButtons && (
          <button className="slider-button right" onClick={() => scroll('right')}>
            ›
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieSlider;