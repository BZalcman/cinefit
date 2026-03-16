import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import { useApp } from '../hooks/useApp';

// Helper component to test context
const TestComponent = () => {
  const { sessions, profile, addSession, favoriteMovies, toggleFavoriteMovie, updateProfile } = useApp();
  return (
    <div>
      <div data-testid="session-count">{sessions.length}</div>
      <div data-testid="profile-name">{profile.name}</div>
      <div data-testid="favorites-count">{favoriteMovies.length}</div>
      <button
        onClick={() =>
          addSession({
            id: 'test-1',
            workoutId: 1,
            workoutName: 'Test Workout',
            date: new Date().toISOString(),
            duration: 30,
            calories: 200,
            completed: true,
          })
        }
      >
        Add Session
      </button>
      <button onClick={() => toggleFavoriteMovie(1)}>Toggle Favorite</button>
      <button onClick={() => updateProfile({ name: 'New Name' })}>Update Name</button>
    </div>
  );
};

describe('AppContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderTestComponent = () => {
    return render(
      <BrowserRouter>
        <AppProvider>
          <TestComponent />
        </AppProvider>
      </BrowserRouter>
    );
  };

  it('provides initial empty sessions', () => {
    renderTestComponent();
    expect(screen.getByTestId('session-count')).toHaveTextContent('0');
  });

  it('provides default profile name', () => {
    renderTestComponent();
    expect(screen.getByTestId('profile-name')).toHaveTextContent('Fitness Fan');
  });

  it('can add a session', () => {
    renderTestComponent();
    const addBtn = screen.getByRole('button', { name: 'Add Session' });
    fireEvent.click(addBtn);
    expect(screen.getByTestId('session-count')).toHaveTextContent('1');
  });

  it('can toggle a favorite movie', () => {
    renderTestComponent();
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');
    fireEvent.click(screen.getByRole('button', { name: 'Toggle Favorite' }));
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');
    fireEvent.click(screen.getByRole('button', { name: 'Toggle Favorite' }));
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');
  });

  it('can update profile name', () => {
    renderTestComponent();
    expect(screen.getByTestId('profile-name')).toHaveTextContent('Fitness Fan');
    fireEvent.click(screen.getByRole('button', { name: 'Update Name' }));
    expect(screen.getByTestId('profile-name')).toHaveTextContent('New Name');
  });
});
