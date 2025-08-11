// Import the useState hook from React to manage state
import { useState } from 'react';

// Import the Link component from react-router-dom and rename it to RouterLink
import { Link as RouterLink } from 'react-router-dom'; 

// Import global CSS styles
import '../globals.css';

// Import the useNavigate hook for redirecting the user after login
import { useNavigate } from 'react-router-dom';

// Define the login component
function login() {
  // Declare state variables to store email, password, error message, and loading status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get the navigate function to programmatically go to another page
  const navigate = useNavigate();

  // Function that runs when the form is submitted
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing
    setError('');       // Clear any existing error messages
    setLoading(true);   // Show loading state

    try {
      // Send POST request to the backend login API
      const loginRes = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }) // Send email and password as JSON
      });

      // Parse the response JSON
      const loginData = await loginRes.json();

      // If login was successful
      if (loginData.success) {
        // Save user session info in localStorage
        localStorage.setItem('diceToken', 'true');
        localStorage.setItem("userId", loginData.userId);
        localStorage.setItem("name", loginData.name);

        // Redirect the user to the dice roller page
        navigate('/dice-roller');
      } else {
        // If login failed, show an error message
        setError(loginData.message || 'Login failed');
      }

    } catch (err) {
      // If request fails (e.g. server is down), show a different error
      setError('Server error. Please try again later.');
    } finally {
      // Hide loading state regardless of success or failure
      setLoading(false);
    }
  };

  // Render the UI
  return (
    <div className="max-w-md mx-auto mt-20 p-8 border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Dice Terminal</h2>

      {/* Login Form */}
      <form onSubmit={handleLogin}>
        {/* Email Input */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} // Update email state on input
            required 
            className="block w-full p-2 border border-gray-200 rounded-md box-border" 
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} // Update password state on input
            required 
            className="block w-full p-2 border border-gray-200 rounded-md box-border" 
          />
        </div>

        {/* Error message (if any) */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-500 text-red-500 rounded-md">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading} // Disable the button while loading
          className="bg-teal-500 hover:bg-teal-600 text-white w-full p-3 rounded-md font-bold cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {/* Change button text depending on loading state */}
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Link to register page */}
      <div className="mt-6 flex items-center justify-center">
        <a href="/register" className="text-teal-500 font-bold hover:underline">
          Don't have an account? Register
        </a>
      </div>
    </div>
  );
}

// Export the component so it can be used in other files
export default login;
