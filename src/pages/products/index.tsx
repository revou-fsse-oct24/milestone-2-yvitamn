

import { GetServerSideProps } from 'next';
import { fetchProducts, Product } from '../services/api';

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
    
    return (
      <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>

      <div className="grid grid-cols-12 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="col-span-1 p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            {/* Product Image */}
            <div className="mb-4">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-[440px] object-cover mb-4 rounded"
              />
            </div>

            {/* Product Category Image */}
            <div className="mb-4">
              <img
                src={product.category.image}
                alt={product.category.name}
                className="w-12 h-12 object-cover rounded-full"
              />
              <p>{product.category.name}</p>
            </div>
            </div>
        ))}
      </div>
    </div>
  );
};


// SSR: Fetch products data from API before page rendering
export const getServerSideProps: GetServerSideProps<ProductsProps> = async () => {
  try {
    const products = await fetchProducts();
    return {
      props: { products },
    };
  } catch (error) {
    return {
      props: {
        products: [],
      },
    };
  }
};


  
  export default Products;
  