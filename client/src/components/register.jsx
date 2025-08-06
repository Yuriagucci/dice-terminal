import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('/api/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const registerData = await res.json();
      if (registerData.success) {
        setSuccess('Registration successful!');
        setName('');
        setEmail('');
        setPassword('');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setError(registerData.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '80px auto', padding: '32px', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Register</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
            style={{ display: 'block', width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            style={{ display: 'block', width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            style={{ display: 'block', width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </div>
        {error && (
          <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#ffe8e8', borderColor: '#e53e3e', color: '#e53e3e', borderRadius: '4px' }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#e8fff0', borderColor: '#38a169', color: '#38a169', borderRadius: '4px' }}>
            {success}
          </div>
        )}
        <button 
          type="submit" 
          disabled={loading} 
          style={{ backgroundColor: '#319795', color: 'white', width: '100%', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      
      <div style={{ display: 'flex', marginTop: '24px', alignItems: 'center', justifyContent: 'center' }}>
        <a href="/" style={{ color: '#319795', fontWeight: 'bold', textDecoration: 'none' }}>
          Sign in
        </a>
      </div>
    </div>
  );
}

export default Register;