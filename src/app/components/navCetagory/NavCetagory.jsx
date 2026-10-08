import React from "react";

const NavCategory = async () => {
  let categories = [];

  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/categories",
      {
        next: { revalidate: 3600 },
      },
    );
    categories = await res.json();
  } catch (error) {
    console.error("Categories fetch error:", error);
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3 my-2 py-1">
      {categories.map((item) => (
        <p
          key={item.id || item._id}
          className="flex gap-2 items-center"
        >
          <span className="w-2.5 h-2.5 md:w-4 md:h-4 lg:w-6 lg:h-6">{item.icon || item.categoryIcon}</span>
          <span className="text-[8px] md:text-[20px] lg:text-2xl">{item.nameBn}</span>
        </p>
      ))}
    </div>
  );
};

export default NavCategory;
