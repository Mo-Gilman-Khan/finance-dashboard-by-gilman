import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Topbar from './components/layout/Topbar';
import Sidebar from './components/layout/Sidebar';
import TickerStrip from './components/layout/TickerStrip';
import DashboardPage from './components/layout/DashboardPage';
import TransactionsPage from './components/transactions/TransactionsPage';
import InsightsPage from './components/insights/InsightsPage';
import './index.css';

function AppInner() {
  const { state } = useApp();
  const { activeTab } = state;

  return (
    <>
      <Topbar />
      <TickerStrip />
      <div className="app-shell">
        <Sidebar />
        <main className="main-content">
          {activeTab === 'dashboard'    && <DashboardPage />}
          {activeTab === 'transactions' && <TransactionsPage />}
          {activeTab === 'insights'     && <InsightsPage />}
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
