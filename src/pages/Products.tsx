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
  
      {/* {<Header />} */}

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="col-span-1 p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              {/* Product Image and Title */}
              <Link to={`/products/${product.id}`} className="block">
                <img
              src={product.imageUrl}
              alt={product.title}
              
               className="w-full h-auto aspect-square object-cover mb-4 rounded"
            />
          </Link>
          <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
          <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
            </div>
          ))}
        </div>
      )}



      {/* Welcome Modal */}
      {isModalOpen && (
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
          )}
    </div>   
  );
};

export default Products;