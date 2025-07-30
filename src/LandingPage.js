import React from 'react';

function LandingPage({ onEnter }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '600px' }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          🚀 BitTrade
        </h1>
        
        <h2 style={{ 
          fontSize: '1.8rem', 
          marginBottom: '30px',
          fontWeight: '300'
        }}>
          Your Gateway to Crypto Trading
        </h2>
        
        <p style={{ 
          fontSize: '1.2rem', 
          marginBottom: '40px',
          lineHeight: '1.6',
          opacity: '0.9'
        }}>
          Join thousands of users earning Bitcoin daily through smart trading strategies. 
          Start with as little as 0.001 BTC and watch your portfolio grow.
        </p>
        
        <div style={{ marginBottom: '40px' }}>
          <div style={{ 
            display: 'inline-block', 
            margin: '10px 20px',
            padding: '15px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '10px'
          }}>
            <h3 style={{ margin: '0 0 5px 0' }}>5,000+</h3>
            <p style={{ margin: '0', opacity: '0.8' }}>Active Traders</p>
          </div>
          
          <div style={{ 
            display: 'inline-block', 
            margin: '10px 20px',
            padding: '15px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '10px'
          }}>
            <h3 style={{ margin: '0 0 5px 0' }}>₿12.5</h3>
            <p style={{ margin: '0', opacity: '0.8' }}>Daily Volume</p>
          </div>
          
          <div style={{ 
            display: 'inline-block', 
            margin: '10px 20px',
            padding: '15px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '10px'
          }}>
            <h3 style={{ margin: '0 0 5px 0' }}>24/7</h3>
            <p style={{ margin: '0', opacity: '0.8' }}>Live Trading</p>
          </div>
        </div>
        
        <button 
          onClick={onEnter}
          style={{
            padding: '18px 40px',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            backgroundColor: '#ff6b35',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#e55a2b';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 12px 35px rgba(255, 107, 53, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#ff6b35';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.3)';
          }}
        >
          Enter Platform
        </button>
        
        <p style={{ 
          marginTop: '30px', 
          fontSize: '0.9rem', 
          opacity: '0.7'
        }}>
          ⚡ Lightning fast trades • 🔒 Secure wallet • 📈 Real-time analytics
        </p>
      </div>
    </div>
  );
}

export default LandingPage;


