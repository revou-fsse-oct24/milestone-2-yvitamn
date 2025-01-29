import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import Header from "../layout/Header";
import { Product } from "../services/api";  
import { useAuth } from '../hooks/useAuth';    


const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Products state
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true); // Modal open state, initially true for showing the modal
  const { user } = useAuth();

  // Fetch products when the component is mounted
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load products.');
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  

  // Close the modal and hide the header
  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };



  return (
    <div className="container mx-auto p-6">
  
      {!isModalOpen && <Header />}

      {/* Display a welcome message if the user is logged in */}
      {user && (
        <div className="text-center mb-6">
          <p className="text-lg">Welcome back, {user.name}!</p>
        </div>
      )}


      {/* Main Content */}
      {/* <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1> */}

      {isLoading ? (
  <div className="text-center">Loading...</div>
) : error ? (
  <div className="text-center text-red-600">{error}</div>
) : (

<div className="relative"> {/* Parent container for positioning buttons */}
    {/* Scroll Left Button */}
    <button
      onClick={() => {
        const productGrid = document.getElementById('product-grid');
        if (productGrid) {
          productGrid.scrollBy({ left: -200, behavior: 'smooth' });
        }
      }}
      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
    >
      &larr;
    </button>

    {/* Scrollable Product Grid */}
    <div id="product-grid" className="overflow-x-auto whitespace-nowrap scroll-smooth max-w-screen-lg mx-auto">
      <div className="inline-flex gap-6 p-4">
        {products.slice(0, 12).map((product) => (
          <div
            key={product.id}
            className="w-96 
            flex-shrink-0 
            p-4 border 
            rounded-lg 
            shadow-lg 
            hover:shadow-xl 
            transition-all 
            duration-500 
            ease-in-out"
          >
            {/* Product Image and Title */}
            <Link to={`/products/${product.id}`} className="block">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-128 object-cover mb-4 rounded"
              />
             
            </Link>
          </div>
        ))}
      </div>
    </div>

    {/* Scroll Right Button */}
    <button
      onClick={() => {
        const productGrid = document.getElementById('product-grid');
        if (productGrid) {
          productGrid.scrollBy({ left: 200, behavior: 'smooth' });
        }
      }}
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
    >
      &rarr;
    </button>
  </div>
)}


      {/* Welcome Modal */}
      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center" role="dialog" aria-labelledby="modal-title">
            <h2 id="modal-title" className="text-2xl font-bold">Welcome to Shop Smart!</h2>
            <p className="text-gray-600 mt-4">Browse and shop the best products.</p>
            <button
              onClick={handleModalClose}
              className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
              aria-label="Close modal"
            >
              Close
            </button>
              </div>
            </div>
          )} */}
    </div>   
  );
};

export default Products;