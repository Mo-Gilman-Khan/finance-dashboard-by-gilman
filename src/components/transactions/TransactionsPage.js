import React from 'react';
import { useState } from 'react';
import { Search, Plus, Download, Edit2, Trash2, ChevronUp, ChevronDown, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES, CATEGORY_COLORS } from '../../data/transactions';
import { getFilteredTransactions, formatINR, formatDate, exportToCSV } from '../../utils';
import TxnModal from './TxnModal';

const PAGE_SIZE = 12;

export default function TransactionsPage() {
  const { state, dispatch } = useApp();
  const { filters, role, transactions } = state;
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null); // null | 'add' | txn object

  const filtered = getFilteredTransactions(transactions, filters);
  const total = filtered.length;
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  function setFilter(obj) {
    dispatch({ type: 'SET_FILTER', payload: obj });
    setPage(1);
  }

  function toggleSort(col) {
    if (filters.sortBy === col) {
      setFilter({ sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc' });
    } else {
      setFilter({ sortBy: col, sortDir: 'desc' });
    }
  }

  function SortIcon({ col }) {
    if (filters.sortBy !== col) return <ChevronDown size={12} style={{ opacity: 0.3 }} />;
    return filters.sortDir === 'asc'
      ? <ChevronUp size={12} style={{ color: 'var(--accent-gold)' }} />
      : <ChevronDown size={12} style={{ color: 'var(--accent-gold)' }} />;
  }

  function handleDelete(id) {
    if (window.confirm('Delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>Transactions</h1>
        <p>Browse, search, and manage all financial activity</p>
      </div>

      {role === 'admin' && (
        <div className="admin-banner">
          <Edit2 size={14} />
          Admin mode — you can add, edit, and delete transactions.
        </div>
      )}

      {/* Filter bar */}
      <div className="filter-bar">
        <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
          <Search size={13} style={{
            position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--text-muted)', pointerEvents: 'none',
          }} />
          <input
            type="text"
            className="input-field w-full"
            placeholder="Search description or category..."
            style={{ paddingLeft: 30 }}
            value={filters.search}
            onChange={e => setFilter({ search: e.target.value })}
          />
        </div>

        <select className="input-field" value={filters.type}
          onChange={e => setFilter({ type: e.target.value })}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select className="input-field" value={filters.category}
          onChange={e => setFilter({ category: e.target.value })}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>

        <input type="date" className="input-field" value={filters.dateFrom}
          onChange={e => setFilter({ dateFrom: e.target.value })}
          title="From date" />
        <input type="date" className="input-field" value={filters.dateTo}
          onChange={e => setFilter({ dateTo: e.target.value })}
          title="To date" />

        <button className="btn btn-ghost" onClick={() => { dispatch({ type: 'RESET_FILTERS' }); setPage(1); }}>
          <X size={13} /> Reset
        </button>

        <button className="btn btn-ghost" onClick={() => exportToCSV(filtered)}>
          <Download size={13} /> Export CSV
        </button>

        {role === 'admin' && (
          <button className="btn btn-primary" onClick={() => setModal('add')}>
            <Plus size={13} /> Add
          </button>
        )}
      </div>

      {/* Table */}
      <div className="txn-table-wrap">
        {paginated.length === 0 ? (
          <div className="empty-state">
            <Search size={32} />
            <p>No transactions match your filters.</p>
            <button className="btn btn-ghost" onClick={() => { dispatch({ type: 'RESET_FILTERS' }); setPage(1); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th onClick={() => toggleSort('date')} className={filters.sortBy === 'date' ? 'sorted' : ''}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Date <SortIcon col="date" /></span>
                </th>
                <th>Description</th>
                <th onClick={() => toggleSort('category')} className={filters.sortBy === 'category' ? 'sorted' : ''}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Category <SortIcon col="category" /></span>
                </th>
                <th>Type</th>
                <th onClick={() => toggleSort('amount')} className={filters.sortBy === 'amount' ? 'sorted' : ''} style={{ textAlign: 'right' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>Amount <SortIcon col="amount" /></span>
                </th>
                {role === 'admin' && <th style={{ width: 80 }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {paginated.map(t => (
                <tr key={t.id}>
                  <td style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                    {formatDate(t.date)}
                  </td>
                  <td style={{ color: 'var(--text-primary)', maxWidth: 200 }}>{t.desc}</td>
                  <td>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="category-dot" style={{ background: CATEGORY_COLORS[t.category] || '#888' }} />
                      <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{t.category}</span>
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${t.type}`}>{t.type}</span>
                  </td>
                  <td className={`amount-cell ${t.type}`} style={{ textAlign: 'right' }}>
                    {t.type === 'income' ? '+' : '-'}{formatINR(Math.abs(t.amount))}
                  </td>
                  {role === 'admin' && (
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn-icon" onClick={() => setModal(t)} title="Edit">
                          <Edit2 size={13} />
                        </button>
                        <button className="btn-icon btn-danger" onClick={() => handleDelete(t.id)} title="Delete">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {total > PAGE_SIZE && (
        <div className="pagination">
          <span>{total} transactions · showing {(page-1)*PAGE_SIZE+1}–{Math.min(page*PAGE_SIZE, total)}</span>
          <div className="pagination-controls">
            <button className="btn-icon" disabled={page === 1} onClick={() => setPage(p => p-1)}>‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce((acc, p, i, arr) => {
                if (i > 0 && p - arr[i-1] > 1) acc.push('…');
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) => p === '…'
                ? <span key={i} style={{ padding: '0 4px', color: 'var(--text-muted)' }}>…</span>
                : <button key={p} className="btn-icon"
                    style={p === page ? { background: 'var(--accent-gold)', color: '#000', border: '1px solid var(--accent-gold)' } : {}}
                    onClick={() => setPage(p)}>{p}</button>
              )
            }
            <button className="btn-icon" disabled={page === totalPages} onClick={() => setPage(p => p+1)}>›</button>
          </div>
        </div>
      )}

      {modal && (
        <TxnModal
          txn={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
