export const instant = false;
import SortDropDown from "../../sortDropDown/SortDropDown";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryPage = async ({ params, searchParams }) => {
  const { selectId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const sortBy = resolvedSearchParams.sort || "default";

  const catRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`, {
    next: { revalidate: 60 },
  });
  const categories = await catRes.json();

  const prodRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products?category=${selectId}`,
    { next: { revalidate: 60 } },
  );
  const products = await prodRes.json();

  const activeCategory =
    categories.find((cat) => (cat.slug || cat.id) === selectId) ||
    categories[0];

  let sortedProducts = [...(products || [])];
  if (sortBy === "low-to-high") {
    sortedProducts.sort((a, b) => Number(a.today) - Number(b.today));
  } else if (sortBy === "high-to-low") {
    sortedProducts.sort((a, b) => Number(b.today) - Number(a.today));
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
            {activeCategory?.iconUrl ? (
              <Image
                src={activeCategory.iconUrl}
                alt={activeCategory.nameBn || "Category"}
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <span className="text-2xl">{activeCategory?.icon || "🍚"}</span>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {activeCategory?.nameBn || selectId}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {sortedProducts?.length || 0} টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <div>
          <SortDropDown currentSort={sortBy} />
        </div>
      </div>
      <p className="text-xs mx-1 text-gray-500">
        মোট {sortedProducts?.length || 0} টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedProducts && sortedProducts.length > 0 ? (
          sortedProducts.map((product) => {
            const isUp =
              product.change?.dir === "up" || product.change?.dir === "▲";
            const isDown =
              product.change?.dir === "down" || product.change?.dir === "▼";

            return (
              <div
                key={product.id}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-lg shrink-0 overflow-hidden">
                    {product.image && product.image.startsWith("http") ? (
                      <Image
                        src={product.image}
                        alt={product.nameBn || "product"}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    ) : (
                      <span>{product.image || "🍚"}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">
                      {product.nameBn || product.title}
                    </h3>
                    <p className="text-xs text-gray-400">প্রতি কেজি</p>
                  </div>
                </div>
                <Link href={`/detailsPage/${product._id || product.id}`}>
                  <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                    <div>
                      <p className="text-[11px] text-gray-400">আজকের দাম</p>
                      <p className="font-bold text-base text-gray-900">
                        {product.today} টাকা
                      </p>
                    </div>

                    {product.change && (
                      <div
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          isUp
                            ? "bg-red-50 text-red-600"
                            : isDown
                              ? "bg-green-50 text-green-600"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
                        <span>{product.change.pct || 0}%</span>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500 col-span-full py-10 text-center">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </div>
    </main>
  );
};
export default CategoryPage;
