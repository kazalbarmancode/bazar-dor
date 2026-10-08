import React from "react";

const ProductCard = ({ allProducts }) => {
  console.log(allProducts);
  const { categoryNameBn,categoryIcon, unit, today, change } = allProducts || {};

  const isUp = change?.dir === "up";

  const getUnitBn = (u) => {
    if (u === "kg") return "প্রতি কেজি";
    if (u === "dozen") return "প্রতি ডজন";
    if (u === "pcs" || u === "piece") return "প্রতি পিস";
    return `প্রতি ${u}`;
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="font-medium text-gray-800 text-base">
         {categoryIcon} {categoryNameBn}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">{getUnitBn(unit)}</p>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <span className="text-[10px] text-gray-400 block mb-0.5">
            আজকের দাম
          </span>
          <span className="text-base font-bold text-gray-900">
            {today} টাকা
          </span>
        </div>

        {change && (
          <div
            className={`flex items-center text-xs font-semibold ${
              isUp ? "text-red-500" : "text-emerald-500"
            }`}
          >
            <span className="mr-0.5">{isUp ? "▲" : "▼"}</span>
            <span>{change.pct}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
