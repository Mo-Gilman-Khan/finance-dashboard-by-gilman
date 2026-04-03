import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getSummary, formatINR } from '../../utils';

export default function SummaryCards() {
  const { state } = useApp();
  const { income, expense, balance } = getSummary(state.transactions);
  const savingsRate = income > 0 ? ((income - expense) / income * 100).toFixed(1) : 0;

  return (
    <div className="summary-grid">
      <div className="card summary-card balance">
        <div className="summary-label">
          <Wallet size={12} />
          Net Balance
        </div>
        <div className="summary-value balance mono">{formatINR(balance, true)}</div>
        <div className="summary-sub">Savings rate: {savingsRate}%</div>
      </div>

      <div className="card summary-card income">
        <div className="summary-label">
          <TrendingUp size={12} />
          Total Income
        </div>
        <div className="summary-value income mono">{formatINR(income, true)}</div>
        <div className="summary-sub">{state.transactions.filter(t => t.type === 'income').length} transactions</div>
      </div>

      <div className="card summary-card expense">
        <div className="summary-label">
          <TrendingDown size={12} />
          Total Expenses
        </div>
        <div className="summary-value expense mono">{formatINR(expense, true)}</div>
        <div className="summary-sub">{state.transactions.filter(t => t.type === 'expense').length} transactions</div>
      </div>
    </div>
  );
}
