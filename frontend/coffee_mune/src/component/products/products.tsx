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

const Products = ({ products, isLoading }: ProductsProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white py-14 text-center">
        <p className="text-sm text-gray-400">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((item) => (
        <div
          key={item.id}
          className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-lg"
        >
          {/* Image */}

          <div className="relative h-32 w-full overflow-hidden bg-gray-100 sm:h-40 md:h-44">
            <img
              src={item.img}
              alt={item.name}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>


          {/* Content */}
          <div className="space-y-2 p-3 sm:p-4">
            {/* Category */}
            <p className="truncate text-[10px] uppercase tracking-[0.15em] text-gray-400 sm:text-xs">
              {item.category}
            </p>

            {/* Name */}
            <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 sm:text-base">
              {item.name}
            </h3>

            {/* Bottom */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-bold text-black sm:text-base">
                ${formatPrice(item.price)}
              </span>

              <button className="rounded-lg bg-black px-3 py-1.5 text-[11px] font-medium text-white transition-all duration-200 hover:bg-gray-800 sm:px-4 sm:py-2 sm:text-sm">
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
