import { useContext } from 'react';
import  { CartContext }  from '../contexts/CartContext';



// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const {
    addedProducts,
    checkout,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    onCompleteCheckout,
    setCheckout,
  } = context;

  return {
    addedProducts,
    checkout,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    onCompleteCheckout,
    setCheckout,
  };
};

export default useCart;

