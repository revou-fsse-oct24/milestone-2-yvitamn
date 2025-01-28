import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Product } from '../services/api'; // Product type

// Custom hook to use CartContext
export const useCartActions = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartActions must be used within a CartProvider');
  }

  const {
    addedProducts,
    updateProductQuantity: contextUpdateProductQuantity, // Rename this to avoid conflict
    addProductToCart,
    removeProductFromCart
  } = context;

  // Function to find a product by its ID
  const findProductById = (productId: string | number): Product | undefined => {
    return addedProducts.find(product => product.id === productId);
  };

  // Function to handle the quantity change
  const handleQuantityChange = (productId: string | number, increment: boolean) => {
    const product = findProductById(productId); // Find the product by ID

    if (product) {
      const newQuantity = increment
        ? product.quantity + 1
        : Math.max(product.quantity - 1, 1); // Prevent going below 1

      // Now update the quantity using the context's update function
      contextUpdateProductQuantity(productId, newQuantity); // Use the renamed function
    } else {
      console.log('Product not found.');
    }
  };

  // Function to update product quantity (this focuses only on updating)
//   const updateProductQuantity = (productId: string | number, newQuantity: number) => {
//     setAddedProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product.id === productId ? { ...product, quantity: newQuantity } : product
//       )
//     );
//   };

  return {
    handleQuantityChange,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity: contextUpdateProductQuantity
  };
};


export default useCartActions;
