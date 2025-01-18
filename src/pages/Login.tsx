

import  { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth'; // Import the custom hook
//import { useAuth } from '../contexts/AuthenticateProvider';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth(); // Access auth functions
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email, password); // Use login function from context
    } else {
      setError('Please enter both email and password');
    }
  };

  useEffect(() => {
    // Redirect to '/products' page after successful login
    if (isAuthenticated) {
      navigate('/products');
    }
  }, [isAuthenticated, navigate]); // This effect will run when isAuthenticated changes

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>You're logged in!</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please login</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
