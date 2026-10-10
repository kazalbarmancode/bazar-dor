"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const NavCategory = () => {
  const pathname = usePathname();
  const currentCategory = pathname.split("/").pop() || "null";
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/categories`,
        );
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex items-center gap-2 sm:gap-3 my-2 py-1 overflow-x-auto no-scrollbar">
      {categories.map((item) => {
        const categorySlug = item.slug || item.id;
        const isActive = currentCategory === categorySlug;

        return (
          <Link
            key={item.id || categorySlug}
            href={`/selectedCategory/${categorySlug}`}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full shrink-0 transition-all cursor-pointer border ${
              isActive
                ? "bg-[#05893E] text-white border-[#05893E] font-semibold shadow-sm"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 font-medium"
            }`}
          >
            {item.iconUrl && (
              <Image
                src={item.iconUrl}
                alt={item.nameBn || "Category"}
                width={16}
                height={16}
                className={`w-4 h-4 object-contain ${
                  isActive ? "brightness-0 invert" : ""
                }`}
              />
            )}
            <span className="text-xs sm:text-sm whitespace-nowrap">
              {item.nameBn}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavCategory;
