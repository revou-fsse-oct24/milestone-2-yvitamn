import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'; // Import your routes
import Navbar from './components/home/Navbar';   
import Header from './components/home/Header'; 
import { AuthenticateProvider } from './contexts/AuthenticateProvider';  // Import authentication provider
import Login from './pages/Login';
import { useAuth } from './hooks/useAuth';  



// const App: React.FC = () => {
//   return (
//     <AuthenticateProvider> {/* Provide authentication state to the entire app */}
//       <Router> {/* Wrap with Router to handle navigation */}
//         <div>
//           <Navbar />
//           <Header />
//           <AppRoutes /> {/* The Routes component is now inside AppRoutes */}
//         </div>
//       </Router>
//     </AuthenticateProvider>
//   );
// };




const App: React.FC = () => {
  const { isAuthenticated } = useAuth(); 
  return (
    <>
      <AuthenticateProvider> {/* Provide authentication state to the entire app */}
      <Router> {/* Wrap with Router to handle navigation */}
        <div>
          <Navbar />
          <Header />
          {/* Optionally render Login page if user is not authenticated */}
        {!isAuthenticated ? <Login /> : null}
          <AppRoutes /> {/* The Routes component is now inside AppRoutes */}
        </div>
      </Router>
      </AuthenticateProvider>
    </>
  );
};

export default App;
