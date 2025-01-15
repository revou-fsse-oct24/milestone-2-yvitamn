import { useCartCunsumer } from "../contexts/CartProvider";
import { MdOutlineDelete } from "react-icons/md";
import findItem from "../utils/helpers/FindCartProduct";
import { useAuth } from "../contexts/AuthenticateProvider";
import { useNavigate } from "react-router-dom";

// Define the props for the component, which includes the cart data
interface AddToCartProps {
  cartData: {
    id: number; // product ID
    [key: string]: any; // Extend with other properties from the cart data
  };
}

// The AddToCart component to manage adding/removing items to/from the cart
const AddToCart: React.FC<AddToCartProps> = ({ cartData }) => {
  // Access the cart state and dispatch function from CartProvider context
  const { cartState, dispatch } = useCartCunsumer();
  const { isAuthenticated } = useAuth(); // Access the authentication state to check if the user is logged in
  const navigate = useNavigate(); //Access the navigate function to redirect users when theyre not

  // Create a cart info object, setting the quantity to 1 by default
  const cartInfo = { ...cartData, quantity: 1 };
  // Use the findItem helper function to search if the product is already in the cart
  const item = findItem(cartState.addedProducts, cartInfo.id);

  // Function to handle cart actions  
  const handleAction = (type: string) => {
    // If the action is to add a product but the user is not authenticated, redirect to login page
    if (type === "ADD_PRODUCT" && !isAuthenticated) return navigate("/auth/login");
    // Dispatch an action to modify the cart based on the type of action
    dispatch({ type, payload: cartInfo.id });
  };

  return (
    <div className="flex text-white justify-between items-center">
      {/* Check if the product is already in the cart */}
      {cartState.addedProducts.some((product) => product.id === cartData.id) ? (
        <>
        //If the product is in the cart, display buttons to handle the quantity
        {/* Increase quantity button */}
          <button className="h-8 w-8 button" onClick={() => handleAction("INCREASE")}>+</button>
          {/* Display the current quantity of the item in the cart */} 
          <span className="dark:bg-grayshade-300 bg-zinc-200 text-grayshade-500 dark:text-white inline-block text-center border border-grayshade-50 dark:border-grayshade-100 min-w-10 py-1 px-1 text-md rounded-lg mx-1">
            {item.quantity}  {/* Display the quantity of the product in the cart */}
          </span>

          {/* Decrease quantity or delete button */}
          <button
            className={`h-8 w-8 button ${item.quantity > 1 ? "" : "!bg-red-500"}`}
           // If quantity > 1, decrease the quantity; else, delete the product from the cart
            onClick={() => (item.quantity > 1 ? handleAction("DECREASE") : handleAction("DELETE"))}
          >
            {/* Show a "-" button if quantity > 1; otherwise, show the delete icon */}
            {item.quantity > 1 ? "-" : <MdOutlineDelete className="m-auto" />}
          </button>
        </>
      ) : (
        // If the product is not in the cart, show an "Add to Cart" button
        <button className="h-8 px-4 button" onClick={() => handleAction("ADD_PRODUCT")}>
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default AddToCart;