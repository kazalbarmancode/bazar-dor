import Image from "next/image";
import NavDate from "./navDate/NavDate";
import NavCetagory from "./navCetagory/NavCetagory";
import { Suspense } from "react";
import MarqueeText from "./Murquree";
import UserMenu from "./userMenu/UserMenu";
import Link from "next/link";


const Navber = () => {
  return (
    <div className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4   items-center justify-between gap-3 ">
        <div className="flex justify-between">
         <Link href={"/"}>
          <div className="flex items-center gap-3">
            <div className="bg-[#6af9a8] rounded-2xl p-2.5 sm:p-3 shrink-0">
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
         </Link>
          <div>
            <UserMenu></UserMenu>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 border-t border-gray-100">
          <Suspense
            fallback={
              <div className="py-2 text-xs text-gray-400">
                ক্যাটাগরি লোড হচ্ছে...
              </div>
            }
          >
            <NavCetagory />
          </Suspense>
        </div>

        <div className="w-full">
          <Suspense
            fallback={
              <div className="py-2 bg-slate-800 text-xs text-center text-gray-400">
                বাজার দর লোড হচ্ছে...
              </div>
            }
          >
            <MarqueeText />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Navber;
