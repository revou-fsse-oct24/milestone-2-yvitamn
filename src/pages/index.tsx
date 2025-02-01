  import type { NextPage } from 'next';
  import { useState } from 'react';
  import  Link  from 'next/link';
  import Banner from "../layout/Header";
  import { Product, Category } from "@/lib/types";  
  import { useAuth } from '../hooks/useAuth';    
  import { GetStaticProps } from 'next';
  import { getCategories } from '@/lib/categoryApi';
  import { fetchProducts } from '@/lib/productApi';
 

  interface HomePageProps {
    products: Product[];
    categories: Category[];
  }

 const HomePage: NextPage<HomePageProps> = ({ products, categories }) => {
    // const [products, setProducts] = useState<Product[]>([]); // Products state
    // const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
    // const [error, setError] = useState<string | null>(null); // Error state
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true); // Modal open state, initially true for showing the modal
    const { user } = useAuth();
  
    // Fetch products when the component is mounted
    // useEffect(() => {
    //   const getProducts = async () => {
    //     try {
    //       const data = await fetchProducts();
    //       setProducts(data);
    //     } catch (error) {
    //       setError(error instanceof Error ? error.message : 'Failed to load products.');
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };
    //   getProducts();
    // }, []);
  
    
  
    // Close the modal and hide the header
    const handleModalClose = () => {
      setIsModalOpen(false); // Close the modal
    };
  
  
  
    return (
      <div className="container mx-auto p-6">
    
        {!isModalOpen && <Banner />}
  
        {/* Display a welcome message if the user is logged in */}
        {user && (
          <div className="text-center mb-6">
            <p className="text-lg">Welcome back, {user.name}!</p>
          </div>
        )}
  
  {/* Display Categories */}
  <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`} // Pass category ID as a query parameter
              passHref
            >
              <a className="bg-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition-colors">
                Shop our {category.name}
              </a>
            </Link>
          ))}
        </div>
      </div>

        {/* Main Content */}
        
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
              <Link href={`/products/${product.id}`} passHref>
               <a>
                <img
                  src={product.imageUrl[0]}
                  alt={product.title}
                  className="w-full h-128 object-cover mb-4 rounded"
                />
               </a>
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
  </div>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const { products } = await fetchProducts();
    const categories = await getCategories();

    return {
      props: {
        products,
        categories,
      },
      revalidate: 60, // Revalidate the page every 60 seconds
    };
  } catch (error) {
    console.error('Failed to fetch products or categories:', error);
    return {
      props: {
        products: [],
        categories: [],
      },
    };
  }
};






// Fetch products on the server side using getStaticProps
// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const products = await fetchProducts();
//     return {
//       props: {
//         products,
//       },
//       revalidate: 60, // Revalidate the page every 60 seconds
//     };
//   } catch (error) {
//     console.error('Failed to fetch products:', error);
//     return {
//       props: {
//         products: [],
//       },
//     };
//   }
// };