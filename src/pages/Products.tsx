import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import Navbar from "../layout/Navbar";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Product } from "../services/api";
import { useCart } from '../hooks/useCart';  
import { useAuth } from '../hooks/useAuth';  


const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Products state
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true); // Modal open state, initially true for showing the modal
  const { addProductToCart } = useCart(); // Use the custom hook to add items to the cart
  const { user } = useAuth(); // Get the user from the AuthContext
  const navigate = useNavigate();

  // Fetch products when the component is mounted
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch {
        setError('Failed to load products.');
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  // Handle adding product to the cart and opening the modal
  const handleAddToCart = (product: Product) => {
    if (user) {
      addProductToCart(product);
   //  onAddToCart();
      //setIsModalOpen(true);
     // setTimeout(() => {
       // setIsModalOpen(false);
     // }, 10000); //close modal in 10s
    } else {
      alert('You need to log in to add items to the cart!');
      navigate('/login'); 
    }
  };

  // Close the modal and hide the header
  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="container mx-auto p-6">
      <Navbar />

      {/* Conditionally render Header based on modal state */}
      {isModalOpen && <Header />}

      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-12 gap-6">
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
              className="w-full h-[440px] object-cover mb-4 rounded"
            />
          </Link>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                disabled={!user} // Disable button if the user is not logged in
                className={`w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 ${!user ? 'bg-gray-300 cursor-not-allowed' : ''}`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Open Modal on Add to Cart */}
      {isModalOpen && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold">Welcome to Shop Smart!</h2>
                <p className="text-gray-600 mt-4">Browse and shop the best products.</p>
                <button
                  onClick={handleModalClose}
                  className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}


      <Footer /> {/* Footer */}
    </div>
  );
};

export default Products;