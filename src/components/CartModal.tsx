//import React from 'react';
import { useCart } from '../hooks/useCart';
import { CartSummary } from '../components/CartSummary';


interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void; 
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, onAddToCart }) => {
  const { 
      addedProducts,
      removeProductFromCart, 
      onCompleteCheckout, 
      updateProductQuantity,
      setCheckout 
    } = useCart();
  
const handleCompleteCheckout = () => {
  setCheckout(true); // Set checkout status to true
  onCompleteCheckout(); // Call the parent function for checkout
};

const handleQuantityChange = (productId: string, increment: boolean) => {
  // Use cartItems instead of addedProducts
  const product = addedProducts.find(item => item.id === productId);  // Use addedProducts (or cartItems)
  if (product) {
    const newQuantity = increment
      ? product.quantity + 1 // If increment is true, increase quantity
      : Math.max(product.quantity - 1, 1); // If increment is false, decrease quantity but not below 1

    // Call updateProductQuantity with the correct value (increment flag tells if quantity should go up or down)
    updateProductQuantity(productId, newQuantity);  // Pass the increment flag as a boolean
  } else {
    console.log("Product not found.");
  }
};


      if (!isOpen) return null; // If modal isn't open, don't render

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>

        {/* Pass props to CartSummary for cart-related logic */}
        <CartSummary 
        cartItems={addedProducts}          // Cart items (products)
        onRemoveProduct={removeProductFromCart}   // Function to remove product
        onCompleteCheckout={handleCompleteCheckout}     // Function to complete checkout
        onClose={onClose}                    // Close modal
        updateProductQuantity={handleQuantityChange} // Function to update quantity
        onAddToCart={onAddToCart}
        />
      </div>
    </div>
  );
};

export default CartModal;
