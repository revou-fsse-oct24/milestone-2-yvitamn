
import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart'; // Custom hook to manage cart
//import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ThankYouModal from '../components/ThankYouModal';
import { GetServerSideProps } from 'next';


const Checkout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { addedProducts } = useCart(); // Get the cart items
  const [paymentMethod, setPaymentMethod] = useState<string>(''); // State for selected payment method
  const [error, setError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false); // Track order success
  const navigate = useNavigate(); // To navigate after checkout

  // Calculate total price
  const calculateTotalPrice = () => {
    return addedProducts.reduce((total, product) => total + product.price * product.quantity, 0);
 
};

  // If the user is not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');  // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleCheckout = async () => {
    try {
      if (!paymentMethod) {
        setError('Please select a payment method.');
        return;
    } else {
        setError(null); 
      }

      const checkoutSuccess = true; // Simulated checkout status

      if (!checkoutSuccess) {
        throw new Error('Checkout failed, please try again later.');
      }

      setOrderSuccess(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong, please try again.');
    }
  };

  const handleContinueShopping = () => {
    navigate('/products'); // Navigate to the products page (or any other page you want)
  };

  const handleCloseModal = () => {
    setOrderSuccess(false); // Hide modal after closing
    navigate('/'); // Redirect to home or any other page
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-6 text-center">Checkout</h2>

      {orderSuccess ? (
        <ThankYouModal onClose={handleCloseModal} />
      ) : (
        <div>
          {addedProducts.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              <h3 className="text-2xl mb-4">Cart Items:</h3>
              <ul className="mb-6">
                {addedProducts.map((product) => (
                  <li key={product.id} className="flex justify-between mb-2">
                    <span>{product.title}</span>
                    <span>${product.price} x {product.quantity}</span>
                  </li>
                ))}
              </ul>
            
              
              <div className="mb-4 font-semibold">
                Total: ${calculateTotalPrice().toFixed(2)}
              </div>

              <div>
                <h3 className="text-xl mb-4">Select Payment Method:</h3>
                <select
                  className="border border-gray-300 p-2 w-full mb-4"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="">Select Payment Method</option>
                  <option value="credit-card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="tf-bank">Transfer Bank</option>
                </select>
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}


              <div className="flex justify-center">
              <button
                onClick={handleCheckout}
                className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 w-full mb-4"
                disabled={!paymentMethod}
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handleContinueShopping}
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 w-full"
              >
                Continue Shopping
              </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

//export default Checkout;
export default withPrivateRoute(CheckoutPage);

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = await getUserSession(context.req); // Get user session data from cookies or session storage
    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  
    const cartItems = await getUserCart(user.id); // Fetch user's cart data
    return {
      props: {
        cartItems,
        user,
      },
    };
  };
