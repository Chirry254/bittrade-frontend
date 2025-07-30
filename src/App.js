import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './LandingPage';
import { QRCodeSVG as QRCode } from 'qrcode.react';

const depositOptions = {
  bitcoin: {
    name: 'Bitcoin (BTC)',
    icon: '₿',
    address: 'bc1qjrhku4yrvnrys7jq6532ar5a6m96k2mg8gwxx2',
    description: 'Send Bitcoin directly to our wallet',
    fees: '0.0001 BTC network fee',
    time: '1-6 confirmations',
    regions: 'Worldwide'
  },
  paypal: {
    name: 'PayPal',
    icon: '💳',
    address: 'https://www.paypal.com/paypalme/kipchirry84',
    description: 'Click to open PayPal and send payment',
    fees: 'Free for F&F',
    time: 'Instant',
    regions: 'US, EU, UK, CA, AU'
  }
};

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [view, setView] = useState('dashboard');
  const [wallet, setWallet] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [amount, setAmount] = useState('');
  const [trades, setTrades] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [liveRates, setLiveRates] = useState([]);
  const [selectedDepositMethod, setSelectedDepositMethod] = useState('bitcoin');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      .then(res => res.json())
      .then(data => {
        setLiveRates([{ pair: 'BTC/USD', price: data.bitcoin.usd }]);
      });
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('bittradeUser');
    const savedWallet = localStorage.getItem('bittradeWallet');
    const sessionExpiry = localStorage.getItem('bittradeSessionExpiry');
    if (savedUser && savedWallet && sessionExpiry && Date.now() < parseInt(sessionExpiry)) {
      setUsername(savedUser);
      setWallet(parseFloat(savedWallet));
      setView('trade');
      fetchTradeHistory(savedUser);
      fetchLeaderboard();
    } else {
      handleLogout();
    }
  }, []);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://bittrade-backend-1bk5.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      alert(data.message || data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://bittrade-backend-1bk5.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.wallet !== undefined) {
        setWallet(data.wallet);
        setView('trade');
        localStorage.setItem('bittradeUser', username);
        localStorage.setItem('bittradeWallet', data.wallet);
        localStorage.setItem('bittradeSessionExpiry', (Date.now() + 3600000).toString()); // 1 hour
        fetchTradeHistory();
        fetchLeaderboard();
      } else {
        alert(data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bittradeUser');
    localStorage.removeItem('bittradeWallet');
    localStorage.removeItem('bittradeSessionExpiry');
    setUsername('');
    setPassword('');
    setWallet(0);
    setView('dashboard');
  };

  const fetchTradeHistory = async () => {
    const res = await fetch(`https://bittrade-backend-1bk5.onrender.com/api/trades/${username}`);
    const data = await res.json();
    if (Array.isArray(data)) setTrades(data);
  };

  const fetchLeaderboard = async () => {
    const res = await fetch('https://bittrade-backend-1bk5.onrender.com/api/leaderboard');
    const data = await res.json();
    if (Array.isArray(data)) setLeaderboard(data);
  };

  const handleTrade = async () => {
    const res = await fetch('https://bittrade-backend-1bk5.onrender.com/api/trade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, amount: parseFloat(amount) }),
    });
    const data = await res.json();
    if (data.wallet !== undefined) {
      setWallet(data.wallet);
      localStorage.setItem('bittradeWallet', data.wallet);
      fetchTradeHistory();
      fetchLeaderboard();
    }
    alert(data.message || data.error);
  };

  const handleCheckDeposit = async () => {
    const res = await fetch(`https://bittrade-backend-1bk5.onrender.com/api/check-deposit/${username}`);
    const data = await res.json();
    if (data.success) {
      alert(`✅ Deposit found: ${data.credited} BTC`);
      const newWallet = wallet + data.credited;
      setWallet(newWallet);
      localStorage.setItem('bittradeWallet', newWallet);
    } else {
      alert(data.message || 'No new deposit found.');
    }
  };

  const DepositModal = () => (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{depositOptions[selectedDepositMethod].icon} {depositOptions[selectedDepositMethod].name}</h3>
          <button onClick={() => setShowDepositModal(false)}>×</button>
        </div>
        <div className="modal-body">
          {selectedDepositMethod === 'paypal' ? (
            <a href={depositOptions[selectedDepositMethod].address} target="_blank" rel="noopener noreferrer">
              <button>Pay with PayPal</button>
            </a>
          ) : (
            <>
              <QRCode value={depositOptions[selectedDepositMethod].address} size={200} />
              <p><strong>Address:</strong> {depositOptions[selectedDepositMethod].address}</p>
            </>
          )}
          <p><strong>Description:</strong> {depositOptions[selectedDepositMethod].description}</p>
          <p><strong>Fees:</strong> {depositOptions[selectedDepositMethod].fees}</p>
          <p><strong>Processing Time:</strong> {depositOptions[selectedDepositMethod].time}</p>
          <p><strong>Regions:</strong> {depositOptions[selectedDepositMethod].regions}</p>
          <button onClick={() => setShowDepositModal(false)}>Got it, I'll send the payment</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App">
      {showDepositModal && <DepositModal />}
      {showLanding ? (
        <LandingPage onEnter={() => setShowLanding(false)} />
      ) : (
        <div>
          <h1>BitTrade Platform</h1>

          {view === 'dashboard' && (
            <div className="auth-box">
              <h2>Login or Register</h2>
              <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
              <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <button onClick={handleRegister} disabled={loading}>Register</button>
              <button onClick={handleLogin} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
              {loading && <div className="spinner"></div>}
            </div>
          )}

          {view === 'trade' && (
            <div>
              <h2>Welcome {username}</h2>
              <p>Wallet Balance: ₿ {wallet.toFixed(4)}</p>
              <button onClick={handleLogout}>Logout</button>

              <div className="deposit-section">
                <h3>Deposit Options</h3>
                {Object.entries(depositOptions).map(([key, option]) => (
                  <button key={key} onClick={() => { setSelectedDepositMethod(key); setShowDepositModal(true); }}>
                    {option.icon} {option.name}
                  </button>
                ))}
                <button onClick={handleCheckDeposit}>Check for Deposit</button>
              </div>

              <div className="trade-section">
                <h3>Trade</h3>
                <input
                  placeholder="Trade amount (BTC)"
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
                <button onClick={handleTrade}>Execute Trade</button>
              </div>

              <div>
                <h3>Trade History</h3>
                <ul>
                  {trades.map((t, i) => (
                    <li key={i}>{new Date(t.timestamp).toLocaleString()} - {t.result >= 0 ? 'Profit' : 'Loss'}: {t.result.toFixed(4)} BTC</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3>Leaderboard</h3>
                <ol>
                  {leaderboard.map((u, i) => (
                    <li key={i}>{u.username} - {u.wallet.toFixed(4)} BTC</li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;




