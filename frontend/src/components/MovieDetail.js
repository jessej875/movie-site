import React from 'react';
import './MovieDetail.css';

function MovieDetail({ movie }) {
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : 'https://via.placeholder.com/1920x1080?text=No+Image';

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';
  const genres = movie.genres ? movie.genres.map(g => g.name).join(', ') : 'N/A';

  const director = movie.credits?.crew?.find(person => person.job === 'Director');
  const cast = movie.credits?.cast?.slice(0, 5) || [];

  const trailer = movie.videos?.results?.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <div className="movie-detail">
      <div 
        className="backdrop" 
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="backdrop-overlay"></div>
      </div>
      
      <div className="detail-content">
        <div className="detail-poster">
          <img src={posterUrl} alt={movie.title} />
        </div>
        
        <div className="detail-info">
          <h1 className="detail-title">{movie.title}</h1>
          
          <div className="detail-meta">
            <span className="rating">⭐ {movie.vote_average?.toFixed(1)}</span>
            <span>{releaseYear}</span>
            <span>{runtime}</span>
          </div>
          
          <div className="detail-genres">{genres}</div>
          
          <div className="detail-overview">
            <h3>Overview</h3>
            <p>{movie.overview || 'No overview available.'}</p>
          </div>
          
          {director && (
            <div className="detail-director">
              <strong>Director:</strong> {director.name}
            </div>
          )}
          
          {cast.length > 0 && (
            <div className="detail-cast">
              <h3>Cast</h3>
              <div className="cast-list">
                {cast.map(actor => (
                  <div key={actor.id} className="cast-member">
                    {actor.profile_path ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} 
                        alt={actor.name}
                      />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                    <p className="actor-name">{actor.name}</p>
                    <p className="character-name">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {trailer && (
            <div className="detail-trailer">
              <h3>Trailer</h3>
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;