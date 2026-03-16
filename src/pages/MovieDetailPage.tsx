import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Clock, Dumbbell, ChevronLeft, Heart, Flame, Play } from 'lucide-react';
import { movies, workouts } from '../data';
import { useApp } from '../hooks/useApp';
import WorkoutCard from '../components/WorkoutCard';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { favoriteMovies, toggleFavoriteMovie } = useApp();

  const movie = movies.find((m) => m.id === Number(id));
  const movieWorkouts = workouts.filter((w) => w.movieId === Number(id));

  if (!movie) {
    return (
      <div className="not-found">
        <h2>Movie not found</h2>
        <Link to="/movies" className="btn-primary">
          Back to Movies
        </Link>
      </div>
    );
  }

  const isFavorite = favoriteMovies.includes(movie.id);

  return (
    <div className="movie-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ChevronLeft size={20} />
        Back
      </button>

      <div className="movie-detail-hero">
        <div className="movie-detail-poster">
          <img src={movie.poster} alt={movie.title} />
        </div>
        <div className="movie-detail-info">
          <div className="movie-detail-header">
            <h1>{movie.title}</h1>
            <button
              className={`favorite-btn large ${isFavorite ? 'favorited' : ''}`}
              onClick={() => toggleFavoriteMovie(movie.id)}
            >
              <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="movie-meta-large">
            <span className="movie-year">{movie.year}</span>
            <span className="movie-duration">
              <Clock size={16} />
              {movie.duration} min
            </span>
            <span className="movie-rating">
              <Star size={16} fill="currentColor" />
              {movie.rating}/10
            </span>
          </div>
          <div className="movie-genres">
            {movie.genre.map((g) => (
              <span key={g} className="genre-tag">
                {g}
              </span>
            ))}
          </div>
          <p className="movie-detail-description">{movie.description}</p>
          <div className="workout-type-info">
            <Dumbbell size={20} />
            <span>
              Workout Type: <strong>{movie.workoutType.replace('-', ' ')}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="movie-workouts-section">
        <h2>
          <Flame size={24} />
          Available Workouts
        </h2>
        {movieWorkouts.length > 0 ? (
          <div className="workout-grid">
            {movieWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Play size={48} />
            <p>No specific workouts yet for this movie.</p>
            <Link to="/workouts" className="btn-primary">
              Browse All Workouts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
