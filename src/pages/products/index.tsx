import { useState } from 'react';
import Link from 'next/link'; 
import { GetStaticProps } from 'next';

import { fetchProducts } from '../../services/api'; 
import { Product } from '../../services/api'; 
import { useAuth } from '../../hooks/useAuth'; 
import Header from '../../layout/Banner'; 

interface ProductsPageProps {
  initialProducts: Product[]; // Data fetched on the server
}

const ProductsPage: React.FC<ProductsPageProps> = ({ initialProducts }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts); // Use initial data
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state for client-side updates
  const [error, setError] = useState<string | null>(null); // Error state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true); // Modal state
  const { user } = useAuth();

  // Close the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <Header />

      {/* Welcome message for logged-in users */}
      {user && (
        <div className="text-center mb-6">
          <p className="text-lg">Welcome back, {user.name}!</p>
        </div>
      )}

      {/* Product Grid */}
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
              <Link href={`/products/${product.id}`} passHref>
                <a>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-auto aspect-square object-cover mb-4 rounded"
                  />
                </a>
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

export default ProductsPage;

// Fetch products on the server side
// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const initialProducts = await fetchProducts();
//     return {
//       props: {
//         initialProducts,
//       },
//     };
//   } catch (error) {
//     console.error('Failed to fetch products:', error);
//     return {
//       props: {
//         initialProducts: [], error: 'Failed to load products'
//       },
//     };
//   }
// };


export const getStaticProps: GetStaticProps = async () => {
  try {
    const products = await fetchProducts();
    return {
      props: {
        products,
      },
      revalidate: 60, // This means the page will be revalidated at most once every 60 seconds
    };
  } catch (error) {
    return {
      props: {
        products: [],
      },
    };
  }
};