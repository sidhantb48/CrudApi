import React, { useState } from "react";
import axios from "axios";

const CategoryForm = ({ fetchCategories }) => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://icreatewebtech.com/category_apis/category_insert.php",
        {
          category_name: categoryName,
          description: description,
          status: "1",
        }
      );
      setCategoryName("");
      setDescription("");
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default CategoryForm;
