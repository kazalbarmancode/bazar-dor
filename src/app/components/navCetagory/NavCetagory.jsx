import React from "react";

const NavCategory = async () => {
 const res =await fetch('https://api.abcz.workers.dev/api/bazardor/categories')
 const cetagory =await res.json()
 console.log(cetagory)

  return (
    <div className="flex items-center gap-3 sm:gap-4 my-2 py-1 overflow-x-auto no-scrollbar">
      {cetagory.map((item) => (
        <div
          key={item.id || item.slug}
          className="flex gap-1.5 sm:gap-2 items-center shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
        >
          {item.icon && (
            <span className="text-base sm:text-lg lg:text-xl">
              {item.icon}
            </span>
          )}

          <span className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 whitespace-nowrap">
            {item.nameBn}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NavCategory;