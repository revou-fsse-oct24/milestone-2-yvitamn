import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TbCategoryPlus } from "react-icons/tb";

// Define the structure for a category object
interface Category {
  id: number;
  name: string;
}

// Define the props expected by the FilterCategory component
interface FilterCategoryProps {
  query: { query: any; setQuery: any }; // query contains current search state and setQuery is a function to update it
}

function FilterCategory({ query: { query, setQuery } }: FilterCategoryProps) {
  // State hooks for managing categories, selected category, search params, and visibility of category filter
  const [catList, setCatList] = useState<Category[]>([]);
  const [selectedCat, setSelectedCat] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCat, setShowCat] = useState<boolean>(true);

  // useEffect runs after component mount to fetch categories and initialize selected category from URL parameters
  useEffect(() => {
    const getCategories = async () => {
      try {
        // Fetch categories from the server
        const response = await fetch("/categories");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();

        // If categories were fetched successfully, store them in sessionStorage and set them to state
        if (data.length) {
          sessionStorage.setItem("categories", JSON.stringify(data)); // Cache categories in sessionStorage
          setCatList(data); // Set categories to state
        }
      } catch (error) {
        console.error(error);
      }
    };

    // If categories are already in sessionStorage, use them; otherwise, fetch from the server
    if (sessionStorage.getItem("categories")) {
      setCatList(JSON.parse(sessionStorage.getItem("categories")!));
    } else {
      getCategories();  // Fetch categories if not in sessionStorage
    }

    // If the URL contains a "category" parameter, update the query and selected category
    if (searchParams.get("category")) {
      setQuery({ ...query, category: searchParams.get("category") });
      setSelectedCat(Number(searchParams.get("category")));
    }
  }, [query, searchParams, setQuery]); //

    // Function to handle category selection (when user clicks on a category)
    const categoryHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const catId = Number(e.currentTarget.id); // Get category ID from clicked element
    setSelectedCat(catId); // Update selected category state

     // Update the query and searchParams based on selected category
    const newQuery = { ...query, category: catId };
    setQuery(newQuery); // Update the query state
    setSearchParams(newQuery.category ? { category: catId.toString() } : {});
  };

  return (
    <div className="wrapper flex flex-col-reverse xl:grid gap-8 lg:grid-cols-3 text-xl py-14">
      {/* Filter Categories */}
      <div className="h-min block border-collapse text-center p-0 sm:p-5 col-start-1 col-end-3">
        <div className={`hidden sm:grid grid-cols-4 w-full`}>
          <div className="text-left border-purpleshade-400 border-l-4 p-4">CATEGORY</div>
        </div>
        <div className="h-max p-1 from-purpleshade-400 from-0% to-30% bg-gradient-to-br to-grayshade-50 dark:to-grayshade-300">
          <div className="text-lg bg-white dark:bg-grayshade-500">
            <p className="ml-2 flex items-center">
              <TbCategoryPlus className="mr-2 text-purpleshade-400" /> Categories:
            </p>
            {catList.length === 0 ? (
              <p>Loading...</p>
            ) : (
              <ul className="font-extralight text-lg">
                <li
                  className={`py-1 cursor-pointer px-2 ${selectedCat === 0 ? 'border-l-2 border-purpleshade-400' : ''}`}
                  onClick={categoryHandler}
                  id="0"
                >
                  All
                </li>
                {catList.map(({ id, name }) => (
                  id > 5 ? null : (
                    <li
                      key={id}
                      id={id.toString()}
                      className={`py-1 cursor-pointer px-2 ${selectedCat === id ? 'border-l-2 border-purpleshade-400' : ''}`}
                      onClick={categoryHandler}
                    >
                      {name}
                    </li>
                  )
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      {/* Toggle Categories */}
      <div onClick={() => setShowCat((prev) => !prev)} className="lg:hidden md:block flex mb-5 cursor-pointer">
        <TbCategoryPlus className="mr-2 text-purpleshade-400" />
        Categories
      </div>
    </div>
  );
}

export default FilterCategory;
