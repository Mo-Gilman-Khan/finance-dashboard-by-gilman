import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Topbar() {
  const { state, dispatch } = useApp();
  const { theme, role } = state;

  return (
    <header className="topbar">
      <div className="topbar-brand">
        ZORVYN <span>Finance</span>
      </div>

      <div className="topbar-right">
        {/* Role switcher */}
        <div className="role-switcher">
          <span>Role:</span>
          <div className="role-pill">
            <button
              className={role === 'viewer' ? 'active' : ''}
              onClick={() => dispatch({ type: 'SET_ROLE', payload: 'viewer' })}
            >
              Viewer
            </button>
            <button
              className={role === 'admin' ? 'active' : ''}
              onClick={() => dispatch({ type: 'SET_ROLE', payload: 'admin' })}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Theme toggle */}
        <button
          className="theme-toggle"
          onClick={() => dispatch({ type: 'SET_THEME', payload: theme === 'dark' ? 'light' : 'dark' })}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
