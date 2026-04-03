import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { getSpendingByCategory } from '../../data/transactions';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-bright)',
      borderRadius: 8,
      padding: '8px 12px',
      fontSize: 12,
    }}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 3 }}>{d.name}</p>
      <p style={{ color: d.payload.color, fontFamily: 'var(--font-mono)' }}>{formatINR(d.value)}</p>
    </div>
  );
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.06) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#000" textAnchor="middle" dominantBaseline="central"
      style={{ fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

export default function SpendingDonut() {
  const { state } = useApp();
  const data = getSpendingByCategory(state.transactions).slice(0, 7);

  return (
    <div className="card chart-card">
      <div className="card-header">
        <span className="card-title">Spending Breakdown</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="var(--bg-surface)" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      {/* Legend */}
      <div style={{ padding: '0 16px 16px', display: 'flex', flexWrap: 'wrap', gap: '6px 16px' }}>
        {data.map(d => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
            <span style={{ color: 'var(--text-secondary)' }}>{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
