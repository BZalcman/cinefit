import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Dumbbell, LayoutDashboard, User, Clapperboard } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: <LayoutDashboard size={20} /> },
    { to: '/movies', label: 'Movies', icon: <Film size={20} /> },
    { to: '/workouts', label: 'Workouts', icon: <Dumbbell size={20} /> },
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { to: '/profile', label: 'Profile', icon: <User size={20} /> },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Clapperboard size={28} className="brand-icon" />
        <span className="brand-name">CineFit</span>
      </div>
      <ul className="navbar-links">
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
