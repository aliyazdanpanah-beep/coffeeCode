// component/updateCategory/updateCategory.tsx
"use client";

import { useState } from "react";

// ========== Type Definitions ==========
interface ICategory {
  id: number;
  title: string;
  img: string;
}

interface ApiResponse {
  message?: string;
  detail?: string;
}

interface CategoryRequest {
  title: string;
  img: string;
}

// ========== Component ==========
const UpdateCategory = () => {
  const [categoryId, setCategoryId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  // Fetch category data by ID
  const fetchCategoryById = async (): Promise<void> => {
    const idNum = parseInt(categoryId);
    
    if (!categoryId || isNaN(idNum) || idNum <= 0) {
      setError("Please enter a valid category ID");
      return;
    }

    setLoading(true);
    setError("");
    setShowForm(false);

    try {
      const response = await fetch(`http://127.0.0.1:8000/categorys`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const categories: ICategory[] = await response.json();
      console.log("All categories:", categories);

      const category: ICategory | undefined = categories.find((c: ICategory) => c.id === idNum);

      if (!category) {
        setError(`Category with ID: ${categoryId} not found`);
        setShowForm(false);
        return;
      }

      setTitle(category.title);
      setImg(category.img);
      setShowForm(true);
      setError("");
    } catch (error: unknown) {
      console.error("Error:", error);
      if (error instanceof Error) {
        setError(error.message || "An error occurred");
      } else {
        setError("An unknown error occurred");
      }
      setShowForm(false);
    } finally {
      setLoading(false);
    }
  };

  const UpdateCategoryById = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    const idNum = parseInt(categoryId);
    
    if (isNaN(idNum) || idNum <= 0) {
      setError("Invalid category ID");
      setLoading(false);
      return;
    }

    if (!title.trim()) {
      setError("Title is required");
      setLoading(false);
      return;
    }

    if (!img.trim()) {
      setError("Image URL is required");
      setLoading(false);
      return;
    }

    const categoryRequest: CategoryRequest = {
      title: title,
      img: img,
    };

    console.log("Updating category with data:", categoryRequest);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/update/categorys/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoryRequest),
        }
      );

      console.log("Response status:", response.status);

      if (response.status === 404) {
        throw new Error(`Category with ID: ${categoryId} not found`);
      }

      if (!response.ok) {
        let errorData: ApiResponse;
        try {
          errorData = await response.json();
        } catch {
          errorData = {};
        }
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();
      console.log("Update result:", result);

      setSuccessMessage(`Category ID: ${categoryId} updated successfully`);

      setTimeout(() => {
        setSuccessMessage("");
        setShowForm(false);
        setCategoryId("");
        setTitle("");
        setImg("");
      }, 2000);
    } catch (error: unknown) {
      console.error("Error:", error);
      if (error instanceof Error) {
        setError(error.message || "An error occurred");
      } else {
        setError("An unknown error occurred");
      }

      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetchCategoryById();
  };

  const resetForm = (): void => {
    setCategoryId("");
    setTitle("");
    setImg("");
    setShowForm(false);
    setError("");
    setSuccessMessage("");
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <h2 className="text-2xl font-light text-center mb-8 text-gray-900">
        Update Category
      </h2>

      {/* Search Category ID */}
      <form onSubmit={handleSearch} className="space-y-5">
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Category ID
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Enter category ID"
              required
              value={categoryId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryId(e.target.value)}
              className="flex-1 px-0 py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none bg-transparent text-gray-900 placeholder:text-gray-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </form>

      {/* Update Form - Show only when category found */}
      {showForm && (
        <form onSubmit={UpdateCategoryById} className="space-y-5 mt-8">
          <div className="mb-2">
            <p className="text-xs text-green-600">
              ✓ Editing Category ID: {categoryId}
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Category title"
              required
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImg(e.target.value)}
              className="w-full px-0 py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none bg-transparent text-gray-900 placeholder:text-gray-400"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Updating..." : "Update Category"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-500 text-white text-sm font-medium hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Message Box */}
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

export default UpdateCategory;