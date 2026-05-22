"use client";

import { useState } from "react";

// ========== Type Definitions ==========
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface ApiResponse {
  message?: string;
  detail?: string;
}

// ========== Component ==========
const UpdateProduct = () => {
  // State with proper types
  const [productId, setProductId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [productNotFound, setProductNotFound] = useState<boolean>(false);

  // Fetch product data by ID
  const fetchProductById = async (): Promise<void> => {
    const idNum = parseInt(productId);
    
    if (!productId || isNaN(idNum) || idNum <= 0) {
      setError("Please enter a valid product ID");
      return;
    }

    setLoading(true);
    setError("");
    setProductNotFound(false);

    try {
      const response = await fetch(`http://127.0.0.1:8000/product`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const products: Product[] = await response.json();
      const product: Product | undefined = products.find((p: Product) => p.id === idNum);

      if (!product) {
        setProductNotFound(true);
        setError(`Product with ID: ${productId} not found`);
        setShowForm(false);
        return;
      }

      setName(product.name);
      setCategory(product.category);
      setPrice(product.price.toString());
      setImg(product.img);
      setShowForm(true);
      setError("");
    } catch (error: unknown) {
      console.error("Error:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      setShowForm(false);
    } finally {
      setLoading(false);
    }
  };

  const UpdateProductById = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    const idNum = parseInt(productId);
    const priceNum = parseInt(price);

    if (isNaN(idNum) || idNum <= 0) {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    if (isNaN(priceNum) || priceNum <= 0) {
      setError("Please enter a valid price");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/update/product/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            category: category,
            price: priceNum,
            img: img,
          }),
        }
      );

      if (response.status === 404) {
        throw new Error(`Product with ID: ${productId} not found`);
      }

      if (!response.ok) {
        const errorData: ApiResponse = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      setSuccessMessage(`Product ID: ${productId} updated successfully`);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error: unknown) {
      console.error("Error:", error);
      if (error instanceof Error) {
        setError(error.message);
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
    fetchProductById();
  };

  const resetForm = (): void => {
    setProductId("");
    setName("");
    setCategory("");
    setPrice("");
    setImg("");
    setShowForm(false);
    setError("");
    setSuccessMessage("");
    setProductNotFound(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <h2 className="text-2xl font-light text-center mb-8 text-gray-900">
        Update Product
      </h2>

      {/* Search Product ID */}
      <form onSubmit={handleSearch} className="space-y-5">
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Product ID
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Enter product ID"
              required
              value={productId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductId(e.target.value)}
              className="flex-1 px-0 py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none bg-transparent text-gray-900 placeholder:text-gray-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </form>

      {/* Update Form - Show only when product found */}
      {showForm && (
        <form onSubmit={UpdateProductById} className="space-y-5 mt-8">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Product name"
              required
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className="w-full px-0 py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none bg-transparent text-gray-900 placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Category
            </label>
            <input
              type="text"
              placeholder="Category"
              required
              value={category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
              className="w-full px-0 py-2 border-b border-gray-300 focus:border-gray-900 focus:outline-none bg-transparent text-gray-900 placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Price
            </label>
            <input
              type="number"
              placeholder="0.00"
              required
              value={price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
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
              {loading ? "Updating..." : "Update Product"}
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

export default UpdateProduct;