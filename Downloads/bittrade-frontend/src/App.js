import React, { useState } from 'react';
import './App.css';

function App() {
  const [view, setView] = useState('dashboard');
  const [wallet, setWallet] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [amount, setAmount] = useState('');

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
    }
    alert(data.message || data.error);
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
        </div>
      )}
    </div>
  );
}

export default App;

