import React from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { getSpendingByCategory } from '../../data/transactions';
import { getSummary, formatINR, getMonthlyComparison } from '../../utils';
import { TrendingUp, TrendingDown, Award, AlertTriangle, Target, Activity } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-elevated)', border: '1px solid var(--border-bright)',
      borderRadius: 8, padding: '10px 14px', fontSize: 12,
    }}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 6, fontWeight: 600 }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.fill, fontFamily: 'var(--font-mono)' }}>
          {p.name}: {formatINR(p.value, true)}
        </p>
      ))}
    </div>
  );
};

export default function InsightsPage() {
  const { state } = useApp();
  const { transactions } = state;
  const { income, expense, balance } = getSummary(transactions);
  const monthly = getMonthlyComparison(transactions);
  const byCategory = getSpendingByCategory(transactions);
  const topCategory = byCategory[0];
  const savingsRate = income > 0 ? ((income - expense) / income * 100) : 0;

  // Best and worst months
  const bestMonth  = [...monthly].sort((a, b) => b.net - a.net)[0];
  const worstMonth = [...monthly].sort((a, b) => a.net - b.net)[0];

  // Last 2 months comparison
  const lastTwo = monthly.slice(-2);
  const expenseDiff = lastTwo.length === 2
    ? ((lastTwo[1].expense - lastTwo[0].expense) / lastTwo[0].expense * 100).toFixed(1)
    : null;

  return (
    <div>
      <div className="page-header">
        <h1>Insights</h1>
        <p>Key observations and patterns from your financial data</p>
      </div>

      {/* Insight stat cards */}
      <div className="insights-grid">
        <div className="card insight-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <Award size={13} style={{ color: 'var(--accent-gold)' }} />
            Top Spending Category
          </div>
          {topCategory ? (
            <>
              <div className="insight-stat">{topCategory.name}</div>
              <p className="insight-desc">
                You've spent <strong style={{ color: 'var(--accent-red)' }}>{formatINR(topCategory.value, true)}</strong> on {topCategory.name.toLowerCase()} —
                the highest of all categories. Consider reviewing this spend.
              </p>
            </>
          ) : <p className="insight-desc text-muted">No expense data.</p>}
        </div>

        <div className="card insight-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <Target size={13} style={{ color: 'var(--accent-green)' }} />
            Savings Rate
          </div>
          <div className="insight-stat" style={{ color: savingsRate >= 30 ? 'var(--accent-green)' : savingsRate >= 15 ? 'var(--accent-gold)' : 'var(--accent-red)' }}>
            {savingsRate.toFixed(1)}%
          </div>
          <p className="insight-desc">
            {savingsRate >= 30
              ? '🟢 Excellent! You\'re saving over 30% of your income.'
              : savingsRate >= 15
              ? '🟡 Good savings rate, but there\'s room to improve toward 30%.'
              : '🔴 Low savings rate. Try to reduce discretionary expenses.'}
          </p>
        </div>

        <div className="card insight-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <TrendingUp size={13} style={{ color: 'var(--accent-blue)' }} />
            Best Month
          </div>
          {bestMonth && (
            <>
              <div className="insight-stat" style={{ color: 'var(--accent-green)' }}>{bestMonth.month}</div>
              <p className="insight-desc">
                Net surplus of <strong style={{ color: 'var(--accent-green)' }}>{formatINR(bestMonth.net, true)}</strong> — your strongest month. Income was {formatINR(bestMonth.income, true)}.
              </p>
            </>
          )}
        </div>

        <div className="card insight-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <Activity size={13} style={{ color: 'var(--accent-purple)' }} />
            Month-over-Month
          </div>
          {expenseDiff !== null ? (
            <>
              <div className="insight-stat" style={{ color: parseFloat(expenseDiff) > 0 ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                {parseFloat(expenseDiff) > 0 ? '+' : ''}{expenseDiff}%
              </div>
              <p className="insight-desc">
                Expenses {parseFloat(expenseDiff) > 0 ? 'increased' : 'decreased'} by {Math.abs(expenseDiff)}% from {lastTwo[0].month} to {lastTwo[1].month}.
              </p>
            </>
          ) : <p className="insight-desc text-muted">Not enough data.</p>}
        </div>
      </div>

      {/* Monthly bar chart */}
      <div className="card chart-card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <span className="card-title">Monthly Income vs Expenses</span>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthly} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
              axisLine={false} tickLine={false}
              tickFormatter={v => formatINR(v, true)} width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={v => <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{v}</span>} iconType="circle" iconSize={7} />
            <Bar dataKey="income"  name="Income"  fill="#2dd4a0" radius={[3,3,0,0]} />
            <Bar dataKey="expense" name="Expense" fill="#f06a6a" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category breakdown bars */}
      <div className="card" style={{ padding: 20 }}>
        <div className="card-header" style={{ padding: 0, marginBottom: 16 }}>
          <span className="card-title">Category Spending Breakdown</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>All time</span>
        </div>
        <div className="progress-bar-wrap">
          {byCategory.map(c => {
            const pct = (c.value / byCategory[0].value * 100).toFixed(0);
            return (
              <div className="progress-row" key={c.name}>
                <span style={{ color: 'var(--text-secondary)', fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="category-dot" style={{ background: c.color }} />
                  {c.name}
                </span>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${pct}%`, background: c.color }} />
                </div>
                <span className="progress-amount">{formatINR(c.value, true)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
