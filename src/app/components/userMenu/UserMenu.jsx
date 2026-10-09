"use client";

import { useSession, signOut } from "../../../lib/auth-client"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import Image from "next/image";

const UserMenu = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
    router.refresh();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <span className="loading loading-spinner loading-xs text-[#05893E]"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Link href={"/signIn"}>
          <button className="btn btn-ghost btn-sm text-gray-700 font-medium">
            সাইন ইন
          </button>
        </Link>
        <Link href={"/signUp"}>
          <button className="btn bg-[#05893E] hover:bg-[#047233] text-white btn-sm rounded-lg border-none px-3">
            সাইন আপ
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
          <Image
            src={user.image || "https://avatar.iran.liara.run/public/boy"}
            alt={user.name || "User"}
            width={10}
            height={10}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-sm font-semibold text-gray-800 hidden md:inline-block">
          {user.name}
        </span>
        <span className="text-xs text-gray-500 hidden md:inline-block">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50">
          <div className="border-b border-gray-100 pb-3 mb-2">
            <h4 className="font-semibold text-gray-900 text-sm">{user.name}</h4>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          <div className="space-y-1">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            ><User/>
              <span>আমার প্রোফাইল</span>
            </Link>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
            >
              <LogOut size={16} className="text-red-600" />
              <span>সাইন আউট</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;