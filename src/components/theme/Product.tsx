import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

// Define the interface for the expected props of the Product component
interface ProductProps {
  productData: {
    id: string;
    title: string;
    price: number;
    images: string[];
    category: { name: string };
    description: string;
  };
}

// Define the Product component
const Product: React.FC<ProductProps> = ({
  productData: { id, title, price, images: [image], category, description } // Destructure the productData prop
}) => (
  <div className="p-4 border border-grayshade-50 dark:border-grayshade-300 rounded-xl dark:bg-grayshade-500 w-full">
    {/* Container for the product card */}
    <Link to={`/${id}`}>
      <img className="w-full rounded-lg h-72 mb-7 object-cover" src={image} alt={title} />
    </Link>
    <div> {/* Container for the text details */}
    <p className="font-semibold text-xl mb-2">{title}</p>  {/* Display the product title */}
      <p className="text-grayshade-100 dark:text-grayshade-50 text-sm">
        {/* Display a short description (limited to 100 characters) */}
        {description.slice(0, 100)}...
        {/* Add a "Read More" link that navigates to the product detail page */}
        <Link to={`/${id}`} className="font-semibold text-blue-500"> Read More</Link>
      </p>
      <span className="text-sm text-grayshade-400">{category.name}</span>  {/* Display product's category */}
    </div>

    <div className="flex justify-between items-center"> 
      {/* Container to align the price and AddToCart button */}
      <div>
        <p className="text-grayshade-100 dark:text-grayshade-50 text-xs">Price</p> 
        
        <p className="font-semibold text-grayshade-300 dark:text-white text-lg">
          
          ${price.toLocaleString()}
        </p>
      </div>
      <AddToCart cartData={{ id, title, price }} />  
      {/* Include the AddToCart component passing the necessary product data */}
    </div>
  </div>
);

export default Product;