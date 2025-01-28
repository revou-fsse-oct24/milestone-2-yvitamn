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
import WelcomeModal from "../components/WelcomeModal";
import CartModal from '../components/CartModal';
import Checkout from '../pages/Checkout'; // Import CheckoutPage
import { useCart } from '../hooks/useCart'; // Use the correct hook to access cart items

const AppRoutes: React.FC = () => {
  const { addedProducts: cartItems } = useCart(); // Access cart items through the custom hook useCart
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);

  const handleOpenCartModal = () => {
    setIsCartModalOpen(true);
  };

  const handleCloseCartModal = () => {
    setIsCartModalOpen(false);
  };

  return (
   
   <div>
      <Header />
      <Navbar />

      {/* Welcome Modal */}
      {isWelcomeModalOpen && <WelcomeModal onClose={() => setIsWelcomeModalOpen(false)} />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<DetailPage onAddToCart={handleOpenCartModal} />} />

        {/* Protected Route for Checkout */}
        <Route 
          path="/checkout" 
          element={
            <PrivateRoute element={<Checkout />} />
          } 
        />

        {/* Catch-all for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Conditionally display the Cart Modal */}
      {isCartModalOpen && (
        <CartModal
          isOpen={isCartModalOpen}
          onClose={handleCloseCartModal}
          cartItems={cartItems} // Pass cart items to CartModal
          onAddToCart={handleOpenCartModal}
        />
      )}
    </div>

  );
};

export default AppRoutes;
