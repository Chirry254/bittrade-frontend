import React from 'react';
import './LandingPage.css';

function LandingPage({ onEnter }) {
  return (
    <div className="landing-container">
      <div className="landing-card">
        <img
          src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
          alt="BitTrade Logo"
          className="landing-logo"
        />
        <h1>Welcome to BitTrade 🚀</h1>
        <p className="tagline">Trade smarter. Earn faster. Join a global crypto movement.</p>

        <ul className="features">
          <li>📈 Real-time BTC, ETH, SOL market rates</li>
          <li>💬 Community chat and live activity ticker</li>
          <li>🏆 Compete on the leaderboard and grow your wallet</li>
          <li>✅ 100% free demo — no signup cost</li>
        </ul>

        <button onClick={onEnter}>Enter Platform</button>
      </div>
    </div>
  );
}

export default LandingPage;

