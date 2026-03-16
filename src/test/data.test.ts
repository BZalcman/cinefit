import { describe, it, expect } from 'vitest';
import { movies, workouts } from '../data';

describe('Data', () => {
  describe('movies', () => {
    it('has movies', () => {
      expect(movies.length).toBeGreaterThan(0);
    });

    it('each movie has required fields', () => {
      movies.forEach((movie) => {
        expect(movie.id).toBeDefined();
        expect(movie.title).toBeTruthy();
        expect(movie.genre).toBeInstanceOf(Array);
        expect(movie.genre.length).toBeGreaterThan(0);
        expect(movie.year).toBeGreaterThan(1900);
        expect(movie.rating).toBeGreaterThanOrEqual(0);
        expect(movie.rating).toBeLessThanOrEqual(10);
        expect(movie.poster).toBeTruthy();
        expect(movie.description).toBeTruthy();
        expect(movie.duration).toBeGreaterThan(0);
        expect(movie.workoutType).toBeTruthy();
      });
    });

    it('has unique movie IDs', () => {
      const ids = movies.map((m) => m.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('workouts', () => {
    it('has workouts', () => {
      expect(workouts.length).toBeGreaterThan(0);
    });

    it('each workout has required fields', () => {
      workouts.forEach((workout) => {
        expect(workout.id).toBeDefined();
        expect(workout.name).toBeTruthy();
        expect(workout.movieId).toBeDefined();
        expect(workout.movieTitle).toBeTruthy();
        expect(workout.type).toBeTruthy();
        expect(workout.duration).toBeGreaterThan(0);
        expect(workout.difficulty).toMatch(/^(beginner|intermediate|advanced)$/);
        expect(workout.calories).toBeGreaterThan(0);
        expect(workout.exercises).toBeInstanceOf(Array);
        expect(workout.exercises.length).toBeGreaterThan(0);
        expect(workout.description).toBeTruthy();
      });
    });

    it('has unique workout IDs', () => {
      const ids = workouts.map((w) => w.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('workout movie references exist in movies list', () => {
      const movieIds = new Set(movies.map((m) => m.id));
      workouts.forEach((workout) => {
        expect(movieIds.has(workout.movieId)).toBe(true);
      });
    });
  });
});
