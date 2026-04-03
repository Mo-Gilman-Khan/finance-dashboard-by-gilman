import React from 'react';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/transactions';

const empty = {
  date: new Date().toISOString().slice(0, 10),
  desc: '',
  category: 'Food & Dining',
  type: 'expense',
  amount: '',
};

export default function TxnModal({ txn, onClose }) {
  const { dispatch } = useApp();
  const [form, setForm] = useState(txn ? {
    ...txn, amount: Math.abs(txn.amount).toString()
  } : empty);

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function handleSubmit() {
    if (!form.desc || !form.amount || !form.date) return;
    const amt = parseFloat(form.amount);
    if (isNaN(amt) || amt <= 0) return;
    const payload = {
      ...form,
      amount: form.type === 'expense' ? -amt : amt,
    };
    if (txn) {
      dispatch({ type: 'EDIT_TRANSACTION', payload: { ...payload, id: txn.id } });
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload });
    }
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-header">
          <h2>{txn ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button className="btn-icon" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Date</label>
            <input type="date" className="input-field w-full"
              value={form.date} onChange={e => set('date', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="input-field w-full"
              value={form.type} onChange={e => set('type', e.target.value)}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <input type="text" className="input-field w-full" placeholder="e.g. Grocery Store"
            value={form.desc} onChange={e => set('desc', e.target.value)} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="input-field w-full"
              value={form.category} onChange={e => set('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Amount (₹)</label>
            <input type="number" className="input-field w-full" placeholder="0"
              min="0" step="0.01"
              value={form.amount} onChange={e => set('amount', e.target.value)} />
          </div>
        </div>

        <div className="flex gap-2" style={{ marginTop: 8 }}>
          <button className="btn btn-ghost" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} style={{ flex: 1 }}>
            {txn ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
}
