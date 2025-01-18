import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login'; 
import Signup from '../pages/Signup';
import Products from '../pages/Products';
import DetailPage from '../pages/DetailPage';
import NotFound from '../pages/NotFound';
import PrivateRoute from '../pages/PrivateRoute';
import Navbar from "../layout/Navbar";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useAuth } from "../hooks/useAuth";
import  CartModal  from '../components/CartModal';


const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  
  const handleOpenCartModal = () => {
    setIsCartModalOpen(true);
    setTimeout(() => {
      setIsCartModalOpen(false);
    }, 10000);
  };

  const handleCloseCartModal = () => {
    setIsCartModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <Header />
      <Footer />

      {/* Conditional Rendering Based on Auth Status */}
      {!isAuthenticated ? (
        <Login />
      ) : (
        <>
          <Routes>
            {/* Products and Cart Modal open functionality */}
            <Route path="/" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<DetailPage onAddToCart={handleOpenCartModal} />} />

            {/* Protected Route for Checkout */}
            <Route element={<PrivateRoute />}>
              <Route path="/checkout" element={<CartModal 
              isOpen={isCartModalOpen} 
              onClose={handleCloseCartModal}
              onAddToCart={handleOpenCartModal} 
              />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Conditionally display Cart Modal */}
          <CartModal 
          isOpen={isCartModalOpen} 
          onClose={handleCloseCartModal} 
          onAddToCart={handleOpenCartModal}
          />
        </>
      )}
    </div>
  );
};


export default AppRoutes;
