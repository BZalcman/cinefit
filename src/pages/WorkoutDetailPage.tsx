import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Flame, ChevronLeft, CheckCircle, Play, Dumbbell } from 'lucide-react';
import { workouts } from '../data';
import { useApp } from '../hooks/useApp';
import type { WorkoutSession } from '../types';

const WorkoutDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addSession } = useApp();
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const workout = workouts.find((w) => w.id === Number(id));

  if (!workout) {
    return (
      <div className="not-found">
        <h2>Workout not found</h2>
        <Link to="/workouts" className="btn-primary">
          Back to Workouts
        </Link>
      </div>
    );
  }

  const difficultyColors = {
    beginner: '#22c55e',
    intermediate: '#f59e0b',
    advanced: '#ef4444',
  };

  const handleStart = () => {
    setStarted(true);
  };

  const handleComplete = () => {
    const session: WorkoutSession = {
      id: `${crypto.randomUUID()}`,
      workoutId: workout.id,
      workoutName: workout.name,
      date: new Date().toISOString(),
      duration: workout.duration,
      calories: workout.calories,
      completed: true,
    };
    addSession(session);
    setCompleted(true);
  };

  if (completed) {
    return (
      <div className="workout-complete">
        <CheckCircle size={80} className="complete-icon" />
        <h2>Workout Complete! 🎬</h2>
        <p>
          You just completed <strong>{workout.name}</strong>!
        </p>
        <div className="completion-stats">
          <div className="stat-card">
            <Clock size={24} />
            <span className="stat-value">{workout.duration}</span>
            <span className="stat-label">Minutes</span>
          </div>
          <div className="stat-card">
            <Flame size={24} />
            <span className="stat-value">{workout.calories}</span>
            <span className="stat-label">Calories</span>
          </div>
          <div className="stat-card">
            <Dumbbell size={24} />
            <span className="stat-value">{workout.exercises.length}</span>
            <span className="stat-label">Exercises</span>
          </div>
        </div>
        <div className="completion-actions">
          <Link to="/dashboard" className="btn-primary">
            View Dashboard
          </Link>
          <Link to="/workouts" className="btn-secondary">
            More Workouts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="workout-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ChevronLeft size={20} />
        Back
      </button>

      <div className="workout-detail-header">
        <div className="workout-detail-title">
          <span
            className="difficulty-badge large"
            style={{ color: difficultyColors[workout.difficulty] }}
          >
            {workout.difficulty}
          </span>
          <h1>{workout.name}</h1>
          <p className="workout-movie-ref">Based on: {workout.movieTitle}</p>
        </div>
        <div className="workout-detail-stats">
          <div className="stat-card">
            <Clock size={24} />
            <span className="stat-value">{workout.duration}</span>
            <span className="stat-label">Minutes</span>
          </div>
          <div className="stat-card">
            <Flame size={24} />
            <span className="stat-value">{workout.calories}</span>
            <span className="stat-label">Calories</span>
          </div>
          <div className="stat-card">
            <Dumbbell size={24} />
            <span className="stat-value">{workout.exercises.length}</span>
            <span className="stat-label">Exercises</span>
          </div>
        </div>
      </div>

      <p className="workout-detail-description">{workout.description}</p>

      <div className="exercises-section">
        <h2>Exercises</h2>
        <div className="exercises-list">
          {workout.exercises.map((exercise, index) => (
            <div key={index} className="exercise-item">
              <div className="exercise-number">{index + 1}</div>
              <div className="exercise-details">
                <h3>{exercise.name}</h3>
                <p>{exercise.description}</p>
                <div className="exercise-meta">
                  {exercise.sets && exercise.reps && (
                    <span className="exercise-stat">
                      {exercise.sets} sets × {exercise.reps} reps
                    </span>
                  )}
                  {exercise.duration && !exercise.sets && (
                    <span className="exercise-stat">
                      <Clock size={14} />
                      {exercise.duration >= 60
                        ? `${Math.floor(exercise.duration / 60)}m ${exercise.duration % 60}s`
                        : `${exercise.duration}s`}
                    </span>
                  )}
                  {exercise.sets && exercise.duration && !exercise.reps && (
                    <span className="exercise-stat">
                      {exercise.sets} sets × {exercise.duration}s
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="workout-actions">
        {!started ? (
          <button className="btn-primary btn-large" onClick={handleStart}>
            <Play size={20} />
            Start Workout
          </button>
        ) : (
          <>
            <div className="in-progress-badge">
              <span className="pulse-dot" />
              Workout In Progress
            </div>
            <button className="btn-success btn-large" onClick={handleComplete}>
              <CheckCircle size={20} />
              Complete Workout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkoutDetailPage;
