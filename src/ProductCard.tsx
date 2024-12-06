import { useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

const ProductCard = () => {
  const [searchName, setSearchName] = useState<string>("");
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  // JSON fájl betöltése
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/products.json");
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = () => {
    const foundProduct = products.find((p) =>
      p.name.toLowerCase().includes(searchName.toLowerCase())
    );
    if (foundProduct) {
      setProduct(foundProduct);
      setError(null);
    } else {
      setProduct(null);
      setError("No product found with the given name.");
    }
  };

  return (
    <div className="product-card">
      <div className="search-section">
        <label htmlFor="productName">Enter Product Name:</label>
        <input
          id="productName"
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter product name..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="results-section">
        {error && <p className="error">{error}</p>}
        {product && (
          <div className="product-info">
            <img
              src={product.image}
              alt={`${product.name}'s image`}
              className="product-image"
            />
            <div className="product-details">
              <p>ID: {product.id}</p>
              <p>Name: {product.name}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;