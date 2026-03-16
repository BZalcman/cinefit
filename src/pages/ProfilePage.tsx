import React, { useState } from 'react';
import { User, Save, Star } from 'lucide-react';
import { useApp } from '../hooks/useApp';

const genres = ['Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi', 'Romance', 'Sports', 'Biography'];

const ProfilePage: React.FC = () => {
  const { profile, updateProfile, favoriteMovies } = useApp();
  const [name, setName] = useState(profile.name);
  const [fitnessLevel, setFitnessLevel] = useState(profile.fitnessLevel);
  const [weeklyGoal, setWeeklyGoal] = useState(profile.weeklyGoal);
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>(profile.favoriteGenres);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({ name, fitnessLevel, weeklyGoal, favoriteGenres });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleGenre = (genre: string) => {
    setFavoriteGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>Profile</h1>
        <p>Customize your fitness journey</p>
      </div>

      <div className="profile-form">
        <div className="profile-avatar">
          <div className="avatar-circle">
            <User size={48} />
          </div>
          <div className="profile-name-display">{profile.name}</div>
        </div>

        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Fitness Level</label>
          <div className="radio-group">
            {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
              <label key={level} className={`radio-option ${fitnessLevel === level ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="fitnessLevel"
                  value={level}
                  checked={fitnessLevel === level}
                  onChange={() => setFitnessLevel(level)}
                />
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="weekly-goal">
            Weekly Workout Goal:{' '}
            <strong>{weeklyGoal} sessions/week</strong>
          </label>
          <input
            id="weekly-goal"
            type="range"
            min={1}
            max={7}
            value={weeklyGoal}
            onChange={(e) => setWeeklyGoal(Number(e.target.value))}
          />
          <div className="range-labels">
            <span>1</span>
            <span>7</span>
          </div>
        </div>

        <div className="form-group">
          <label>
            <Star size={16} />
            Favorite Genres
          </label>
          <div className="genre-selector">
            {genres.map((genre) => (
              <button
                key={genre}
                className={`genre-btn ${favoriteGenres.includes(genre) ? 'selected' : ''}`}
                onClick={() => toggleGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <button
          className={`btn-primary btn-large ${saved ? 'btn-success' : ''}`}
          onClick={handleSave}
        >
          <Save size={20} />
          {saved ? 'Saved!' : 'Save Profile'}
        </button>
      </div>

      <div className="profile-stats">
        <h3>Your Stats</h3>
        <div className="profile-stat-item">
          <span>Favorite Movies</span>
          <strong>{favoriteMovies.length}</strong>
        </div>
        <div className="profile-stat-item">
          <span>Fitness Level</span>
          <strong style={{ textTransform: 'capitalize' }}>{profile.fitnessLevel}</strong>
        </div>
        <div className="profile-stat-item">
          <span>Weekly Goal</span>
          <strong>{profile.weeklyGoal} sessions</strong>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
