// app/page.tsx

"use client";

import { useState } from "react";
import { useGetCategory, useGetProduct } from "@/app/api/query/query";
import Category from "@/component/category/category";
import Products from "@/component/products/products";
import Header from "@/component/header/header";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // گرفتن دیتا
  const { data: categoryData, isLoading: categoryLoading } = useGetCategory();
  const { data: productData, isLoading: productLoading } = useGetProduct();

  const categories = categoryData?.data || [];
  const allProducts = productData?.data || [];

  // فیلتر کردن محصولات بر اساس دسته‌بندی
  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter((item) => item.category === selectedCategory);

  return (
    <section className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <Header />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Category Buttons */}
        <Category
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          isLoading={categoryLoading}
        />

        {/* Products Grid */}
        <Products products={filteredProducts} isLoading={productLoading} />
      </main>
    </section>
  );
};

export default Home;
