
import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart'; // Custom hook to manage cart
import { useAuth } from '../hooks/useAuth';
import ThankYouModal from '../components/ThankYouModal';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import withPrivateRoute from '../lib/hoc/withPrivateRoute';
import { getOrders, updateOrderStatus } from '@/lib/orderApi';
import { Order, OrderItem } from '@/lib/types';


const Checkout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { addedProducts, clearCart } = useCart(); // Get the cart items
  const [paymentMethod, setPaymentMethod] = useState<string>(''); // State for selected payment method
  const [error, setError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false); // Track order success
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();// To navigate after checkout
    

  // Calculate total price
  const calculateTotalPrice = () => {
    return addedProducts.reduce((total, product) => total + product.price * product.quantity, 0);
 
};

  // If the user is not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, router]);

  const handleCheckout = async () => {
    try {
      if (!paymentMethod) {
        setError('Please select a payment method.');
        return;
      }

      setIsLoading(true);
      setError(null);

      // Transform addedProducts (Product[]) into items (OrderItem[])
      const items: OrderItem[] = addedProducts.map((product) => ({
        id: product.id, // Map product.id to productId
        product: product,
        quantity: product.quantity,
        price: product.price, // Include price if needed
      }));
  
      // Create the order
      const order: Order = {
        id: Math.floor(Math.random() * 1000), // Generate a random order ID
        userId: 1, // Replace with the actual user ID
        items, // Use the transformed items
        total: calculateTotalPrice(),
        status: 'pending',
      };
  

      // Update order status (replace with actual API call)
      await updateOrderStatus(order.id, 'completed');

      // Clear the cart after successful checkout
      clearCart();

      setOrderSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong, please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleContinueShopping = () => {
    router.push('/products'); // Navigate to the products page (or any other page you want)
  };

  const handleCloseModal = () => {
    setOrderSuccess(false); // Hide modal after closing
    router.push('/'); // Redirect to home or any other page
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
                  <option value="shopeepay">Shopeepay</option>
                  <option value="paypal">PayPal</option>
                  <option value="gpay">GPay</option>
                </select>
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}


              <div className="flex justify-center">
              <button
                onClick={handleCheckout}
                className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 w-full mb-4"
                disabled={!paymentMethod || isLoading}
                >
                  {isLoading ? 'Processing...' : 'Proceed to Checkout'}
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
export default withPrivateRoute(Checkout);


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const token = req.cookies.token;  // Get the token from cookies
    if (!token) {
      return { redirect: { destination: '/login', permanent: false } };
    }
  
    try {
      const orders = await getOrders();  // Fetch the user's cart items from the server
      return { props: { orders } };
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return { notFound: true };
    }
  };

