# Zorvyn Finance Dashboard

A premium, Bloomberg-inspired finance dashboard built with **React (Create React App)**. Submitted for the Frontend Developer Intern screening assessment.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start
# → Opens automatically at http://localhost:3000

# 3. Build for production
npm run build
```

### Deploy
Works out of the box on **Netlify**, **Vercel**, **GitHub Pages**, and **Render**:

**Netlify / Vercel:**
- Build command: `npm run build`
- Publish directory: `build`

**GitHub Pages:**
```bash
# Add to package.json: "homepage": "https://<username>.github.io/<repo>"
npm install --save-dev gh-pages
# Add scripts: "predeploy": "npm run build", "deploy": "gh-pages -d build"
npm run deploy
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── charts/
│   │   ├── BalanceTrendChart.js    # Area chart — 6-month balance + income trend
│   │   └── SpendingDonut.js        # Donut chart — spending by category
│   ├── insights/
│   │   └── InsightsPage.js         # Monthly bar chart, top category, savings rate
│   ├── layout/
│   │   ├── DashboardPage.js        # Overview — summary cards + recent activity
│   │   ├── SummaryCards.js         # Balance / Income / Expense stat cards
│   │   ├── Sidebar.js              # Navigation sidebar
│   │   ├── Topbar.js               # Header — role switcher + theme toggle
│   │   └── TickerStrip.js          # Scrolling market ticker (mock data)
│   └── transactions/
│       ├── TransactionsPage.js     # Full table with filters + pagination
│       └── TxnModal.js             # Add / Edit transaction modal
├── context/
│   └── AppContext.js               # Global state — useReducer + localStorage sync
├── data/
│   └── transactions.js             # 71 mock transactions (Jan–Jun 2025) + helpers
├── utils/
│   └── index.js                    # formatINR, filtering, CSV export helpers
├── App.js
├── index.js                        # CRA entry point
└── index.css                       # All styles — CSS variables, dark/light theme
```

---

## ✨ Features

### Dashboard Overview
- **Summary Cards** — Net Balance, Total Income, Total Expenses with savings rate
- **Balance Trend Chart** — 6-month area chart (balance + income overlay)
- **Spending Donut Chart** — Top 7 categories with % labels
- **Recent Activity** — Last 8 transactions inline

### Transactions
- 71 realistic mock transactions across Jan–Jun 2025
- Search by description or category
- Filter by type, category, and date range
- Sort by date, amount, or category
- Pagination (12 per page)
- CSV Export of current filtered view
- Admin-only: Add, Edit, Delete transactions

### Insights
- Highest spending category with recommendation
- Savings rate with qualitative assessment
- Best performing month by net surplus
- Month-over-month expense change
- Monthly income vs expense bar chart
- Full category breakdown with progress bars

### Role-Based UI
| Feature           | Viewer | Admin |
|-------------------|--------|-------|
| View all data     | ✅     | ✅    |
| Add transactions  | ❌     | ✅    |
| Edit transactions | ❌     | ✅    |
| Delete            | ❌     | ✅    |
| CSV Export        | ✅     | ✅    |

Switch via **Viewer / Admin** toggle in the top bar.

### Optional Enhancements
- ✅ Dark / Light mode toggle (persisted)
- ✅ LocalStorage persistence (transactions, role, theme)
- ✅ CSV Export

---

## 🎨 Design

**Aesthetic:** Bloomberg terminal-inspired — near-black backgrounds, gold accent (#E8B84B), green/red for income/expense.

**Fonts:** Syne (headings) · DM Sans (body) · DM Mono (numbers)

**State:** React `useReducer` + Context API. All state in one reducer; side effects in `useEffect`.

## 🛠 Tech Stack

| Tool         | Purpose                    |
|--------------|----------------------------|
| React 18     | UI framework               |
| CRA 5        | Build tooling              |
| Recharts     | Charts                     |
| Lucide React | Icons                      |
| date-fns     | Date formatting            |

No UI library — all CSS hand-written with custom properties.

---

*Built by Mo Gilman Khan · Zorvyn Frontend Intern Assessment · April 2026*
