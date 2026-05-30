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
  const allCategories = [{ id: 0, title: "all", img: "" }, ...categories];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center gap-3 py-8">
        <div className="w-6 h-6 border-2 border-amber-700 border-t-transparent rounded-full animate-spin" />
        <span className="text-stone-500">Loading categories...</span>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="flex flex-wrap justify-center gap-3">
        {allCategories.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectCategory(item.title)}
            className={`
              px-5 py-2.5
              rounded-full
              text-sm
              font-medium
              transition-colors
              ${
                selectedCategory === item.title
                  ? "bg-amber-800 text-white"
                  : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
              }
            `}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;