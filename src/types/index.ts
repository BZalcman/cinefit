export interface Movie {
  id: number;
  title: string;
  genre: string[];
  year: number;
  rating: number;
  poster: string;
  description: string;
  duration: number; // minutes
  workoutType: WorkoutType;
}

export type WorkoutType = 'cardio' | 'strength' | 'yoga' | 'hiit' | 'dance' | 'martial-arts';

export interface Workout {
  id: number;
  name: string;
  movieId: number;
  movieTitle: string;
  type: WorkoutType;
  duration: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  calories: number;
  exercises: Exercise[];
  description: string;
}

export interface Exercise {
  name: string;
  sets?: number;
  reps?: number;
  duration?: number; // seconds
  description: string;
}

export interface WorkoutSession {
  id: string;
  workoutId: number;
  workoutName: string;
  date: string;
  duration: number; // minutes
  calories: number;
  completed: boolean;
}

export interface UserProfile {
  name: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  weeklyGoal: number; // sessions per week
  favoriteGenres: string[];
}
