import React from "react";

const NavCategory = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );
  const cetagory = await res.json();

  return (
    <div className="flex items-center gap-5 md:gap-8 my-2 py-1 overflow-x-auto no-scrollbar">
      {cetagory.map((item) => (
        <div
          key={item.id || item.slug}
          className="flex  items-center shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-xs sm:text-sm lg:text-base font-bold text-gray-700 whitespace-nowrap">
            {item.nameBn}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NavCategory;
