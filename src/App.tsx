import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'; // Import your routes
import Navbar from './components/home/Navbar';   
import Header from './components/home/Header'; 
import { AuthenticateProvider } from './contexts/AuthenticateProvider';  // Import authentication provider
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <AuthenticateProvider> {/* Provide authentication state to the entire app */}
      <Login />
      <Router> {/* Router component to handle navigation */}
        {/* Render the Navbar and Header component on top of every page */}
        <Header />
        <Navbar />

        {/* Routes will handle the page navigation */}
        <AppRoutes />
      </Router>
    </AuthenticateProvider>
  );
};

export default App;
