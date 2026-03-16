import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import type { Movie } from '../types';
import { useApp } from '../hooks/useApp';

interface MovieCardProps {
  movie: Movie;
}

const workoutTypeColors: Record<string, string> = {
  cardio: '#f97316',
  strength: '#ef4444',
  yoga: '#8b5cf6',
  hiit: '#ec4899',
  dance: '#06b6d4',
  'martial-arts': '#f59e0b',
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { favoriteMovies, toggleFavoriteMovie } = useApp();
  const isFavorite = favoriteMovies.includes(movie.id);

  return (
    <div className="movie-card">
      <div className="movie-card-poster">
        <img src={movie.poster} alt={movie.title} loading="lazy" />
        <button
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            toggleFavoriteMovie(movie.id);
          }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <div
          className="workout-type-badge"
          style={{ backgroundColor: workoutTypeColors[movie.workoutType] }}
        >
          {movie.workoutType.replace('-', ' ')}
        </div>
      </div>
      <div className="movie-card-info">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-year">{movie.year}</span>
          <span className="movie-rating">
            <Star size={14} fill="currentColor" />
            {movie.rating}
          </span>
        </div>
        <div className="movie-genres">
          {movie.genre.map((g) => (
            <span key={g} className="genre-tag">
              {g}
            </span>
          ))}
        </div>
        <p className="movie-description">{movie.description}</p>
        <Link to={`/movies/${movie.id}`} className="btn-primary">
          View Workout
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
