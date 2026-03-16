import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Dumbbell, Film, TrendingUp, Flame } from 'lucide-react';
import { movies, workouts } from '../data';
import { useApp } from '../hooks/useApp';
import MovieCard from '../components/MovieCard';
import WorkoutCard from '../components/WorkoutCard';

const HomePage: React.FC = () => {
  const { sessions } = useApp();
  const featuredMovies = movies.slice(0, 4);
  const featuredWorkouts = workouts.slice(0, 3);

  const totalCalories = sessions.reduce((sum, s) => sum + s.calories, 0);
  const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Where <span className="highlight">Cinema</span> Meets
            <br />
            <span className="highlight">Fitness</span>
          </h1>
          <p className="hero-subtitle">
            Get inspired by your favorite movies and turn them into epic workouts.
            Train like your favorite characters.
          </p>
          <div className="hero-actions">
            <Link to="/workouts" className="btn-primary btn-large">
              <Play size={20} />
              Start Training
            </Link>
            <Link to="/movies" className="btn-secondary btn-large">
              <Film size={20} />
              Browse Movies
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <Flame size={24} className="stat-icon" />
            <div>
              <span className="stat-value">{totalCalories}</span>
              <span className="stat-label">Calories Burned</span>
            </div>
          </div>
          <div className="hero-stat">
            <Dumbbell size={24} className="stat-icon" />
            <div>
              <span className="stat-value">{sessions.length}</span>
              <span className="stat-label">Workouts Done</span>
            </div>
          </div>
          <div className="hero-stat">
            <TrendingUp size={24} className="stat-icon" />
            <div>
              <span className="stat-value">{totalMinutes}</span>
              <span className="stat-label">Minutes Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="section">
        <div className="section-header">
          <h2>
            <Film size={24} />
            Featured Movies
          </h2>
          <Link to="/movies" className="see-all">
            See All →
          </Link>
        </div>
        <div className="movie-grid">
          {featuredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Featured Workouts */}
      <section className="section">
        <div className="section-header">
          <h2>
            <Dumbbell size={24} />
            Popular Workouts
          </h2>
          <Link to="/workouts" className="see-all">
            See All →
          </Link>
        </div>
        <div className="workout-grid">
          {featuredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Transform Your Workouts?</h2>
        <p>
          Choose a movie that inspires you and start your fitness journey today.
          Every great story begins with a single step.
        </p>
        <Link to="/movies" className="btn-primary btn-large">
          Find Your Movie
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
