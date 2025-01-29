import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductDetails } from '../services/api';  // Make sure to use the correct API
import { useCart }  from '../hooks/useCart';
import { Product } from "../services/api";

interface DetailPageProps {
  onAddToCart: () => void;
}

const DetailPage: React.FC<DetailPageProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const { addProductToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);  // Using any or Product if the type is defined
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch product details from API
  useEffect(() => {
    if (id) {
      const fetchDetails = async () => {
        try {
          const data = await fetchProductDetails(id);
          setProduct(data); // Assuming `fetchProductDetails` returns the full product data
          setError(null); 
        } catch (error) {
          console.error('Error fetching product details:', error);
          setError('Failed to load product details. Please try again later.');
          setProduct(null);
        }
      };
      fetchDetails();
    }
  }, [id]);

  // Handler to add product to cart and open the modal
  const handleAddToCart = () => {
    if (product) {
      addProductToCart(product);  // Directly add the entire product object
      onAddToCart(); // Open the modal when product is added
    }
  };
  
// Loading and error states
if (!product && !error) {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
}

if (error) {
  return (
    <div className="text-red-600 text-center p-4 bg-red-100 rounded-lg">
      {error}
      <button
        onClick={() => window.location.reload()}
        className="mt-2 bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600"
      >
        Retry
      </button>
    </div>
  );
}

if (!product) return null;

  
  return (
    
    <div className="container mx-auto p-6">
      
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600"
      >
        Back
      </button>

      <h2 className="text-4xl font-bold mb-6">{product.title}</h2>
      <img 
      src={product.imageUrl} 
      alt={product.title} 
      className="mb-4 w-full max-w-md mx-auto aspect-square object-cover rounded-lg shadow-lg"/>
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">${product.price}</p>

      <button
        onClick={handleAddToCart}
        disabled={!product} // Disable if product is not loaded
        className="bg-blue-500
                  text-white py-2 
                  px-6 rounded-md
                  hover:bg-blue-600
                  disabled:bg-gray-300 
                  disabled:cursor-not-allowed"
                  aria-label="Add to Cart"
                  role="button"
                  tabIndex={0}
      >
        Add to Cart
      </button>

      {/* {isModalOpen && (
      <CartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product} // Pass the product to the modal if needed
      />
    )} */}
    
    
    
    </div>
  );
};

export default DetailPage;
