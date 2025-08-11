import { useState } from 'react'; // Import the useState hook from React to manage state
import '../globals.css'; // Import global CSS styles
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for redirecting the user after login
import { Link as RouterLink } from 'react-router-dom';  // Import the Link component from react-router-dom and rename it to RouterLink

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Card */}
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow border border-gray-200">
        
        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-5 text-gray-800">
          Dice Terminal
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-3">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:outline-none text-sm"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-2 text-xs bg-red-50 border border-red-400 text-red-600 rounded">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md text-sm transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register link */}
        <p className="mt-4 text-center text-xs text-gray-600">
          No account?{" "}
          <a href="/register" className="text-teal-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );

}

// Export the component so it can be used in other files
export default login;
