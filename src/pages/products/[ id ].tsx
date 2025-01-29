import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { fetchProductDetails } from '../../services/api'; 
import { Product } from '../../services/api'; 
import { useCart } from '../../hooks/useCart'; 
import { useModal } from '../../contexts/ModalContext'; 

interface DetailPageProps {
  product: Product; // Data fetched on the server
}

const DetailPage: React.FC<DetailPageProps> = ({ product }) => {
  const router = useRouter();
  const { addProductToCart } = useCart();
  const { setIsCartModalOpen } = useModal(); 
  const [error, setError] = useState<string | null>(null);

  // Handler to add product to cart and open the modal
  const handleAddToCart = () => {
    if (product) {
      addProductToCart(product); // Add the product to the cart
      setIsCartModalOpen(true); // Open the cart modal
    }
  };

  // Loading state (if needed for client-side updates)
  if (!product && !error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-red-600 text-center p-4 bg-red-100 rounded-lg">
        {error}
        <button
          onClick={() => router.reload()} // Reload the page to retry
          className="mt-2 bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()} // Use Next.js's router to go back
        className="mb-6 bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600"
      >
        Back
      </button>

      {/* Product Details */}
      <h2 className="text-4xl font-bold mb-6">{product.title}</h2>
      <img
        src={product.imageUrl}
        alt={product.title}
        className="mb-4 w-full max-w-md mx-auto aspect-square object-cover rounded-lg shadow-lg"
      />
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">${product.price}</p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        aria-label="Add to Cart"
        role="button"
        tabIndex={0}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default DetailPage;

// Fetch product details on the server side
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const product = await fetchProductDetails(id);
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Failed to fetch product details:', error);
    return {
      props: {
        product: null,
        error: 'Failed to load product details. Please try again later.',
      },
    };
  }
};