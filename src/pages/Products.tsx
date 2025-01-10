import { useEffect, useState } from "react";
import Product from "../components/Product";
import { useProductConsumer } from "../contexts/ProductsProvider";
import Search from "../components/Search";
import FilterCategory from "../components/FilterCategory";
import searchFilterHandler from "../utils/helpers/searchFilterHandler";
import NoProductFound from "../components/NoProductFound";

const Products: React.FC = () => {
  const productsList = useProductConsumer();
  const [query, setQuery] = useState({ search: "" });
  const [notFound, setNotFound] = useState(false);

  const data = searchFilterHandler(query, productsList);

  useEffect(() => {
    const check = setTimeout(() => {
      if (!data.length && query.search) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    }, 1);
    return () => {
      clearTimeout(check);
    };
  }, [data, query]);

  return (
    <div className="wrapper">
      {/* Search Bar */}
      <Search query={{ query, setQuery }} />
      
      <div className="w-full flex lg:flex-row flex-col-reverse">
        {/* Products Grid */}
        <div className="lg:w-10/12 md:w-10/12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 lg:gap-7 gap-4 m-auto">
          {/* Show "No Products Found" */}
          {notFound && <NoProductFound />}
          
          {/* Loading State */}
          {!data.length && !notFound ? (
            <div className="w-full col-span-3 flex justify-center m-auto py-6">
              <p className="text-xl text-indigo-600">Loading products...</p>
            </div>
          ) : (
            // Display filtered products
            data.map((product) => (
              <Product key={product.id} productData={product} />
            ))
          )}
        </div>

        {/* Filter Sidebar */}
        <FilterCategory query={{ query, setQuery }} />
      </div>
    </div>
  );
};

export default Products;
