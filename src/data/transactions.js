export const CATEGORIES = [
  'Housing', 'Food & Dining', 'Transport', 'Entertainment',
  'Healthcare', 'Shopping', 'Utilities', 'Education',
  'Travel', 'Freelance', 'Salary', 'Investment Returns'
];

export const CATEGORY_COLORS = {
  'Housing':           '#E8B84B',
  'Food & Dining':     '#E05C5C',
  'Transport':         '#5B9EE8',
  'Entertainment':     '#A78BFA',
  'Healthcare':        '#34D399',
  'Shopping':          '#FB923C',
  'Utilities':         '#94A3B8',
  'Education':         '#38BDF8',
  'Travel':            '#F472B6',
  'Freelance':         '#4ADE80',
  'Salary':            '#22D3EE',
  'Investment Returns':'#FBBF24',
};

const raw = [
  // Jan 2025
  { id:'t001', date:'2025-01-02', desc:'Monthly Salary',        category:'Salary',           amount:85000,  type:'income'  },
  { id:'t002', date:'2025-01-03', desc:'Apartment Rent',        category:'Housing',          amount:-22000, type:'expense' },
  { id:'t003', date:'2025-01-05', desc:'Swiggy – Dinner',       category:'Food & Dining',    amount:-620,   type:'expense' },
  { id:'t004', date:'2025-01-07', desc:'Ola Cab',               category:'Transport',        amount:-280,   type:'expense' },
  { id:'t005', date:'2025-01-08', desc:'Netflix Subscription',  category:'Entertainment',    amount:-649,   type:'expense' },
  { id:'t006', date:'2025-01-10', desc:'Pharmacy',              category:'Healthcare',       amount:-1200,  type:'expense' },
  { id:'t007', date:'2025-01-12', desc:'Amazon Order',          category:'Shopping',         amount:-3400,  type:'expense' },
  { id:'t008', date:'2025-01-14', desc:'Electricity Bill',      category:'Utilities',        amount:-1800,  type:'expense' },
  { id:'t009', date:'2025-01-16', desc:'Freelance – Logo Work', category:'Freelance',        amount:12000,  type:'income'  },
  { id:'t010', date:'2025-01-18', desc:'Udemy Course',          category:'Education',        amount:-1999,  type:'expense' },
  { id:'t011', date:'2025-01-20', desc:'Zomato – Lunch',        category:'Food & Dining',    amount:-480,   type:'expense' },
  { id:'t012', date:'2025-01-22', desc:'Metro Card Recharge',   category:'Transport',        amount:-500,   type:'expense' },
  { id:'t013', date:'2025-01-25', desc:'Mutual Fund Returns',   category:'Investment Returns',amount:4200,  type:'income'  },
  { id:'t014', date:'2025-01-28', desc:'Grocery – BigBasket',   category:'Food & Dining',    amount:-2800,  type:'expense' },

  // Feb 2025
  { id:'t015', date:'2025-02-01', desc:'Monthly Salary',        category:'Salary',           amount:85000,  type:'income'  },
  { id:'t016', date:'2025-02-03', desc:'Apartment Rent',        category:'Housing',          amount:-22000, type:'expense' },
  { id:'t017', date:'2025-02-05', desc:'Valentine Dinner',      category:'Food & Dining',    amount:-3200,  type:'expense' },
  { id:'t018', date:'2025-02-07', desc:'Spotify Premium',       category:'Entertainment',    amount:-119,   type:'expense' },
  { id:'t019', date:'2025-02-10', desc:'Rapido – Rides',        category:'Transport',        amount:-340,   type:'expense' },
  { id:'t020', date:'2025-02-12', desc:'Doctor Visit',          category:'Healthcare',       amount:-800,   type:'expense' },
  { id:'t021', date:'2025-02-14', desc:'Gift Shopping',         category:'Shopping',         amount:-4500,  type:'expense' },
  { id:'t022', date:'2025-02-16', desc:'Water & Gas Bill',      category:'Utilities',        amount:-900,   type:'expense' },
  { id:'t023', date:'2025-02-18', desc:'Freelance – Web Design',category:'Freelance',        amount:18000,  type:'income'  },
  { id:'t024', date:'2025-02-22', desc:'Grocery Store',         category:'Food & Dining',    amount:-2400,  type:'expense' },
  { id:'t025', date:'2025-02-25', desc:'SIP Returns',           category:'Investment Returns',amount:3800,  type:'income'  },

  // Mar 2025
  { id:'t026', date:'2025-03-01', desc:'Monthly Salary',        category:'Salary',           amount:85000,  type:'income'  },
  { id:'t027', date:'2025-03-02', desc:'Apartment Rent',        category:'Housing',          amount:-22000, type:'expense' },
  { id:'t028', date:'2025-03-05', desc:'Holi Celebration',      category:'Entertainment',    amount:-1800,  type:'expense' },
  { id:'t029', date:'2025-03-08', desc:'Petrol Fill-up',        category:'Transport',        amount:-2200,  type:'expense' },
  { id:'t030', date:'2025-03-10', desc:'Pharmacy',              category:'Healthcare',       amount:-650,   type:'expense' },
  { id:'t031', date:'2025-03-12', desc:'Myntra Shopping',       category:'Shopping',         amount:-5200,  type:'expense' },
  { id:'t032', date:'2025-03-15', desc:'Internet Bill',         category:'Utilities',        amount:-1199,  type:'expense' },
  { id:'t033', date:'2025-03-18', desc:'Freelance – Branding',  category:'Freelance',        amount:25000,  type:'income'  },
  { id:'t034', date:'2025-03-20', desc:'Goa Trip – Flights',    category:'Travel',           amount:-8500,  type:'expense' },
  { id:'t035', date:'2025-03-22', desc:'Goa Trip – Hotel',      category:'Travel',           amount:-6000,  type:'expense' },
  { id:'t036', date:'2025-03-25', desc:'Grocery',               category:'Food & Dining',    amount:-3100,  type:'expense' },
  { id:'t037', date:'2025-03-28', desc:'Investment Dividend',   category:'Investment Returns',amount:5500,  type:'income'  },

  // Apr 2025
  { id:'t038', date:'2025-04-01', desc:'Monthly Salary',        category:'Salary',           amount:85000,  type:'income'  },
  { id:'t039', date:'2025-04-02', desc:'Apartment Rent',        category:'Housing',          amount:-22000, type:'expense' },
  { id:'t040', date:'2025-04-05', desc:'Restaurant – Birthday', category:'Food & Dining',    amount:-4200,  type:'expense' },
  { id:'t041', date:'2025-04-08', desc:'Cab – Airport',         category:'Transport',        amount:-1100,  type:'expense' },
  { id:'t042', date:'2025-04-10', desc:'Prime Video',           category:'Entertainment',    amount:-1499,  type:'expense' },
  { id:'t043', date:'2025-04-14', desc:'Health Checkup',        category:'Healthcare',       amount:-3500,  type:'expense' },
  { id:'t044', date:'2025-04-16', desc:'Electronics – Keyboard',category:'Shopping',         amount:-7800,  type:'expense' },
  { id:'t045', date:'2025-04-20', desc:'Electricity Bill',      category:'Utilities',        amount:-2100,  type:'expense' },
  { id:'t046', date:'2025-04-22', desc:'Freelance – App UI',    category:'Freelance',        amount:30000,  type:'income'  },
  { id:'t047', date:'2025-04-25', desc:'Grocery',               category:'Food & Dining',    amount:-2900,  type:'expense' },
  { id:'t048', date:'2025-04-28', desc:'SIP Returns',           category:'Investment Returns',amount:4600,  type:'income'  },

  // May 2025
  { id:'t049', date:'2025-05-01', desc:'Monthly Salary',        category:'Salary',           amount:90000,  type:'income'  },
  { id:'t050', date:'2025-05-02', desc:'Apartment Rent',        category:'Housing',          amount:-22000, type:'expense' },
  { id:'t051', date:'2025-05-05', desc:'Swiggy – Multiple',     category:'Food & Dining',    amount:-1800,  type:'expense' },
  { id:'t052', date:'2025-05-08', desc:'Ola – Weekly',          category:'Transport',        amount:-620,   type:'expense' },
  { id:'t053', date:'2025-05-10', desc:'Book Fair',             category:'Education',        amount:-2400,  type:'expense' },
  { id:'t054', date:'2025-05-12', desc:'Pharmacy',              category:'Healthcare',       amount:-450,   type:'expense' },
  { id:'t055', date:'2025-05-15', desc:'Flipkart Shopping',     category:'Shopping',         amount:-6100,  type:'expense' },
  { id:'t056', date:'2025-05-18', desc:'Mumbai Trip',           category:'Travel',           amount:-9200,  type:'expense' },
  { id:'t057', date:'2025-05-20', desc:'Freelance – Dashboard', category:'Freelance',        amount:22000,  type:'income'  },
  { id:'t058', date:'2025-05-25', desc:'Investment Returns',    category:'Investment Returns',amount:6200,  type:'income'  },
  { id:'t059', date:'2025-05-28', desc:'Grocery',               category:'Food & Dining',    amount:-3300,  type:'expense' },

  // Jun 2025
  { id:'t060', date:'2025-06-01', desc:'Monthly Salary',        category:'Salary',           amount:90000,  type:'income'  },
  { id:'t061', date:'2025-06-02', desc:'Apartment Rent',        category:'Housing',          amount:-22000, type:'expense' },
  { id:'t062', date:'2025-06-05', desc:'Zomato Orders',         category:'Food & Dining',    amount:-2100,  type:'expense' },
  { id:'t063', date:'2025-06-08', desc:'Petrol',                category:'Transport',        amount:-2400,  type:'expense' },
  { id:'t064', date:'2025-06-10', desc:'Concert Tickets',       category:'Entertainment',    amount:-3200,  type:'expense' },
  { id:'t065', date:'2025-06-12', desc:'Gym Membership',        category:'Healthcare',       amount:-2500,  type:'expense' },
  { id:'t066', date:'2025-06-15', desc:'Wardrobe Shopping',     category:'Shopping',         amount:-8900,  type:'expense' },
  { id:'t067', date:'2025-06-18', desc:'Utilities Bundle',      category:'Utilities',        amount:-2200,  type:'expense' },
  { id:'t068', date:'2025-06-20', desc:'Freelance – Mobile App',category:'Freelance',        amount:35000,  type:'income'  },
  { id:'t069', date:'2025-06-22', desc:'Coursera Subscription', category:'Education',        amount:-3600,  type:'expense' },
  { id:'t070', date:'2025-06-25', desc:'SIP Returns',           category:'Investment Returns',amount:5100,  type:'income'  },
  { id:'t071', date:'2025-06-28', desc:'Grocery',               category:'Food & Dining',    amount:-3000,  type:'expense' },
];

export const transactions = raw.map(t => ({
  ...t,
  amount: t.amount,
}));

export function generateBalanceTrend(txns) {
  const sorted = [...txns].sort((a, b) => new Date(a.date) - new Date(b.date));
  let balance = 120000; // opening balance
  const points = [];
  const byMonth = {};

  sorted.forEach(t => {
    const month = t.date.slice(0, 7);
    if (!byMonth[month]) byMonth[month] = { income: 0, expense: 0 };
    if (t.type === 'income') byMonth[month].income += t.amount;
    else byMonth[month].expense += Math.abs(t.amount);
  });

  Object.entries(byMonth).sort().forEach(([month, data]) => {
    balance += data.income - data.expense;
    points.push({
      month: new Date(month + '-01').toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
      balance: Math.round(balance),
      income: data.income,
      expense: data.expense,
    });
  });
  return points;
}

export function getSpendingByCategory(txns) {
  const map = {};
  txns.filter(t => t.type === 'expense').forEach(t => {
    map[t.category] = (map[t.category] || 0) + Math.abs(t.amount);
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || '#888' }))
    .sort((a, b) => b.value - a.value);
}
