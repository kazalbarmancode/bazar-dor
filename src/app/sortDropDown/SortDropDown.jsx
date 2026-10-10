"use client";
import { useRouter, useSearchParams } from "next/navigation";

 const SortDropDown =({ currentSort }) =>{
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 font-medium">সাজান</span>
      <select
        value={currentSort}
        onChange={handleSortChange}
        className="border border-gray-200 rounded-xl px-3 py-1.5 text-xs bg-white text-gray-700 focus:outline-none focus:border-[#05893E] cursor-pointer"
      >
        <option value="default">ডিফল্ট</option>
        <option value="low-to-high">কম দাম থেকে বেশি</option>
        <option value="high-to-low">বেশি দাম থেকে কম</option>
      </select>
    </div>
  );
}
export default SortDropDown;