import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './LandingPage';
import { QRCodeSVG as QRCode } from 'qrcode.react';

function App() {
  const [showLanding, setShowLanding] = useState(true);
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
  const [selectedDepositMethod, setSelectedDepositMethod] = useState('bitcoin');
  const [showDepositModal, setShowDepositModal] = useState(false);

  // Deposit options with worldwide coverage
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
    ethereum: {
      name: 'Ethereum (ETH)',
      icon: 'Ξ',
      address: '0x064326d2abD8f90f96270F25CeE6046BeD4e1e05',
      description: 'Send Ethereum to our ERC-20 wallet',
      fees: 'Variable gas fees',
      time: '12-35 confirmations',
      regions: 'Worldwide'
    },
    usdt: {
      name: 'Tether (USDT)',
      icon: '₮',
      address: 'TEVcXEQaAaA6bPHfVbvnHhSbVR6aK1Pp9X',
      description: 'USDT TRC-20 network (Tron)',
      fees: '1 USDT',
      time: '1-3 minutes',
      regions: 'Worldwide'
    },
    paypal: {
      name: 'PayPal',
      icon: '💳',
      address: 'payments@bittrade.com',
      description: 'Send via PayPal Friends & Family',
      fees: 'Free for F&F',
      time: 'Instant',
      regions: 'US, EU, UK, CA, AU'
    },
    cashapp: {
      name: 'Cash App',
      icon: '💚',
      address: '$BitTradeApp',
      description: 'Send to our Cash App',
      fees: 'Free',
      time: 'Instant',
      regions: 'US, UK'
    },
    venmo: {
      name: 'Venmo',
      icon: '💙',
      address: '@BitTrade-Official',
      description: 'Venmo payment',
      fees: 'Free',
      time: 'Instant',
      regions: 'US only'
    },
    zelle: {
      name: 'Zelle',
      icon: '💜',
      address: 'deposits@bittrade.com',
      description: 'Bank-to-bank transfer',
      fees: 'Free',
      time: 'Minutes',
      regions: 'US only'
    },
    wise: {
      name: 'Wise (TransferWise)',
      icon: '🌍',
      address: 'Account: 1234567890',
      description: 'International bank transfer',
      fees: '0.5-2%',
      time: '1-2 business days',
      regions: 'Worldwide'
    },
    revolut: {
      name: 'Revolut',
      icon: '🏦',
      address: '@bittrade',
      description: 'Revolut instant transfer',
      fees: 'Free',
      time: 'Instant',
      regions: 'EU, UK, US'
    },
    mpesa: {
      name: 'M-Pesa',
      icon: '📱',
      address: 'Paybill: 123456',
      description: 'Mobile money transfer',
      fees: 'Standard M-Pesa rates',
      time: 'Instant',
      regions: 'Kenya, Tanzania, others'
    },
    westernunion: {
      name: 'Western Union',
      icon: '🌐',
      address: 'Receiver: BitTrade Ltd',
      description: 'Global money transfer',
      fees: 'WU standard fees',
      time: 'Minutes to days',
      regions: 'Worldwide'
    },
    moneygram: {
      name: 'MoneyGram',
      icon: '📮',
      address: 'Receiver: BitTrade Services',
      description: 'International money transfer',
      fees: 'MG standard fees',
      time: '10 minutes - 5 days',
      regions: 'Worldwide'
    }
  };

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
      alert(data.message || 'No new deposit found.');
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

  const DepositModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '30px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, color: '#333' }}>
            {depositOptions[selectedDepositMethod].icon} {depositOptions[selectedDepositMethod].name}
          </h3>
          <button 
            onClick={() => setShowDepositModal(false)}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          {(selectedDepositMethod === 'bitcoin' || selectedDepositMethod === 'ethereum' || selectedDepositMethod === 'usdt') && (
            <QRCode value={depositOptions[selectedDepositMethod].address} size={200} />
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <strong>Address/Details:</strong>
          <div style={{ 
            background: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '5px', 
            fontFamily: 'monospace',
            wordBreak: 'break-all',
            marginTop: '5px'
          }}>
            {depositOptions[selectedDepositMethod].address}
          </div>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <strong>Description:</strong> {depositOptions[selectedDepositMethod].description}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Fees:</strong> {depositOptions[selectedDepositMethod].fees}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Processing Time:</strong> {depositOptions[selectedDepositMethod].time}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <strong>Available in:</strong> {depositOptions[selectedDepositMethod].regions}
        </div>

        <div style={{ 
          background: '#e8f4fd', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          color: '#1976d2'
        }}>
          <strong>⚠️ Important:</strong> After sending payment, use the "Check for Deposit" button in your dashboard to verify the transaction.
        </div>

        <button 
          onClick={() => setShowDepositModal(false)}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Got it, I'll send the payment
        </button>
      </div>
    </div>
  );

  return (
    <div className="App">
      {showDepositModal && <DepositModal />}
      
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

              <div className="deposit-box" style={{ marginBottom: '30px' }}>
                <h3>💰 Choose Your Deposit Method</h3>
                <p>Select from worldwide payment options:</p>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '15px', 
                  marginBottom: '20px' 
                }}>
                  {Object.entries(depositOptions).map(([key, option]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedDepositMethod(key);
                        setShowDepositModal(true);
                      }}
                      style={{
                        padding: '15px',
                        border: '2px solid #ddd',
                        borderRadius: '10px',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.borderColor = '#4CAF50';
                        e.target.style.backgroundColor = '#f8fff8';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.borderColor = '#ddd';
                        e.target.style.backgroundColor = 'white';
                      }}
                    >
                      <div style={{ fontSize: '24px', marginBottom: '8px' }}>{option.icon}</div>
                      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{option.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{option.regions}</div>
                    </button>
                  ))}
                </div>

                <button 
                  onClick={handleCheckDeposit}
                  style={{
                    padding: '12px 30px',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  ✅ Check for Deposit
                </button>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <h3>⚡ Quick Trade</h3>
                <input
                  placeholder="Trade amount (BTC)"
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
                <button 
                  onClick={handleTrade}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#FF6B35',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Execute Trade
                </button>
              </div>

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


