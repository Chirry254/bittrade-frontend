import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [view, setView] = useState('dashboard');
  const [wallet, setWallet] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [amount, setAmount] = useState('');
  const [trades, setTrades] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const backend = 'https://bittrade-backend-1bk5.onrender.com';

  const handleRegister = async () => {
    const res = await fetch(`${backend}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    alert(data.message || data.error);
  };

  const handleLogin = async () => {
    const res = await fetch(`${backend}/api/login`, {
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
      fetchMessages();
    } else {
      alert(data.error);
    }
  };

  const handleTrade = async () => {
    const res = await fetch(`${backend}/api/trade`, {
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

  const fetchTradeHistory = async () => {
    const res = await fetch(`${backend}/api/trades/${username}`);
    const data = await res.json();
    if (Array.isArray(data)) setTrades(data);
  };

  const fetchLeaderboard = async () => {
    const res = await fetch(`${backend}/api/leaderboard`);
    const data = await res.json();
    if (Array.isArray(data)) setLeaderboard(data);
  };

  const fetchMessages = async () => {
    const res = await fetch(`${backend}/api/messages`);
    const data = await res.json();
    if (Array.isArray(data)) setMessages(data);
  };

  const handlePostMessage = async () => {
    if (!newMessage.trim()) return;
    const res = await fetch(`${backend}/api/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: username, content: newMessage }),
    });
    const data = await res.json();
    if (data.message) {
      setNewMessage('');
      fetchMessages();
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="App">
      <h1>💹 BitTrade Platform</h1>

      {view === 'dashboard' && (
        <div>
          <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}

      {view === 'trade' && (
        <div>
          <h2>Welcome {username}</h2>
          <p>Wallet Balance: ₿ {wallet.toFixed(4)}</p>
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
                {t.result >= 0 ? '✅ Profit:' : '❌ Loss:'} {t.result.toFixed(4)} BTC
              </li>
            ))}
          </ul>

          <h3>🏆 Leaderboard</h3>
          <table className="leaderboard">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Wallet (₿)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.wallet.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>💬 Live Chat</h3>
          <div className="chat-box">
            {messages.map((m, i) => (
              <div key={i}><strong>{m.user}:</strong> {m.content}</div>
            ))}
          </div>
          <input
            placeholder="Type a message"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
          />
          <button onClick={handlePostMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default App;

