import React, { useState, useEffect } from "react";

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

    if (!productName || !categoryId) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: productName,
          category: categoryId,
        }),
      });

      if (response.ok) {
        setProductName("");
        setCategoryId("");
        fetchProducts();
        console.log("Product added successfully");
      } else {
        console.log("Failed to add product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchProducts();
        console.log("Product deleted successfully");
      } else {
        console.log("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchProducts = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(keyword)
    );
    setFilteredProducts(filtered);
    setSearchKeyword(keyword);
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (searchKeyword) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchKeyword)
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
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category ID"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />
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
