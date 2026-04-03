import React from 'react';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const navItems = [
  { id: 'dashboard',    label: 'Overview',     icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions',  icon: ArrowLeftRight },
  { id: 'insights',     label: 'Insights',      icon: Lightbulb },
];

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const { activeTab } = state;

  return (
    <nav className="sidebar">
      <div className="sidebar-section-label">Navigation</div>
      {navItems.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`nav-item ${activeTab === id ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'SET_TAB', payload: id })}
          style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
        >
          <Icon size={16} />
          {label}
        </button>
      ))}
    </nav>
  );
}
