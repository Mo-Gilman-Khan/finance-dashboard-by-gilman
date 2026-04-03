import React from 'react';
import { createContext, useContext, useReducer, useEffect } from 'react';
import { transactions as initialTransactions } from '../data/transactions';

const AppContext = createContext(null);

const STORAGE_KEY = 'zorvyn_finance_dashboard';

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

function saveToStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      transactions: state.transactions,
      theme: state.theme,
      role: state.role,
    }));
  } catch {}
}

const initialState = {
  transactions: initialTransactions,
  role: 'viewer',       // 'viewer' | 'admin'
  theme: 'dark',        // 'dark' | 'light'
  activeTab: 'dashboard',
  filters: {
    search: '',
    type: 'all',        // 'all' | 'income' | 'expense'
    category: 'all',
    sortBy: 'date',
    sortDir: 'desc',
    dateFrom: '',
    dateTo: '',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_TAB':
      return { ...state, activeTab: action.payload };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters };
    case 'ADD_TRANSACTION': {
      const newTxn = { ...action.payload, id: 't' + Date.now() };
      return { ...state, transactions: [newTxn, ...state.transactions] };
    }
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
    case 'LOAD_SAVED':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const saved = loadFromStorage();
  const merged = saved
    ? { ...initialState, transactions: saved.transactions ?? initialState.transactions, theme: saved.theme ?? 'dark', role: saved.role ?? 'viewer' }
    : initialState;

  const [state, dispatch] = useReducer(reducer, merged);

  useEffect(() => {
    saveToStorage(state);
  }, [state.transactions, state.theme, state.role]);

  // Apply theme class to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
