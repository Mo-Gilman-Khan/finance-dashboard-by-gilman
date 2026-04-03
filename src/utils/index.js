import React from 'react';
export function formatINR(amount, compact = false) {
  const abs = Math.abs(amount);
  if (compact) {
    if (abs >= 100000) return `₹${(abs / 100000).toFixed(1)}L`;
    if (abs >= 1000) return `₹${(abs / 1000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export function getFilteredTransactions(transactions, filters) {
  let result = [...transactions];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(t =>
      t.desc.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  }
  if (filters.type !== 'all') {
    result = result.filter(t => t.type === filters.type);
  }
  if (filters.category !== 'all') {
    result = result.filter(t => t.category === filters.category);
  }
  if (filters.dateFrom) {
    result = result.filter(t => t.date >= filters.dateFrom);
  }
  if (filters.dateTo) {
    result = result.filter(t => t.date <= filters.dateTo);
  }

  const dir = filters.sortDir === 'asc' ? 1 : -1;
  result.sort((a, b) => {
    if (filters.sortBy === 'date') return dir * (a.date > b.date ? 1 : -1);
    if (filters.sortBy === 'amount') return dir * (Math.abs(a.amount) - Math.abs(b.amount));
    if (filters.sortBy === 'category') return dir * a.category.localeCompare(b.category);
    return 0;
  });

  return result;
}

export function getSummary(transactions) {
  const income  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
  return { income, expense, balance: income - expense };
}

export function exportToCSV(transactions) {
  const headers = ['ID', 'Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows = transactions.map(t =>
    [t.id, t.date, `"${t.desc}"`, t.category, t.type, t.amount].join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `transactions_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function getMonthlyComparison(transactions) {
  const byMonth = {};
  transactions.forEach(t => {
    const m = t.date.slice(0, 7);
    if (!byMonth[m]) byMonth[m] = { income: 0, expense: 0 };
    if (t.type === 'income') byMonth[m].income += t.amount;
    else byMonth[m].expense += Math.abs(t.amount);
  });
  return Object.entries(byMonth)
    .sort()
    .map(([month, data]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
      ...data,
      net: data.income - data.expense,
    }));
}
