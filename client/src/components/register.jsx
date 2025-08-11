// Import useState hook for managing local component state
import { useState } from 'react';

// Import useNavigate hook to navigate to another page after registration
import { useNavigate } from 'react-router-dom';

// Import Link from react-router-dom and rename it to RouterLink (though not used here)
import { Link as RouterLink } from 'react-router-dom';

// This is the Register component
function Register() {
  // Set up state variables to store input values and UI feedback
  const [name, setName] = useState('');           // User's name
  const [email, setEmail] = useState('');         // User's email
  const [password, setPassword] = useState('');   // User's password
  const [error, setError] = useState('');         // Error message if registration fails
  const [success, setSuccess] = useState('');     // Success message if registration succeeds
  const [loading, setLoading] = useState(false);  // Whether the form is submitting

  // Gives us access to navigation after successful registration
  const navigate = useNavigate();

  // This function runs when the form is submitted
  const handleRegister = async (e) => {
    e.preventDefault();       // Prevent the page from refreshing
    setError('');             // Clear any previous errors
    setSuccess('');           // Clear any previous success message
    setLoading(true);         // Show loading state

    try {
      // Send a POST request to the registration endpoint with user data
      const res = await fetch('/api/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Tell server we’re sending JSON
        body: JSON.stringify({ name, email, password })  // Send the user's name, email, and password
      });

      // Convert the response to usable JSON
      const registerData = await res.json();

      // If registration was successful
      if (registerData.success) {
        setSuccess('Registration successful!'); // Show success message

        // Clear the form fields
        setName('');
        setEmail('');
        setPassword('');

        // Wait 1.5 seconds and then navigate to login page
        setTimeout(() => navigate('/'), 1500);
      } else {
        // If registration failed, show the error message
        setError(registerData.message || 'Registration failed.');
      }

    } catch (err) {
      // If something went wrong with the request (like server down)
      setError('Server error. Please try again later.');
    } finally {
      // End the loading state
      setLoading(false);
    }
  };

  // This is the part that shows the UI to the user
  return (
    <div
      style={{
        maxWidth: '480px',
        margin: '80px auto',
        padding: '32px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Page title */}
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Register</h2>

      {/* Registration form */}
      <form onSubmit={handleRegister}>
        {/* Name input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)} // Update name state
            required
            style={{
              display: 'block',
              width: '100%',
              padding: '8px',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Email input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)} // Update email state
            required
            style={{
              display: 'block',
              width: '100%',
              padding: '8px',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Password input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)} // Update password state
            required
            style={{
              display: 'block',
              width: '100%',
              padding: '8px',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Show error message if there is one */}
        {error && (
          <div
            style={{
              marginBottom: '16px',
              padding: '12px',
              backgroundColor: '#ffe8e8',
              borderColor: '#e53e3e',
              color: '#e53e3e',
              borderRadius: '4px',
            }}
          >
            {error}
          </div>
        )}

        {/* Show success message if there is one */}
        {success && (
          <div
            style={{
              marginBottom: '16px',
              padding: '12px',
              backgroundColor: '#e8fff0',
              borderColor: '#38a169',
              color: '#38a169',
              borderRadius: '4px',
            }}
          >
            {success}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading} // Disable the button while registering
          style={{
            backgroundColor: '#319795',
            color: 'white',
            width: '100%',
            padding: '12px',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {/* Change button text while loading */}
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {/* Link back to login page */}
      <div
        style={{
          display: 'flex',
          marginTop: '24px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <a
          href="/"
          style={{
            color: '#319795',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          Sign in
        </a>
      </div>
    </div>
  );
}

// Export this component so other files can use it
export default Register;
