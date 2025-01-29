

import { createContext } from 'react';
import { Product } from '../services/api'; 



export interface CartContextType {
  addedProducts: Product[];
  checkout: boolean;
  addProductToCart: (product: Product) => void;
  updateProductQuantity: (productId: string | number, quantity: number) => void;
  removeProductFromCart: (productId: string) => void;
  onCompleteCheckout: () => void;
  setCheckout: (checkout: boolean) => void; // Method to update checkout state
}

// Create the CartContext with a default value of undefined (for later checking)
export const CartContext = createContext<CartContextType | null>(null);


//export default CartContext;



