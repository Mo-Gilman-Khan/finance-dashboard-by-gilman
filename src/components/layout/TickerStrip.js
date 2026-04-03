import React from 'react';
const TICKERS = [
  { sym: 'NIFTY 50',  val: '22,543.50', chg: '+0.42%', up: true },
  { sym: 'SENSEX',    val: '74,119.90', chg: '+0.38%', up: true },
  { sym: 'BANKNIFTY', val: '48,231.75', chg: '-0.15%', up: false },
  { sym: 'USD/INR',   val: '83.42',     chg: '+0.08%', up: true },
  { sym: 'GOLD',      val: '₹71,240',   chg: '+0.22%', up: true },
  { sym: 'CRUDE OIL', val: '$78.35',    chg: '-0.55%', up: false },
  { sym: 'RELIANCE',  val: '2,940.80',  chg: '+1.10%', up: true },
  { sym: 'INFY',      val: '1,478.50',  chg: '-0.30%', up: false },
  { sym: 'TCS',       val: '3,812.00',  chg: '+0.65%', up: true },
  { sym: 'HDFC BANK', val: '1,631.45',  chg: '-0.18%', up: false },
];

export default function TickerStrip() {
  const items = [...TICKERS, ...TICKERS]; // duplicate for seamless loop
  return (
    <div className="ticker-strip">
      <div className="ticker-inner">
        {items.map((t, i) => (
          <span key={i} className="ticker-item">
            <span style={{ color: 'var(--text-secondary)' }}>{t.sym} </span>
            <span>{t.val} </span>
            <span className={t.up ? 'up' : 'down'}>{t.chg}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
