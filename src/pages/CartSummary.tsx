import React from 'react';

interface CartSummaryProps {
  cartItems: { name: string; price: number }[];
  onRemoveProduct: (productName: string) => void;
  onCompleteCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems, onRemoveProduct, onCompleteCheckout }) => {
  return (
    <div>
      <h2>Cart Summary</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price.toFixed(2)}
            <button onClick={() => onRemoveProduct(item.name)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={onCompleteCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default CartSummary;
