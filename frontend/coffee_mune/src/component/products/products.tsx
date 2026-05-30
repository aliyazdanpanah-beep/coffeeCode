"use client";

interface Product {
  id: number;
  img: string;
  category: string;
  name: string;
  price: number;
}

interface ProductsProps {
  products: Product[];
  isLoading: boolean;
}

const categoryIcons: Record<string, string> = {
  coffee: "☕",
  pizza: "🍕",
  drink: "🥤",
  "fast food": "🍔",
};

const Products = ({ products, isLoading }: ProductsProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center gap-3 py-16">
        <div className="w-8 h-8 border-2 border-amber-700 border-t-transparent rounded-full animate-spin" />
        <span className="text-stone-500">Loading menu...</span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white border border-stone-200 rounded-2xl py-16 text-center">
        <p className="text-stone-500">No items found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((item) => (
        <div
          key={item.id}
          className="
            bg-white
            rounded-2xl
            border
            border-stone-200
            overflow-hidden
            shadow-sm
            hover:shadow-md
            transition-shadow
            duration-200
          "
        >
          {/* Image / Placeholder */}
          <div className="h-44 bg-linear-to-br from-amber-50 to-stone-100 flex items-center justify-center">
            {item.img ? (
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-5xl">
                {categoryIcons[item.category.toLowerCase()] || "☕"}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-base font-semibold text-stone-800 truncate">
              {item.name}
            </h3>

            <span
              className="
                inline-block
                mt-3
                px-3
                py-1
                rounded-full
                bg-amber-50
                text-amber-800
                text-xs
                font-medium
              "
            >
              {item.category}
            </span>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-lg font-bold text-amber-800">
                ${formatPrice(item.price)}
              </span>

              <button
                className="
                  px-4
                  py-2
                  rounded-lg
                  bg-stone-800
                  text-white
                  text-sm
                  font-medium
                  hover:bg-stone-700
                  transition-colors
                "
              >
                Order
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;