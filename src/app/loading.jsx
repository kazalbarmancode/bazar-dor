export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-gray-500 font-medium">লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...</p>
      </div>
    </div>
  );
}