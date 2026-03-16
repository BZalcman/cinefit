import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import MovieCard from '../components/MovieCard';
import type { Movie } from '../types';

const mockMovie: Movie = {
  id: 1,
  title: 'Rocky',
  genre: ['Drama', 'Sports'],
  year: 1976,
  rating: 8.1,
  poster: 'https://example.com/rocky.jpg',
  description: 'A small-time boxer gets a once-in-a-lifetime chance.',
  duration: 119,
  workoutType: 'strength',
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AppProvider>{ui}</AppProvider>
    </BrowserRouter>
  );
};

describe('MovieCard', () => {
  it('renders movie title', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Rocky')).toBeInTheDocument();
  });

  it('renders movie year', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('1976')).toBeInTheDocument();
  });

  it('renders movie rating', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('8.1')).toBeInTheDocument();
  });

  it('renders genres', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Drama')).toBeInTheDocument();
    expect(screen.getByText('Sports')).toBeInTheDocument();
  });

  it('renders workout type badge', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('strength')).toBeInTheDocument();
  });

  it('renders a View Workout link', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);
    const link = screen.getByRole('link', { name: /view workout/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/movies/1');
  });

  it('toggles favorite when heart button is clicked', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);
    const favBtn = screen.getByRole('button', { name: /add to favorites/i });
    expect(favBtn).toBeInTheDocument();
    fireEvent.click(favBtn);
    expect(screen.getByRole('button', { name: /remove from favorites/i })).toBeInTheDocument();
  });
});
