import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem('diceToken');
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
