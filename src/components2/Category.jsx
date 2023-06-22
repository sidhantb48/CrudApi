import React, { useState, useEffect } from "react";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    // Mock implementation for fetching categories
    const mockCategories = ["Electronics", "Clothing", "Books"];
    setCategories(mockCategories);
  };

  const addCategory = (e) => {
    e.preventDefault();

    if (!categoryName || !description) {
      alert("Please fill in all fields");
      return;
    }

    // Mock implementation for adding a category
    setCategories((prevCategories) => [...prevCategories, categoryName]);

    setCategoryName("");
    setDescription("");
    console.log("Category added successfully");
  };

  const deleteCategory = (categoryName) => {
    // Mock implementation for deleting a category
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category !== categoryName)
    );

    console.log("Category deleted successfully");
  };

  return (
    <div>
      <h2>Categories</h2>
      <form onSubmit={addCategory}>
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
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {category}
            <button onClick={() => deleteCategory(category)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
