import Image from "next/image";
import NavDate from "./navDate/NavDate";
import NavCetagory from "./navCetagory/NavCetagory";
import { Suspense } from "react";
import MarqueeText from "./Murquree";

const Navber = () => {
  return (
    <div className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-3">
            <div className="bg-[#05893E] rounded-2xl p-2.5 sm:p-3 shrink-0">
              <Image
                src="/logo-icon.png"
                alt="Bazar Dor Logo"
                width={28}
                height={28}
                className="w-6 h-6 sm:w-7 sm:h-7"
              />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">
                বাজার দর
              </h1>
              <NavDate />
            </div>
          </div>

          <div className="flex sm:hidden gap-2">
            <button className="btn btn-ghost btn-sm text-gray-700">
              সাইন ইন
            </button>
            <button className="btn bg-[#05893E] hover:bg-[#047233] text-white btn-sm">
              সাইন আপ
            </button>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <button className="btn btn-ghost text-gray-700 hover:bg-gray-100">
            সাইন ইন
          </button>
          <button className="btn bg-[#05893E] hover:bg-[#047233] text-white px-5">
            সাইন আপ
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 border-t border-gray-100">
        <Suspense fallback={<div className="py-2 text-xs text-gray-400">ক্যাটাগরি লোড হচ্ছে...</div>}>
          <NavCetagory />
        </Suspense>
      </div>

      <div className="w-full">
        <Suspense fallback={<div className="py-2 bg-slate-800 text-xs text-center text-gray-400">বাজার দর লোড হচ্ছে...</div>}>
          <MarqueeText />
        </Suspense>
      </div>
    </div>
  );
};

export default Navber;