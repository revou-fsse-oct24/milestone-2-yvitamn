import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart'; // Custom hook to manage cart
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ThankYouModal from '../components/ThankYouModal';



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
    navigate('/products'); 
  };

  const handleCloseModal = () => {
    setOrderSuccess(false); // Hide modal after closing
    navigate('/products'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Checkout</h2>

        {orderSuccess ? (
          <ThankYouModal onClose={handleCloseModal} />
        ) : (
          <div>
            {addedProducts.length === 0 ? (
              <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-700">Cart Items:</h3>
                <ul className="mb-6 space-y-4">
                  {addedProducts.map((product) => (
                    <li key={product.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{product.title}</span>
                      <span className="text-gray-600">${product.price} x {product.quantity}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-xl font-semibold mb-8 text-gray-800">
                  Total: ${calculateTotalPrice().toFixed(2)}
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-700">Select Payment Method:</h3>
                  <select
                    className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="">Select Payment Method</option>
                    <option value="credit-card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="tf-bank">Transfer Bank</option>
                  </select>
                </div>

                {error && <p className="text-red-500 mb-6 text-center">{error}</p>}

                <div className="flex flex-col space-y-4">
                  <button
                    onClick={handleCheckout}
                    className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition duration-300 disabled:bg-green-300"
                    disabled={!paymentMethod}
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={handleContinueShopping}
                    className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
