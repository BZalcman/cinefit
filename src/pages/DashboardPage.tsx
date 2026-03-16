import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Clock,
  Dumbbell,
  Calendar,
  TrendingUp,
  Trophy,
  Trash2,
} from 'lucide-react';
import { useApp } from '../hooks/useApp';

const DashboardPage: React.FC = () => {
  const { sessions, removeSession, profile } = useApp();

  const totalCalories = sessions.reduce((sum, s) => sum + s.calories, 0);
  const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);
  const totalSessions = sessions.length;

  const thisWeekSessions = sessions.filter((s) => {
    const sessionDate = new Date(s.date);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return sessionDate >= weekAgo;
  });

  const weeklyProgress = Math.min(
    Math.round((thisWeekSessions.length / profile.weeklyGoal) * 100),
    100
  );

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Track your fitness progress</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card-large">
          <div className="stat-icon-wrapper orange">
            <Flame size={28} />
          </div>
          <div>
            <span className="stat-value-large">{totalCalories.toLocaleString()}</span>
            <span className="stat-label">Total Calories Burned</span>
          </div>
        </div>
        <div className="stat-card-large">
          <div className="stat-icon-wrapper blue">
            <Clock size={28} />
          </div>
          <div>
            <span className="stat-value-large">{totalMinutes}</span>
            <span className="stat-label">Total Minutes Active</span>
          </div>
        </div>
        <div className="stat-card-large">
          <div className="stat-icon-wrapper purple">
            <Dumbbell size={28} />
          </div>
          <div>
            <span className="stat-value-large">{totalSessions}</span>
            <span className="stat-label">Workouts Completed</span>
          </div>
        </div>
        <div className="stat-card-large">
          <div className="stat-icon-wrapper green">
            <TrendingUp size={28} />
          </div>
          <div>
            <span className="stat-value-large">{thisWeekSessions.length}</span>
            <span className="stat-label">This Week</span>
          </div>
        </div>
      </div>

      {/* Weekly Goal Progress */}
      <div className="weekly-goal-card">
        <div className="goal-header">
          <div>
            <Trophy size={20} />
            <h3>Weekly Goal</h3>
          </div>
          <span className="goal-fraction">
            {thisWeekSessions.length}/{profile.weeklyGoal} sessions
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${weeklyProgress}%` }}
          />
        </div>
        <span className="progress-percent">{weeklyProgress}% complete</span>
      </div>

      {/* Recent Sessions */}
      <div className="sessions-section">
        <div className="section-header">
          <h2>
            <Calendar size={20} />
            Recent Workouts
          </h2>
          {sessions.length > 0 && (
            <Link to="/workouts" className="see-all">
              Find More →
            </Link>
          )}
        </div>

        {sessions.length === 0 ? (
          <div className="empty-state">
            <Dumbbell size={48} />
            <h3>No workouts yet</h3>
            <p>Start your first movie-inspired workout!</p>
            <Link to="/workouts" className="btn-primary">
              Browse Workouts
            </Link>
          </div>
        ) : (
          <div className="sessions-list">
            {sessions.slice(0, 10).map((session) => (
              <div key={session.id} className="session-item">
                <div className="session-info">
                  <h4>{session.workoutName}</h4>
                  <span className="session-date">
                    {new Date(session.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="session-stats">
                  <span>
                    <Clock size={14} />
                    {session.duration} min
                  </span>
                  <span>
                    <Flame size={14} />
                    {session.calories} cal
                  </span>
                </div>
                <button
                  className="remove-session-btn"
                  onClick={() => removeSession(session.id)}
                  aria-label="Remove session"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
