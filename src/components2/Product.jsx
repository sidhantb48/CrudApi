import { useState, useEffect } from "react";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchKeyword, sortBy]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    // ...same as before...

    if (productId === "") {
      // Create new product
      console.log("Product added successfully");
    } else {
      // Edit existing product
      console.log("Product edited successfully");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "DELETE",
      });

      // ...same as before...

      console.log("Product deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const searchProducts = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (searchKeyword) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    if (sortBy === "price-low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div>
      <h2>Products</h2>
      <form onSubmit={addProduct}>
        {/* ...input fields for adding/editing a product... */}
        <button type="submit">Add Product</button>
      </form>
      <div>
        <label>Search: </label>
        <input
          type="text"
          value={searchKeyword}
          onChange={searchProducts}
          placeholder="Search products..."
        />
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">None</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
        </select>
      </div>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.title} - {product.price}
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
