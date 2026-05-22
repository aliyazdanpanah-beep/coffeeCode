// components/category/category.tsx

"use client";

interface CategoryProps {
  categories: { id: number; title: string; img: string }[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  isLoading: boolean;
}

const Category = ({
  categories,
  selectedCategory,
  onSelectCategory,
  isLoading,
}: CategoryProps) => {
  const allCategories = [{ id: 0, title: 'all' }, ...categories];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center gap-2 py-8">
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-500"> Loading ...</span>
      </div>
    );
  }

  return (
    <div className="mb-8">
    
      
      <div className="flex flex-wrap gap-3 justify-start">
        {allCategories.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectCategory(item.title)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 
              ${
                selectedCategory === item.title
                  ? "bg-slate-800 text-white shadow-lg"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-slate-400 hover:bg-gray-50"
              }`}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;