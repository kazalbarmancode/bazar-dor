"use client";

import Image from "next/image";
import { useSession, signOut, updateUser } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
    if (!isPending && !user) {
      router.push("/signIn");
    }
  }, [user, isPending, router]);

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsUpdating(true);
      await updateUser({
        name: name,
      });
      alert("নাম সফলভাবে আপডেট করা হয়েছে!");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("নাম আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#05893E]"></span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F5F7F6] py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
          <p className="text-xs text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-200">
              <Image
                src={"https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" }
                width={30}
                height={30}
                alt={user?.name || "User"}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"

              />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">{user.name}</h2>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
          >
            <span>←</span> সাইন আউট
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h3 className="text-sm font-bold text-gray-900">তথ্য</h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">নাম</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#05893E] focus:bg-white transition-colors"
                placeholder="আপনার নাম লিখুন"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-[#05893E] hover:bg-[#047233] text-white text-sm font-medium py-3 rounded-xl transition-colors disabled:opacity-50"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
