import React, { useState, useEffect } from 'react';

function LandingPage({ onEnter }) {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { value: '₿124.7', label: '24h Volume', icon: '📊' },
    { value: '8,247', label: 'Active Users', icon: '👥' },
    { value: '96.8%', label: 'Success Rate', icon: '🎯' },
    { value: '24/7', label: 'Live Support', icon: '⚡' }
  ];

  const testimonials = [
    { name: 'Sarah M.', profit: '+0.24 BTC', text: 'Made my first Bitcoin in just 2 weeks!' },
    { name: 'Mike K.', profit: '+0.89 BTC', text: 'The algorithms are incredibly accurate.' },
    { name: 'Elena R.', profit: '+1.2 BTC', text: 'Best trading platform I\'ve ever used.' }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
    color: 'white',
    overflow: 'hidden',
    position: 'relative',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  };

  const backgroundPattern = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)
    `,
    animation: 'float 20s ease-in-out infinite'
  };

  const heroStyle = {
    position: 'relative',
    zIndex: 2,
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center'
  };

  const titleStyle = {
    fontSize: 'clamp(3rem, 8vw, 6rem)',
    fontWeight: '900',
    marginBottom: '20px',
    background: 'linear-gradient(135deg, #ff6b35, #f7931e, #ffbe0b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 0 30px rgba(255, 107, 53, 0.3)',
    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
    opacity: isVisible ? 1 : 0,
    transition: 'all 1s ease-out'
  };

  const subtitleStyle = {
    fontSize: 'clamp(1.2rem, 3vw, 2rem)',
    fontWeight: '300',
    marginBottom: '30px',
    opacity: '0.9',
    maxWidth: '600px',
    lineHeight: '1.4',
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    opacity: isVisible ? 0.9 : 0,
    transition: 'all 1s ease-out 0.3s'
  };

  const ctaButtonStyle = {
    padding: '20px 50px',
    fontSize: '1.4rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    boxShadow: '0 15px 35px rgba(255, 107, 53, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    marginBottom: '50px',
    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
    opacity: isVisible ? 1 : 0,
    transitionDelay: '0.6s'
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '30px',
    maxWidth: '1000px',
    width: '100%',
    marginBottom: '60px',
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    opacity: isVisible ? 1 : 0,
    transition: 'all 1s ease-out 0.9s'
  };

  const statCardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '30px 20px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const testimonialStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    padding: '25px',
    margin: '10px',
    maxWidth: '300px',
    textAlign: 'center',
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    opacity: isVisible ? 1 : 0,
    transition: 'all 1s ease-out 1.2s'
  };

  const pulseKeyframes = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-10px) rotate(1deg); }
      66% { transform: translateY(-5px) rotate(-1deg); }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 15px 35px rgba(255, 107, 53, 0.4); }
      50% { box-shadow: 0 20px 45px rgba(255, 107, 53, 0.6); }
    }
  `;

  return (
    <>
      <style>{pulseKeyframes}</style>
      <div style={containerStyle}>
        <div style={backgroundPattern}></div>
        
        <div style={heroStyle}>
          {/* Main Hero Section */}
          <div style={{ marginBottom: '80px' }}>
            <h1 style={titleStyle}>
              BitTrade
            </h1>
            <p style={subtitleStyle}>
              The most advanced Bitcoin trading platform. Join 8,000+ traders earning passive income with AI-powered strategies.
            </p>
            
            <button 
              onClick={onEnter}
              style={ctaButtonStyle}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 20px 45px rgba(255, 107, 53, 0.6), 0 10px 25px rgba(0, 0, 0, 0.2)';
                e.target.style.background = 'linear-gradient(135deg, #e55a2b, #d17b1a)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 15px 35px rgba(255, 107, 53, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)';
                e.target.style.background = 'linear-gradient(135deg, #ff6b35, #f7931e)';
              }}
            >
              🚀 Start Trading Now
            </button>
          </div>

          {/* Live Stats */}
          <div style={statsContainerStyle}>
            {stats.map((stat, index) => (
              <div 
                key={index}
                style={{
                  ...statCardStyle,
                  transform: currentStat === index ? 'scale(1.05)' : 'scale(1)',
                  background: currentStat === index 
                    ? 'rgba(255, 107, 53, 0.1)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  borderColor: currentStat === index 
                    ? 'rgba(255, 107, 53, 0.3)' 
                    : 'rgba(255, 255, 255, 0.1)'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{stat.icon}</div>
                <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '5px', color: '#ff6b35' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: '0.8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div style={{ marginBottom: '50px' }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '30px', 
              opacity: '0.9',
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 0.9 : 0,
              transition: 'all 1s ease-out 1s'
            }}>
              Recent Success Stories
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} style={testimonialStyle}>
                  <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#4ade80', marginBottom: '8px' }}>
                    {testimonial.profit}
                  </div>
                  <div style={{ fontSize: '0.9rem', marginBottom: '10px', opacity: '0.9' }}>
                    "{testimonial.text}"
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: '0.6' }}>
                    - {testimonial.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '30px', 
            flexWrap: 'wrap',
            justifyContent: 'center',
            opacity: '0.7',
            fontSize: '0.9rem',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 0.7 : 0,
            transition: 'all 1s ease-out 1.5s'
          }}>
            <span>🔒 Bank-Level Security</span>
            <span>⚡ Instant Deposits</span>
            <span>📱 Mobile Optimized</span>
            <span>🌍 Global Access</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;

