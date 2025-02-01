//import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // Import your routes

import { AuthenticateProvider } from "./contexts/AuthenticateProvider"; // Import authentication provider

import { CartProvider } from "./contexts/CartProvider";



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



export default App;
