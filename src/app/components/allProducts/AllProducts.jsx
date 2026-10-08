import React from "react";
import ProductCard from "../ProductsCard";

const AllProducts = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );
  const data = await res.json();
  const allProducts = data || [];

  const priceIncreased = allProducts.filter(
    (product) => product.change?.dir === "up"
  );

  const priceDecreased = allProducts.filter(
    (product) => product.change?.dir === "down"
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {priceIncreased.length > 0 && (
        <div>
          <h1 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <span className="text-red-500">▲</span> আজ দাম বেড়েছে
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {priceIncreased.slice(0,6).map((singleCard) => (
              <ProductCard key={singleCard.id} allProducts={singleCard} />
            ))}
          </div>
        </div>
      )}

      {/* 2. আজ দাম কমেছে */}
      {priceDecreased.length > 0 && (
        <div>
          <h1 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <span className="text-green-600">▼</span> আজ দাম কমেছে
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {priceDecreased.slice(0,6).map((singleCard) => (
              <ProductCard key={singleCard.id} allProducts={singleCard} />
            ))}
          </div>
        </div>
      )}

      {/* 3. সব পণ্য */}
      <div>
        <div className="mb-4">
          <h1 className="font-semibold text-lg">সব পণ্য</h1>
          <span className="text-sm text-gray-500">
            মোট {allProducts.length} টি পণ্য দেখানো হচ্ছে
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allProducts.map((singleCard) => (
            <ProductCard key={singleCard.id} allProducts={singleCard} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;