
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { fetchProducts } from '@/lib/productApi';
import { Product, Category } from '@/lib/types';
import { useAuth } from '../../hooks/useAuth';
import { getCategories } from '../../lib/categoryApi';

interface ProductsProps {
  products: Product[]; // Data fetched on the server
  categories: Category[];
}

export default function ProductsPage({ products, categories }: ProductsProps) {
  const { user } = useAuth();
  //const { products: cachedProducts, fetchProducts } = useProductCache();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  
  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    if (selectedCategory === '') {
      return products || []; // Show all products if no category is selected
    }
    return (products || []).filter(product => {
      return product.category && product.category.id === parseInt(selectedCategory);
    });
  }, [products, selectedCategory]);

  // Handle category change
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
  };

   return (
    <div className="container mx-auto p-6">
      {/* Header */}
      {/* <Banner /> */}

      {/* Welcome message for logged-in users */}
      {user && (
        <div className="text-center mb-6">
          <p className="text-lg">Welcome back, {user.name}!</p>
        </div>
      )}

{/* Category Filter */}
<div className="mb-6 text-center">
        <label htmlFor="category-select" className="mr-2">Filter by Category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border rounded"
          aria-label="Filter products by category"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-span-1 p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
               <Link href={`/products/${product.id}`} passHref>
               <a>
              <img
                src={product.imageUrl[0]}
                alt={product.title}
                className="w-full h-auto aspect-square object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
              </a>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


//export default ProductsPage;

// Fetch categories at build time
export const getStaticProps: GetStaticProps<ProductsProps> = async () => {
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




