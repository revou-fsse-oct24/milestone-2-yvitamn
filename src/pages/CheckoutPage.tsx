// import { useEffect } from "react";
// import { useCartConsumer } from "../contexts/CartProvider";
// import AddToCart from "../components/AddToCart";
// // import EmptyCart from "../components/EmptyCart";
// import { useAuth } from "../contexts/AuthenticateProvider";

// const CheckoutPage: React.FC = () => {
//   const { cartState, dispatch } = useCartConsumer(); // Destructure cart state and dispatch action
//   const { userInfo } = useAuth(); // Destructure user info from auth context
//   const [error, setError] = useState<string | null>(null); // State to handle errors

//   useEffect(() => {
//     // If the cart is in checkout state, process the order
//     if (!cartState.checkout) return;

//     const postOrder = async () => {
//       // Prepare the order data by combining cart state and user info
//       const orderData = {
//         ...cartState,
//         userInfo,
//       };
      
//       try {
//         // Send a POST request to place the order
//         const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`, // Attach JWT token
//           },
//           body: JSON.stringify(orderData), // Send order data as JSON
//         });

//         if (response.ok) {
//           console.log("Order placed successfully");
//         } else {
//           setError("Failed to place order");
//         }
//       } catch (error) {
//         setError("Error placing order:" + error);
//       }

//       dispatch({ type: "CLEAR" });
//     };

//     // Call the function to post the order is processed, clear the cart state
//     postOrder();
//   }, [cartState, dispatch, userInfo, authToken]); // Dependencies: cartState, dispatch, userinfo

//   // Trigger checkout action to indicate that the user is checking out
//   const checkoutHandler = () => {
//     dispatch({ type: "CHECKOUT" });
//   };

//   return (
//     <>
//     {/* Check if the checkout is complete or cart is empty */}
//     {error && <div className="error-message">{error}</div>} {/* Display error message */}
//       {cartState.checkout || !cartState.addedProducts.length ? (
//         <EmptyCart /> // Display empty cart message if no products are added or checkout is complete
//       ) : (
//         <div className="wrapper flex flex-col-reverse xl:grid gap-8 lg:grid-cols-3 text-xl py-14">
//           {/* Cart items section */}
//           <div className="h-min block border-collapse text-center p-0 sm:p-5 col-start-1 col-end-3">
//             <div className="hidden sm:grid grid-cols-4 w-full">
//               <div className="text-left border-purpleshade-400 border-l-4 p-4">
//                 PRODUCT
//               </div>
//               <div className="justify-self-center p-4">PRICE</div>
//               <div className="justify-self-center p-4">QUANTITY</div>
//               <div className="justify-self-center p-4">SUBTOTAL</div>
//             </div>

//              {/* List of added products */}
//             <div className="h-max p-1 from-purpleshade-400 from-0% to-30% bg-gradient-to-br to-grayshade-50 dark:to-grayshade-300">
//             <div className="text-lg bg-white dark:bg-grayshade-500">
//               {cartState.addedProducts.map((product) => (
//                   <div key={product.id} {/* Unique key for each product*/}
//                     className="grid grid-cols-1 sm:grid-cols-4 py-4 xl:text-base text-sm"
//                   >
//                     <div className="text-center sm:text-left p-4 h-14">
//                       {product.title}
//                     </div>
//                     <div className="justify-self-center p-4 h-14">
//                       $ {product.price}
//                     </div>
//                     {/* Quantity input with AddToCart component */}
//                     <div className="justify-self-center p-4 h-14">
//                       <AddToCart
//                         cartData={{
//                           id: product.id,
//                           title: product.title,
//                           price: product.price,
//                         }}
//                       />
//                     </div>
//                      {/* Product subtotal */}
//                     <div className="w-max justify-self-center p-4 h-14">
//                       $ {product.quantity * product.price}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Order summary */}
//           <div className="font-bold col-start-3 xl:mt-20 justify-self-end col-end-4 h-max w-full xl:w-max dark:bg-grayshade-500 border-2 border-grayshade-50 dark:border-grayshade-200 p-10 rounded-xl relative bg-cover bg-no-repeat outline outline-zinc-200 dark:outline-grayshade-400 outline-8 bg-[url('../assets/AbstractDesign.svg')]">
//             <div className="flex xl:justify-start justify-center items-center my-5">
//               <p>Order Total: </p>
//               <p className="ml-2">$ {cartState.totalPrice}</p>
//             </div>
//             <div className="flex xl:justify-start justify-center items-center my-5">
//               <p>Sales volume: </p>
//               <p className="ml-2">{cartState.ordersCount}</p>
//             </div>
//             <div className="text-center">
//               <button
//                 onClick={checkoutHandler} // Trigger checkout action
//                 aria-label="Proceed to checkout"
//                 className="h-10 px-4 font-semibold button"
//               >
//                 CHECKOUT
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CheckoutPage;


// import React, { useState, useEffect } from 'react';
// import EmptyCart from './EmptyCart'; // Import EmptyCart
// import CartSummary from './CartSummary'; // Import CartSummary

