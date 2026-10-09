"use client"

import { redirect } from "next/navigation";
import { signUp } from "../../../lib/auth-client";
import Link from "next/link";

const SignUpPage = () => {

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    if (user.password !== user.confirmPassword) {
      alert("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    const { data, error } = await signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.imageUrl,
    });

    if (data) {
      console.log("Sign up successful:", data);
      redirect("/signIn")
    }

    if (error) {
      console.error("Sign up error:", error);
      alert(error.message || "সাইন আপ করতে সমস্যা হয়েছে");
    }
    };

  return (
    <div  className="min-h-screen bg-[#F0F5F0] flex flex-col items-center justify-center py-5  p-4">
      <div className="w-full max-w-md flex flex-col items-center my-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-base-content mb-1 text-center">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-sm text-base-content/70 mb-6 text-center">
         বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।           
        </p>
        <form onSubmit={onSubmit} className="w-full">
          <fieldset className="fieldset bg-base-100 border border-base-200 rounded-2xl w-full p-6 shadow-sm flex flex-col gap-3">
              <div>
                <label className="label text-sm font-medium text-base-content/80 mb-1">
                  নাম
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:border-[#05893E]"
                  placeholder="Enter Your Name"
                  name="name"
                  required
                />
              </div>

            <div>
              <label className="label text-sm font-medium text-base-content/80 mb-1">
                ইমেইল
              </label>
              <input
                type="email"
                className="input input-bordered w-full rounded-xl focus:outline-none focus:border-[#05893E]"
                placeholder="you@example.com"
                name="email"
                required
              />
            </div>

            <div>
              <label className="label text-sm font-medium text-base-content/80 mb-1">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                className="input input-bordered w-full rounded-xl focus:outline-none focus:border-[#05893E]"
                placeholder="কমপক্ষে ৮ অক্ষর"
                required
                name="password"
              />
                <span className="text-xs text-base-content/60 mt-1 block">
                  কমপক্ষে ৮ অক্ষর
                </span>
            </div>

              <div>
                <label className="label text-sm font-medium text-base-content/80 mb-1">
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:border-[#05893E]"
                  placeholder="আবার লিখুন"
                  required
                  name="confirmPassword"
                />
              </div>

            <button
              type="submit"
              className="btn bg-[#05893E] hover:bg-[#047233] text-white w-full rounded-xl mt-2 border-none font-semibold text-base"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>
          </fieldset>
        </form>
        <p className="text-sm text-base-content/70 mt-6 mb-8">
          অ্যাকাউন্ট আছে?
          <Link
            href={"/signIn"}
            className="text-[#05893E] font-medium hover:underline"
          >
            সাইন ইন করুন
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

export default SignUpPage;