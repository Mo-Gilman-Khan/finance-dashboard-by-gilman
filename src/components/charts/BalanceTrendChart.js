import React from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { generateBalanceTrend } from '../../data/transactions';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-bright)',
      borderRadius: 8,
      padding: '10px 14px',
      fontSize: 12,
    }}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 6, fontWeight: 600 }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color, fontFamily: 'var(--font-mono)' }}>
          {p.name}: {formatINR(p.value, true)}
        </p>
      ))}
    </div>
  );
};

export default function BalanceTrendChart() {
  const { state } = useApp();
  const data = generateBalanceTrend(state.transactions);

  return (
    <div className="card chart-card">
      <div className="card-header">
        <span className="card-title">Balance Trend</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>6-Month Overview</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#E8B84B" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#E8B84B" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#2dd4a0" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#2dd4a0" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
            axisLine={false} tickLine={false}
            tickFormatter={v => formatINR(v, true)}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={v => <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{v}</span>}
            iconType="circle" iconSize={7}
          />
          <Area type="monotone" dataKey="balance" name="Balance" stroke="#E8B84B" strokeWidth={2} fill="url(#balGrad)" dot={false} activeDot={{ r: 4, fill: '#E8B84B' }} />
          <Area type="monotone" dataKey="income"  name="Income"  stroke="#2dd4a0" strokeWidth={1.5} fill="url(#incGrad)" dot={false} activeDot={{ r: 3, fill: '#2dd4a0' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
