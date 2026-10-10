"use client";

import {  useRouter } from "next/navigation";
import Link from "next/link";
import { signUp, signIn, authClient } from "../../../lib/auth-client";
import { FaGithub } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";

const SignUpPage = () => {
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    if (user.password !== user.confirmPassword) {
      alert("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    try {
      const { data, error } = await signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.imageUrl,
      });

      if (data) {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! সাইন ইন করুন।");
        router.push("/");
      }

      if (error) {
        console.error("Sign up error:", error);
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে!");
      }
    } catch (err) {
      console.error(err);
      toast.error("একটি সমস্যা দেখা দিয়েছে! আবার চেষ্টা করুন।");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      toast.info("গুগল দিয়ে সাইন ইন রিডাইরেক্ট করা হচ্ছে...");
    } catch (error) {
      console.error("Google authentication error:", error);
      toast.error("গুগল দিয়ে সাইন ইন করতে সমস্যা হয়েছে!");
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
      toast.info("গিটহাব দিয়ে সাইন ইন রিডাইরেক্ট করা হচ্ছে...");
    } catch (error) {
      console.error("GitHub authentication error:", error);
      toast.error("গিটহাব দিয়ে সাইন ইন করতে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F5F0] flex flex-col items-center justify-center py-5  p-4">
      <div className="w-full max-w-md flex flex-col items-center my-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-base-content mb-1 text-center">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-sm text-base-content/70 mb-6 text-center">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
        <form onSubmit={onSubmit} className="w-full" autoComplete="off">
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
            <div className="flex gap-3 ">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="btn btn-outline text-[10px] rounded-xl flex items-center justify-center gap-2 border-base-300 hover:bg-base-200 text-base-content"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Google দিয়ে সাইন ইন করুন
              </button>
              <button
                onClick={handleGithubSignIn}
                type="button"
                className="btn btn-outline text-[10px] rounded-xl flex items-center justify-center gap-2 border-base-300 hover:bg-base-200 text-base-content"
              >
                <span className="text-2xl">
                  <FaGithub />
                </span>
                Github দিয়ে সাইন ইন করুন
              </button>
            </div>
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
