import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WorkoutCard from '../components/WorkoutCard';
import type { Workout } from '../types';

const mockWorkout: Workout = {
  id: 1,
  name: 'Rocky Training Regimen',
  movieId: 1,
  movieTitle: 'Rocky',
  type: 'strength',
  duration: 45,
  difficulty: 'intermediate',
  calories: 400,
  description: 'Channel your inner Rocky with this classic boxing-inspired workout.',
  exercises: [
    { name: 'Push-Ups', sets: 5, reps: 20, description: 'Classic push-ups' },
    { name: 'Pull-Ups', sets: 4, reps: 10, description: 'Back and biceps' },
  ],
};

describe('WorkoutCard', () => {
  it('renders workout name', () => {
    render(
      <BrowserRouter>
        <WorkoutCard workout={mockWorkout} />
      </BrowserRouter>
    );
    expect(screen.getByText('Rocky Training Regimen')).toBeInTheDocument();
  });

  it('renders movie title reference', () => {
    render(
      <BrowserRouter>
        <WorkoutCard workout={mockWorkout} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Based on:/)).toBeInTheDocument();
  });

  it('renders duration', () => {
    render(
      <BrowserRouter>
        <WorkoutCard workout={mockWorkout} />
      </BrowserRouter>
    );
    expect(screen.getByText('45 min')).toBeInTheDocument();
  });

  it('renders calories', () => {
    render(
      <BrowserRouter>
        <WorkoutCard workout={mockWorkout} />
      </BrowserRouter>
    );
    expect(screen.getByText('400 cal')).toBeInTheDocument();
  });

  it('renders difficulty badge', () => {
    render(
      <BrowserRouter>
        <WorkoutCard workout={mockWorkout} />
      </BrowserRouter>
    );
    expect(screen.getByText('intermediate')).toBeInTheDocument();
  });

  it('renders exercise count', () => {
    render(
      <BrowserRouter>
        <WorkoutCard workout={mockWorkout} />
      </BrowserRouter>
    );
    expect(screen.getByText('2 exercises')).toBeInTheDocument();
  });

  it('renders Start Workout link', () => {
    render(
      <BrowserRouter>
        <WorkoutCard workout={mockWorkout} />
      </BrowserRouter>
    );
    const link = screen.getByRole('link', { name: /start workout/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/workouts/1');
  });
});
