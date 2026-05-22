"use client";

import { useState } from "react";

const DeleteCategory = () => {
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const DeleteProductById = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/categor/delete/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`,
        );
      }

      setSuccessMessage(`Product ID: ${categoryId} deleted successfully`);
      setCategoryId("");

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
    <div className="max-w-md mx-auto mt-12 px-4">
      <h2 className="text-2xl font-light text-center mb-8 text-gray-900">
        Delete Category
      </h2>

      <form onSubmit={DeleteProductById} className="space-y-5">
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Product ID
          </label>
          <input
            type="number"
            placeholder="Enter product ID"
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-0 py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none bg-transparent text-gray-900 placeholder:text-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Deleting..." : "Delete Category"}
        </button>
      </form>

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
    </div>
  );
};

export default DeleteCategory;
