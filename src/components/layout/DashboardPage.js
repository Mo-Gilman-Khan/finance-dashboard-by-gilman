import React from 'react';
import SummaryCards from '../layout/SummaryCards';
import BalanceTrendChart from '../charts/BalanceTrendChart';
import SpendingDonut from '../charts/SpendingDonut';
import { useApp } from '../../context/AppContext';
import { formatINR, formatDate } from '../../utils';
import { CATEGORY_COLORS } from '../../data/transactions';

export default function DashboardPage() {
  const { state } = useApp();
  const recent = [...state.transactions]
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, 8);

  return (
    <div>
      <div className="page-header">
        <h1>Overview</h1>
        <p>Your financial summary at a glance</p>
      </div>

      <SummaryCards />

      <div className="charts-grid">
        <BalanceTrendChart />
        <SpendingDonut />
      </div>

      {/* Recent transactions mini-table */}
      <div className="card" style={{ padding: 20 }}>
        <div className="card-header" style={{ padding: 0, marginBottom: 16 }}>
          <span className="card-title">Recent Activity</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Last {recent.length} transactions</span>
        </div>
        {recent.length === 0 ? (
          <div className="empty-state"><p>No transactions yet.</p></div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {recent.map((t, i) => (
              <div key={t.id} style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'center',
                padding: '9px 0',
                borderTop: i > 0 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="category-dot" style={{ background: CATEGORY_COLORS[t.category] || '#888' }} />
                  <div>
                    <div style={{ fontSize: 13.5, color: 'var(--text-primary)' }}>{t.desc}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      {t.category} · {formatDate(t.date)}
                    </div>
                  </div>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                  fontSize: 13.5,
                  color: t.type === 'income' ? 'var(--accent-green)' : 'var(--accent-red)',
                }}>
                  {t.type === 'income' ? '+' : '-'}{formatINR(Math.abs(t.amount))}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
