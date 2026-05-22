// components/products/products.tsx

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

// رنگ‌های ثابت برای هر دسته‌بندی
const categoryColors: Record<string, string> = {
  "fast fode": "from-orange-400 to-red-500",
  pizza: "from-yellow-400 to-orange-600",
  coffee: "from-amber-600 to-brown-700",
  drink: "from-cyan-400 to-blue-600",
};

const Products = ({ products, isLoading }: ProductsProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString("fa-IR");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center gap-2 py-16">
        <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
        <p className="text-gray-400">محصولی یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map((item) => {
        // گرفتن رنگ بر اساس دسته‌بندی
        const bgGradient = categoryColors[item.category] || "from-gray-400 to-gray-600";
        
        return (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {/* باکس رنگی به جای عکس */}
            <div className={`h-28 bg-linear-to-br ${bgGradient} flex items-center justify-center`}>
              <span className="text-white/80 text-3xl font-bold">
                {item.name.charAt(0)}
              </span>
            </div>

            {/* محتوا */}
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800 mb-1 truncate">
                {item.name}
              </h3>
              <p className="text-xs text-gray-400 mb-2">{item.category}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-slate-700 font-bold text-sm">
                  {item.price} $
                </span>
                <button className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-3 py-1.5 rounded-md transition-colors">
                  Get
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;