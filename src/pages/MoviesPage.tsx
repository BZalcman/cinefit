import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { movies } from '../data';
import type { WorkoutType } from '../types';
import MovieCard from '../components/MovieCard';

const workoutTypes: { value: WorkoutType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'strength', label: 'Strength' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'hiit', label: 'HIIT' },
  { value: 'dance', label: 'Dance' },
  { value: 'martial-arts', label: 'Martial Arts' },
];

const MoviesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<WorkoutType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');

  const filteredMovies = movies
    .filter((movie) => {
      const matchesSearch =
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = selectedType === 'all' || movie.workoutType === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'year') return b.year - a.year;
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="movies-page">
      <div className="page-header">
        <h1>Movies &amp; Workouts</h1>
        <p>Find your perfect movie-inspired workout</p>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search movies or genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <Filter size={18} />
          <div className="workout-type-filters">
            {workoutTypes.map((type) => (
              <button
                key={type.value}
                className={`filter-btn ${selectedType === type.value ? 'active' : ''}`}
                onClick={() => setSelectedType(type.value)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="sort-group">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'rating' | 'year' | 'title')}
          >
            <option value="rating">Rating</option>
            <option value="year">Year</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {filteredMovies.length === 0 ? (
        <div className="empty-state">
          <p>No movies found matching your search.</p>
          <button className="btn-secondary" onClick={() => { setSearchQuery(''); setSelectedType('all'); }}>
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
