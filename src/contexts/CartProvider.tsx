import { ReactNode, useState } from 'react';
import { CartContext } from './CartContext'; // Import CartContext and Product type
import { Product } from '../services/api';

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [addedProducts, setAddedProducts] = useState<Product[]>([]); // State for added products
  const [checkout, setCheckout] = useState<boolean>(false); // State for checkout status

  // Add product to cart
  const addProductToCart = (product: Product) => {
    setAddedProducts((prevProduct) => { // Renamed prevState to prevProduct
      const existingProduct = prevProduct.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevProduct.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevProduct, { ...product, quantity: 1 }];
    });
  };

  // Remove product from cart
  const removeProductFromCart = (productId: string | number) => { // Updated type to accept string | number
    setAddedProducts((prevProduct) => { // Renamed prevState to prevProduct
      const existingProduct = prevProduct.find((item) => item.id === productId);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          return prevProduct.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
          );
        }
        return prevProduct.filter((item) => item.id !== productId);
      }
      return prevProduct;
    });
  };

  // Update product quantity  
  const updateProductQuantity = (productId: string | number, quantity: number) => {
    setAddedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      )
    );
  };
  


  // Complete checkout function
  const onCompleteCheckout = () => {
    setCheckout(true);
  };

  // Set checkout status
  const setCheckoutStatus = (checkout: boolean) => {
    setCheckout(checkout);
  };

  return (
    <CartContext.Provider value={{
      addedProducts, 
      checkout, 
      addProductToCart, 
      removeProductFromCart, 
      onCompleteCheckout,
      updateProductQuantity,
      setCheckout: setCheckoutStatus // Using setCheckout here
    }}>
      {children}
    </CartContext.Provider>
  );
};
