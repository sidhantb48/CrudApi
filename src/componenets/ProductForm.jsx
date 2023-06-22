import React, { useState } from "react";
import axios from "axios";

const ProductForm = ({ fetchProducts }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://icreatewebtech.com/category_apis/product_insert.php",
        {
          product_name: productName,
          price: price,
          status: "1",
        }
      );
      setProductName("");
      setPrice("");
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
