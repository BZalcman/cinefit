import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Flame, Dumbbell, ChevronRight } from 'lucide-react';
import type { Workout } from '../types';

interface WorkoutCardProps {
  workout: Workout;
}

const difficultyColors = {
  beginner: '#22c55e',
  intermediate: '#f59e0b',
  advanced: '#ef4444',
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <div className="workout-card">
      <div className="workout-card-header">
        <div className="workout-type-icon">
          <Dumbbell size={24} />
        </div>
        <div
          className="difficulty-badge"
          style={{ color: difficultyColors[workout.difficulty] }}
        >
          {workout.difficulty}
        </div>
      </div>
      <h3>{workout.name}</h3>
      <p className="workout-movie">Based on: {workout.movieTitle}</p>
      <p className="workout-description">{workout.description}</p>
      <div className="workout-stats">
        <div className="stat">
          <Clock size={16} />
          <span>{workout.duration} min</span>
        </div>
        <div className="stat">
          <Flame size={16} />
          <span>{workout.calories} cal</span>
        </div>
        <div className="stat">
          <Dumbbell size={16} />
          <span>{workout.exercises.length} exercises</span>
        </div>
      </div>
      <Link to={`/workouts/${workout.id}`} className="btn-primary">
        Start Workout
        <ChevronRight size={18} />
      </Link>
    </div>
  );
};

export default WorkoutCard;
