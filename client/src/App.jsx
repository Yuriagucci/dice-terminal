import LoginForm from './components/login.jsx';
import RegisterForm from './components/register.jsx';
import ProtectedRoute from './components/routes/protectedroute.jsx';
import DiceRoller from './components/roller.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dice-roller" element={
          <ProtectedRoute>
            <DiceRoller />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;