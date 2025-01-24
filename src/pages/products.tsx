

const Products = async () => {
    const response = await fetch('/api/products');
    const products = await response.json();
  
    return (
      <div>
        <h1>Products</h1>
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Products;
  