// // Modal component for confirming checkout
// const CheckoutModal: React.FC<{ onClose: () => void; onProceed: () => void }> = ({
//   onClose,
//   onProceed,
// }) => {
//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h2>Confirm Checkout</h2>
//         <p>Are you sure you want to proceed with the checkout?</p>
//         <button onClick={onClose}>Cancel</button>
//         <button onClick={onProceed}>Proceed</button>
//       </div>
//     </div>
//   );
// };

// const CheckoutPage: React.FC = () => {
//   // Define the cart state with initial products
//   const [cartState, setCartState] = useState({
//     addedProducts: [
//       { id: 1, name: 'Product 1', price: 29.99 },
//       { id: 2, name: 'Product 2', price: 49.99 },
//     ], // Example cart items
//     checkout: false, // Boolean to track checkout status
//   });
//   const [error, setError] = useState('');
//   const [showModal, setShowModal] = useState(false); // Track modal visibility

//   useEffect(() => {
//     // This effect could be used to fetch cart data from local storage, API, etc.
//   }, []);

//   // Handle removing an item from the cart
//   const removeFromCart = (productId: number) => {
//     setCartState((prevState) => ({
//       ...prevState,
//       addedProducts: prevState.addedProducts.filter((product) => product.id !== productId),
//     }));
//   };

//   // Handle proceeding with checkout
//   const handleCheckoutProceed = () => {
//     setCartState((prevState) => ({
//       ...prevState,
//       checkout: true,
//     }));
//     setShowModal(false); // Hide the modal after proceeding
//   };

//   // Handle closing the checkout modal
//   const handleModalClose = () => {
//     setShowModal(false);
//   };

//   // Check if cart is empty or checkout is completed
//   const isCartEmptyOrCheckoutComplete = cartState.checkout || !cartState.addedProducts.length;

//   return (
//     <>
//       {error && <div className="error-message">{error}</div>} {/* Display error message */}

//       {/* Modal for confirming checkout */}
//       {showModal && (
//         <CheckoutModal onClose={handleModalClose} onProceed={handleCheckoutProceed} />
//       )}

//       {/* Check if the checkout is complete or cart is empty */}
//       {isCartEmptyOrCheckoutComplete ? (
//         <EmptyCart /> // Display empty cart message if no products are added or checkout is complete
//       ) : (
//         <CartSummary
//           cartItems={cartState.addedProducts}
//           removeFromCart={removeFromCart} // Pass remove function to CartSummary
//           onCheckout={() => setShowModal(true)} // Show modal when user clicks "Proceed to Checkout"
//         />
//       )}
//     </>
//   );
// };

// export default CheckoutPage;




import React, { useState, useEffect } from 'react';
import EmptyCart from '../pages/EmptyCart';  
import CartSummary from '../pages/CartSummary';  
import { fetchProducts } from '../services/api';  


interface Product {
  id: string;
  name: string;
  price: number;
}

const CheckoutPage: React.FC = () => {
  const [cartState, setCartState] = useState({
    addedProducts: [] as Product[], // Empty initially
    checkout: false,
  });

  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch product data from Fake API
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();  // Fetch products using the fetchProducts function from api.ts
        setProducts(data); // Set products data
      } catch (error) {
        setError('Failed to load products. Please try again later.');
      }
    };

    getProducts(); // Call fetch function on mount
  }, []); // Empty dependency array ensures it runs once on mount

  // Function to add a product to the cart
  const addProductToCart = (product: Product) => {
    setCartState(prevState => ({
      ...prevState,
      addedProducts: [...prevState.addedProducts, product]
    }));
  };

  // Function to remove a product from the cart
  const removeProductFromCart = (productName: string) => {
    setCartState(prevState => ({
      ...prevState,
      addedProducts: prevState.addedProducts.filter(product => product.name !== productName)
    }));
  };

  // Function to complete the checkout
  const completeCheckout = () => {
    setCartState(prevState => ({
      ...prevState,
      checkout: true
    }));
  };

  return (
    <div className="checkout-page">
      {/* Error message if any */}
      {error && <div className="error-message">{error}</div>}

      {/* Check if the checkout is complete or cart is empty */}
      {cartState.checkout || !cartState.addedProducts.length ? (
        <EmptyCart /> // Display empty cart message if no products are added or checkout is complete
      ) : (
        <CartSummary
          cartItems={cartState.addedProducts}
          onRemoveProduct={removeProductFromCart}
          onCompleteCheckout={completeCheckout}
        /> // Display cart summary if products are added
      )}

      {/* Product List from API */}
      <div className="product-list">
        <h2>Available Products</h2>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id}>
              <h3>{product.name} - ${product.price.toFixed(2)}</h3>
              <button onClick={() => addProductToCart(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products available at the moment.</p>
        )}
      </div>

      {/* Example Buttons to simulate adding/removing products */}
      <div className="product-actions">
        <button onClick={completeCheckout}>Complete Checkout</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
