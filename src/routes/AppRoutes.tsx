import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login'; 
import Signup from '../pages/Signup';
import Products from '../pages/Products';
import DetailPage from '../pages/DetailPage';
import CheckoutPage from '../pages/CheckoutPage';
import NotFound from '../pages/NotFound';
import PrivateRoute from '../pages/PrivateRoute';



const AppRoutes: React.FC = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Products />} />  {/* Home page shows products */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected Routes for authenticated users */}
      <Route element={<PrivateRoute />}>
        <Route path="/checkout" element={<CheckoutPage />} /> {/* Checkout page */}
      </Route>
      
      <Route path="/products/:id" element={<DetailPage />} /> {/* Product detail page */}
      
      {/* Fallback Route for non-existent paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    
    </>
  );
};

export default AppRoutes;
