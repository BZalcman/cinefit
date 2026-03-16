import React, { createContext, useState, useEffect } from 'react';
import type { WorkoutSession, UserProfile } from '../types';

interface AppContextType {
  sessions: WorkoutSession[];
  profile: UserProfile;
  addSession: (session: WorkoutSession) => void;
  removeSession: (id: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  favoriteMovies: number[];
  toggleFavoriteMovie: (movieId: number) => void;
}

const defaultProfile: UserProfile = {
  name: 'Fitness Fan',
  fitnessLevel: 'intermediate',
  weeklyGoal: 3,
  favoriteGenres: ['Action', 'Drama'],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<WorkoutSession[]>(() => {
    const stored = localStorage.getItem('cinefit-sessions');
    return stored ? JSON.parse(stored) : [];
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const stored = localStorage.getItem('cinefit-profile');
    return stored ? JSON.parse(stored) : defaultProfile;
  });

  const [favoriteMovies, setFavoriteMovies] = useState<number[]>(() => {
    const stored = localStorage.getItem('cinefit-favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cinefit-sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('cinefit-profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('cinefit-favorites', JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  const addSession = (session: WorkoutSession) => {
    setSessions((prev) => [session, ...prev]);
  };

  const removeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const toggleFavoriteMovie = (movieId: number) => {
    setFavoriteMovies((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  return (
    <AppContext.Provider
      value={{
        sessions,
        profile,
        addSession,
        removeSession,
        updateProfile,
        favoriteMovies,
        toggleFavoriteMovie,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
export type { AppContextType };

