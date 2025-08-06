import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const loginRes = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const loginData = await loginRes.json();
      if (loginData.success) {
        localStorage.setItem('diceToken', 'true');
        localStorage.setItem("userId", loginData.userId);
        localStorage.setItem("name", loginData.name);
        navigate('/dice-roller');
      } else {
        setError(loginData.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '80px auto', padding: '32px', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Dice Terminal</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ display: 'block', width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ display: 'block', width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px' }} />
        </div>
        {error && (
          <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#ffe8e8', borderColor: '#e53e3e', color: '#e53e3e', borderRadius: '4px' }}>
            {error}
          </div>
        )}
        <button type="submit" disabled={loading} style={{ backgroundColor: '#319795', color: 'white', width: '100%', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div style={{ display: 'flex', marginTop: '24px', alignItems: 'center', justifyContent: 'center' }}>
        <a href="/register" style={{ color: '#319795', fontWeight: 'bold', textDecoration: 'none' }}>
          Don't have an account? Register
        </a>
      </div>
    </div>
  );
}

export default login;