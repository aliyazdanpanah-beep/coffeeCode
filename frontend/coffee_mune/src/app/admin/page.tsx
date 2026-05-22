"use client";

import { useState } from "react";
import AddCategory from "@/component/addCategory/addCategory";
import AddProduct from "@/component/addProduct/addProduct";
import Header from "@/component/header/header";

const AdminPanel = () => {
  const [active, setActive] = useState("category");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Desktop Menu */}
      <div className="hidden md:block max-w-4xl mx-auto px-4 mt-10">
        <div className="border-b border-gray-200">
          <div className="flex gap-8">
            <button
              onClick={() => setActive("category")}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                active === "category"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Add Category
            </button>
            <button
              onClick={() => setActive("product")}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                active === "product"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden px-4 mt-5">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200"
        >
          <span className="text-sm font-medium text-gray-900">
            {active === "category" ? "Add Category" : "Add Product"}
          </span>
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute left-4 right-4 mt-1 bg-white border border-gray-200 shadow-lg z-10">
            <button
              onClick={() => {
                setActive("category");
                setIsMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm ${
                active === "category"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Add Category
            </button>
            <button
              onClick={() => {
                setActive("product");
                setIsMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm border-t border-gray-100 ${
                active === "product"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Add Product
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        {active === "category" && <AddCategory />}
        {active === "product" && <AddProduct />}
      </div>
    </div>
  );
};

export default AdminPanel;
