"use client";

import Header from "@/component/header/header";
import { useState } from "react";
import DeleteCategory from "../deleteCategory/deleteCategory";
import UpdateCategory from "../updateCategory/updateCategory";

const AddCategory = () => {
  const [title, setTitle] = useState("")
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const PostCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/create/category/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          img: img
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      
      setTitle("")
      setImg("");
      setSuccessMessage("Product added successfully");
      
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-20 px-4 mb-20">
        <h2 className="text-2xl font-light text-center mb-8 text-gray-900">
          Add Category
        </h2>
        
        <form onSubmit={PostCategory} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Product name"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-0 py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none bg-transparent text-gray-900 placeholder:text-gray-400"
            />
          </div>

          
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Image URL
            </label>
            <input
              type="text"
              placeholder="https://..."
              required
              value={img}
              onChange={(e) => setImg(e.target.value)}
              className="w-full px-0 py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none bg-transparent text-gray-900 placeholder:text-gray-400"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Sending..." : "Create Category"}
          </button>
        </form>
      </div>

      <DeleteCategory />

      <UpdateCategory />
      
      {successMessage && (
        <div className="fixed bottom-5 right-5 bg-gray-900 text-white text-sm px-4 py-2">
          {successMessage}
        </div>
      )}
      
      {error && (
        <div className="fixed bottom-5 right-5 bg-red-600 text-white text-sm px-4 py-2">
          {error}
        </div>
      )}
    </>
  );
};

export default AddCategory;