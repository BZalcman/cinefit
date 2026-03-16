import React, { useState } from 'react';
import { Search, Dumbbell } from 'lucide-react';
import { workouts } from '../data';
import type { WorkoutType } from '../types';
import WorkoutCard from '../components/WorkoutCard';

const workoutTypes: { value: WorkoutType | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'strength', label: 'Strength' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'hiit', label: 'HIIT' },
  { value: 'dance', label: 'Dance' },
  { value: 'martial-arts', label: 'Martial Arts' },
];

const difficulties = ['all', 'beginner', 'intermediate', 'advanced'] as const;

const WorkoutsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<WorkoutType | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'all' | 'beginner' | 'intermediate' | 'advanced'
  >('all');

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch =
      workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.movieTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || workout.type === selectedType;
    const matchesDifficulty =
      selectedDifficulty === 'all' || workout.difficulty === selectedDifficulty;
    return matchesSearch && matchesType && matchesDifficulty;
  });

  return (
    <div className="workouts-page">
      <div className="page-header">
        <h1>Movie Workouts</h1>
        <p>Choose a workout inspired by your favorite films</p>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search workouts or movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Workout Type:</label>
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

        <div className="filter-group">
          <label>Difficulty:</label>
          <div className="workout-type-filters">
            {difficulties.map((d) => (
              <button
                key={d}
                className={`filter-btn ${selectedDifficulty === d ? 'active' : ''}`}
                onClick={() => setSelectedDifficulty(d)}
              >
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredWorkouts.length === 0 ? (
        <div className="empty-state">
          <Dumbbell size={48} />
          <p>No workouts found. Try different filters.</p>
          <button
            className="btn-secondary"
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setSelectedDifficulty('all');
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="workout-grid">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutsPage;
