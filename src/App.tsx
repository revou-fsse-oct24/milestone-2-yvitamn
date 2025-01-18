//import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // Import your routes

import { AuthenticateProvider } from "./contexts/AuthenticateProvider"; // Import authentication provider

import { CartProvider } from "./contexts/CartProvider";

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
  return (
    
    <AuthenticateProvider>
      <CartProvider>
      
      <Router>
       
        <AppRoutes />
     
      </Router>
   
      </CartProvider>
    </AuthenticateProvider>
    
  );
};

// Add a new component to use the auth hook
// const AppRoutes: React.FC = () => {
//   const { isAuthenticated } = useAuth();
//   return (
//     <div>
//       <Navbar />
//       <Header />
//       {!isAuthenticated ? <Login /> : null}
//       <AppRoutes />
//     </div>
//   );
// };

export default App;
