export const instant = false;

import Image from "next/image";
import Link from "next/link";
import { VscChevronRightCompact } from "react-icons/vsc";

const getUnitBn = (u) => {
  if (u === "kg") return "কেজি";
  if (u === "dozen") return "ডজন";
  if (u === "pcs" || u === "piece") return "পিস";
  return u || "কেজি";
};

const getProductDetails = async (id) => {
  try {
    if (!id) return null;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const allRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, {
        next: { revalidate: 60 },
      });
      if (allRes.ok) {
        const allProducts = await allRes.json();
        const found = allProducts.find(
          (p) => String(p.id) === String(id) || p.slug === id
        );
        if (found) return found;
      }
      return null; // এরর থ্রো না করে নাল রিটার্ন করা হলো যাতে পেজ ক্র্যাশ না করে
    }

    return await res.json();
  } catch (error) {
    console.error("Error in getProductDetails:", error.message);
    return null;
  }
};

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  const product = await getProductDetails(id);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">পণ্যটি পাওয়া যায়নি</h1>
        <p className="text-gray-500 mb-6">আপনি যে পণ্যটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা বিদ্যমান নেই।</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const {
    nameBn,
    categoryNameBn,
    unit,
    image,
    today,
    yesterday,
    change,
    markets = [],
  } = product;

  const isUp = change?.dir === "up" || change?.dir === "▲";
  const diffPrice = Math.abs(today - (yesterday || today));

  let minPrice = today;
  let maxPrice = today;
  let minMarketName = "";
  let maxMarketName = "";
  let totalAvgSum = 0;

  if (markets.length > 0) {
    minPrice = markets[0].min;
    maxPrice = markets[0].max;
    minMarketName = markets[0].market;
    maxMarketName = markets[0].market;

    markets.forEach((m) => {
      if (m.min < minPrice) {
        minPrice = m.min;
        minMarketName = m.market;
      }
      if (m.max > maxPrice) {
        maxPrice = m.max;
        maxMarketName = m.market;
      }
      totalAvgSum += (m.min + m.max) / 2;
    });
  }

  const avgPrice = markets.length > 0 ? (totalAvgSum / markets.length).toFixed(1) : today;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 font-sans text-gray-800">
      <div className="text-xs text-gray-500 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:underline text-gray-600">
          হোম
        </Link>
        <VscChevronRightCompact className="text-base text-gray-400" />
        <span className="text-gray-600">{categoryNameBn || "ক্যাটাগরি"}</span>
        <VscChevronRightCompact className="text-base text-gray-400" />
        <span className="text-gray-900 font-medium">{nameBn}</span>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 flex items-center justify-between shadow-sm flex-wrap gap-4">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shrink-0 overflow-hidden">
            {image && image.startsWith("http") ? (
              <Image src={image} alt={nameBn || "product"} width={40} height={40} className="object-contain" />
            ) : (
              <span>{image || "🍚"}</span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{nameBn}</h1>
            <p className="text-xs text-gray-500 mt-1">
              প্রতি {getUnitBn(unit)}
            </p>
            <p className="text-xs text-gray-500 mt-1 font-normal">
              গতকালকের তুলনায় আজ দাম {isUp ? "বেড়েছে" : "কমেছে"}: <span className="font-semibold">{diffPrice} টাকা</span>
            </p>
          </div>
        </div>

        <div className="bg-gray-50/80 border border-gray-100 px-6 py-3 rounded-xl text-right">
          <p className="text-[11px] text-gray-400 mb-0.5">আজকের দাম</p>
          <p className="text-2xl font-bold text-gray-900">
            {today} <span className="text-sm font-normal text-gray-600">টাকা/{getUnitBn(unit)}</span>
          </p>
          {change && (
            <p className={`text-xs font-semibold mt-0.5 flex items-center justify-end gap-0.5 ${isUp ? "text-red-500" : "text-emerald-600"}`}>
              <span>{isUp ? "▲" : "▼"}</span>
              <span>{Math.abs(change.pct || 0)}%</span>
            </p>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-base font-bold text-gray-900 mb-4">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <p className="text-xs text-gray-400 mb-1">সর্বনিম্ন দর</p>
            <p className="text-xl font-bold text-emerald-600 mb-1">
              {minPrice} টাকা
            </p>
            <p className="text-xs text-gray-400">সবচেয়ে কম {minMarketName || "বাজারে"}</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <p className="text-xs text-gray-400 mb-1">সর্বাধিক দাম</p>
            <p className="text-xl font-bold text-red-500 mb-1">
              {maxPrice} টাকা
            </p>
            <p className="text-xs text-gray-400">সবচেয়ে বেশি {maxMarketName || "বাজারে"}</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <p className="text-xs text-gray-400 mb-1">গড় দাম</p>
            <p className="text-xl font-bold text-emerald-600 mb-1">
              {avgPrice} টাকা
            </p>
            <p className="text-xs text-gray-400">প্রতি {getUnitBn(unit)} এর হিসাব</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-4">
            বাজারভিত্তিক আজকের দাম
          </h2>
        </div>
        <div className="overflow-x-auto border border-gray-100 bg-white shadow-sm p-6 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead> 
              <tr className="border-b border-gray-100 text-xs text-black font-semibold">
                <th className="pb-3 font-medium">বাজার</th>
                <th className="pb-3 font-medium">বিভাগ</th>
                <th className="pb-3 font-medium">সর্বনিম্ন</th>
                <th className="pb-3 font-medium">সর্বাধিক</th>
                <th className="pb-3 font-medium text-right pr-2">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs text-gray-700">
              {markets.map((item, index) => {
                const itemAvg = ((item.min + item.max) / 2).toFixed(1);
                return (
                  <tr key={index} className="hover:bg-gray-50/50 transition">
                    <td className="py-3.5 font-medium text-gray-900">{item.market}</td>
                    <td className="py-3.5 text-gray-500">{item.division}</td>
                    <td className="py-3.5">{item.min} টাকা</td>
                    <td className="py-3.5">{item.max} টাকা</td>
                    <td className="py-3.5 font-bold text-gray-900 text-right pr-2">
                      {itemAvg} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;