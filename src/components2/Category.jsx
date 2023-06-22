import { useState, useEffect } from "react";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();

    if (!categoryName || !description || !status) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (categoryName === "") {
        // Create new category
        const response = await fetch(
          "https://fakestoreapi.com/products/categories",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              category_name: categoryName,
              description: description,
              status: status,
            }),
          }
        );

        setCategoryName("");
        setDescription("");
        setStatus("");

        fetchCategories();
        console.log(response.data);
      } else {
        // Edit existing category
        const response = await fetch(
          `https://fakestoreapi.com/products/categories/${categoryName}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              category_name: categoryName,
              description: description,
              status: status,
            }),
          }
        );

        setCategoryName("");
        setDescription("");
        setStatus("");

        fetchCategories();
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategory = async (categoryName) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/categories/${categoryName}`,
        {
          method: "DELETE",
        }
      );

      fetchCategories();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
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
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
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
