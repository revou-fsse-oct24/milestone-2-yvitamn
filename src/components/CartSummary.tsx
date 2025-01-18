import { useState, useEffect, useCallback } from 'react';
import { Product } from '../services/api';



interface CartSummaryProps {
  cartItems: Product[];
  onRemoveProduct: (productId: string) => void;  // The onRemoveProduct prop is a function that accepts productId as a string
  onCompleteCheckout: () => void;            // The onCompleteCheckout prop is a function with no arguments
  onClose: () => void;
  updateProductQuantity: (productId: string, increment: boolean) => void;
  onAddToCart: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  cartItems,
  onRemoveProduct,
  onCompleteCheckout,
  onClose,
  updateProductQuantity,
  onAddToCart
}) => {
  // State for total price
  const [totalPrice, setTotalPrice] = useState<number>(0);
  

 // Memoized function to calculate total price
 const calculateTotalPrice = useCallback(() => {
  const total = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  setTotalPrice(total);
}, [cartItems]);

// Update the total price when cart items change
useEffect(() => {
  calculateTotalPrice();
}, [cartItems, calculateTotalPrice]);

// Assuming `updateProductQuantity` expects (productId: string, quantity: number)
const handleQuantityChange = (productId: string, increment: boolean) => {
  const product = addedProducts.find(item => item.id === productId);  // Find the product by ID
  if (product) {
    const newQuantity = increment
      ? Number(product.quantity) + 1
      : Math.max(Number(product.quantity) - 1, 1); // Ensure the quantity never goes below 1

    // Call the updateProductQuantity with the correct value
    updateProductQuantity(productId, newQuantity);
  }
};


  // Use setInterval to simulate real-time updates (every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      calculateTotalPrice();
    }, 3000); // Update total price every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [cartItems, calculateTotalPrice]);

  return (
    <div className="max-h-64 overflow-y-auto mb-4">
      {/* If no items in the cart, show an empty message */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    ${item.price} x{' '}
                    <button
                      onClick={() => handleQuantityChange(String(item.id), false)}
                      className="mx-2 text-lg"
                      disabled={item.quantity <= 1} // Disable decrement when quantity is 1
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => handleQuantityChange(String(item.id), true)}
                      className="mx-2 text-lg"
                    >
                      +
                    </button>
                  </p>
                </div>
              </div>
              {/* Remove Button */}
              <button
                onClick={() => onRemoveProduct(String(item.id))}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Total Price */}
      <div className="mt-4 text-lg font-semibold">
        <p>Total Price: </p>
        <p className="text-xl text-green-500 font-bold">${totalPrice.toFixed(2)}</p>
      </div>

      {/* Checkout and Continue Shopping Buttons */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
        >
          Continue Shopping
        </button>

        <button
          onClick={onAddToCart} 
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add More Items to Cart
        </button>
        <button
          onClick={onCompleteCheckout}
          disabled={cartItems.length === 0}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};