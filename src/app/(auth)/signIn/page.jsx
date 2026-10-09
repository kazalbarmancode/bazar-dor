"use client";

import { redirect } from "next/navigation";
import { signIn } from "../../../lib/auth-client";
import Link from "next/link";

const SignInPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());
    const { data, error } = await signIn.email({
      email: user.email,
      password: user.password,
      rememberMe: true,
    });
    if (data) {
      console.log("Sign up successful:", data);
      redirect("/");
    }

    if (error) {
      console.error("Sign up error:", error);
      alert(error.message || "সাইন আপ করতে সমস্যা হয়েছে");
    }
  };
  return (
    <div className="min-h-screen bg-[#F0F5F0] flex flex-col items-center justify-center  my-6 p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-base-content mb-1 text-center">
          অ্যাকাউন্টে সাইন ইন করুন
        </h1>
        <p className="text-sm text-base-content/70 mb-6 text-center">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।{" "}
        </p>

        <form onSubmit={onSubmit} className="w-full">
          <fieldset className="fieldset bg-base-100 border border-base-200 rounded-2xl w-full py-5 px-5  shadow-sm flex flex-col gap-3">
            <div>
              <label className="label text-sm font-medium text-base-content/80 mb-1">
                ইমেইল
              </label>
              <input
                type="email"
                className="input input-bordered w-full rounded-xl focus:outline-none focus:border-[#05893E]"
                placeholder="you@example.com"
                required
                name="email"
              />
            </div>

            <div>
              <label className="label text-sm font-medium text-base-content/80 mb-1">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                className="input input-bordered w-full rounded-xl focus:outline-none focus:border-[#05893E]"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                required
                name="password"
              />
            </div>

            <button
              type="submit"
              className="btn bg-[#05893E] hover:bg-[#047233] text-white w-full rounded-xl mt-3 border-none font-semibold text-base"
            >
              সাইন ইন করুন
            </button>
          </fieldset>
        </form>

        <p className="text-sm text-base-content/70 mt-6 mb-8">
          অ্যাকাউন্ট নেই?
          <Link
            href="/signUp"
            className="text-[#05893E] font-medium hover:underline"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>
        <Link
          href="/"
          className="text-xs text-base-content/60 hover:text-base-content hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
