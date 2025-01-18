import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../services/api';  // Make sure to use the correct API
import { useCart }  from '../hooks/useCart';
import CartModal from '../components/CartModal';
import Navbar from "../layout/Navbar";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
//import CartContext from "../contexts/CartContext";
import { Product } from "../services/api";

interface DetailPageProps {
  onAddToCart: () => void;
}

const DetailPage: React.FC<DetailPageProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const { addProductToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);  // Using any or Product if the type is defined
  //const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch product details from API
  useEffect(() => {
    if (id) {
      const fetchDetails = async () => {
        try {
          const data = await fetchProductDetails(id);
          setProduct(data); // Assuming `fetchProductDetails` returns the full product data
        } catch (error) {
          console.error('Error fetching product details:', error);
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
  

  if (!product) return <div>Loading...</div>;  // Handle loading state

  return (
    <div className="container mx-auto p-6">
      <Navbar />
      <Header />
      <h2 className="text-4xl font-bold mb-6">{product.title}</h2>
      <img 
      src={product.imageUrl} 
      alt={product.title} 
      className="mb-4 w-full max-w-sm mx-auto" />
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">${product.price}</p>

      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
      >
        Add to Cart
      </button>

      {/* Cart Modal
      <CartModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
      onAddToCart={handleAddToCart}
      /> */}
    
    
    <Footer />
    </div>
  );
};

export default DetailPage;
