import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './LandingPage';
import { QRCodeSVG as QRCode } from 'qrcode.react';

function App() {
  const [showLanding, setShowLanding] = useState(false);
  const [view, setView] = useState('dashboard');
  const [wallet, setWallet] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [amount, setAmount] = useState('');
  const [trades, setTrades] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [liveRates, setLiveRates] = useState([]);
  const [recentJoins, setRecentJoins] = useState([]);
  const [currentJoinIndex, setCurrentJoinIndex] = useState(0);

  const BTC_ADDRESS = 'bc1qjrhku4yrvnrys7jq6532ar5a6m96k2mg8gwxx2';

  // Fetch live crypto prices
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd')
      .then(res => res.json())
      .then(data => {
        setLiveRates([
          { pair: 'BTC/USD', price: data.bitcoin.usd },
          { pair: 'ETH/USD', price: data.ethereum.usd },
          { pair: 'SOL/USD', price: data.solana.usd }
        ]);
      });
  }, []);

  // Simulated join ticker messages
  useEffect(() => {
    setRecentJoins([
      '🚀 James just joined BitTrade!',
      '📈 Alice made 0.02 BTC profit!',
      '💼 Brian just registered!',
      '🏆 Diana reached top 5 on leaderboard!'
    ]);
    const ticker = setInterval(() => {
      setCurrentJoinIndex(i => (i + 1) % 4);
    }, 4000);
    return () => clearInterval(ticker);
  }, []);

  const handleRegister = async () => {
    const res = await fetch('https://bittrade-backend-1bk5.onrender.com/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    alert(data.message || data.error);
  };

  const handleLogin = async () => {
    const res = await fetch('https://bittrade-backend-1bk5.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.wallet !== undefined) {
      setWallet(data.wallet);
      setView('trade');
      fetchTradeHistory();
      fetchLeaderboard();
    } else {
      alert(data.error);
    }
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
      setWallet(prev => prev + data.credited);
    } else {
      alert(data.message || 'No new BTC deposit found.');
    }
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

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, { user: username, message: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="App">
      {showLanding ? (
        <LandingPage onEnter={() => setShowLanding(false)} />
      ) : (
        <>
          <h1>💹 BitTrade Platform</h1>

          {view === 'dashboard' && (
            <>
              <h2>Join 5,000+ users earning crypto daily</h2>

              <div className="rates">
                {liveRates.map((rate, i) => (
                  <div key={i} className="rate-item">
                    <strong>{rate.pair}</strong>: ${rate.price}
                  </div>
                ))}
              </div>

              <div className="ticker">
                <p>{recentJoins[currentJoinIndex]}</p>
              </div>

              <div className="auth">
                <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={handleRegister}>Register</button>
                <button onClick={handleLogin}>Login</button>
              </div>
            </>
          )}

          {view === 'trade' && (
            <>
              <h2>Welcome {username}</h2>
              <p>Wallet Balance: ₿ {wallet.toFixed(4)}</p>

              <div className="deposit-box">
                <h3>💰 Deposit Real BTC</h3>
                <p>Send BTC to the address below:</p>
                <code>{BTC_ADDRESS}</code>
                <QRCode value={BTC_ADDRESS} size={128} />
                <br />
                <button onClick={handleCheckDeposit}>Check for BTC Deposit</button>
              </div>

              <input
                placeholder="Trade amount"
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
              <button onClick={handleTrade}>Execute Trade</button>

              <h3>🧾 Recent Trade History</h3>
              <ul>
                {trades.map((t, i) => (
                  <li key={i}>
                    {new Date(t.timestamp).toLocaleString()} — 
                    {t.result >= 0 ? ' ✅ Profit:' : ' ❌ Loss:'} {t.result.toFixed(4)} BTC
                  </li>
                ))}
              </ul>

              <h3>🏅 Leaderboard</h3>
              <ol>
                {leaderboard.map((u, i) => (
                  <li key={i}>
                    {u.username} - {u.wallet.toFixed(4)} BTC
                  </li>
                ))}
              </ol>

              <h3>💬 Chat</h3>
              <div className="chat-box">
                {chatMessages.map((msg, i) => (
                  <div key={i}><strong>{msg.user}:</strong> {msg.message}</div>
                ))}
                <input
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="Type a message"
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;



