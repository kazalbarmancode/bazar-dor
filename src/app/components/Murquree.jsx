import Marquee from "react-fast-marquee";


const MarqueeText = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const data = await res.json();
  const headLines = data

  return (
   
     <div className="w-full mt-4 sm:mt-2.5 px-2 sm:px-0">
      <div className="max-w-6xl mx-auto flex items-center overflow-hidden">
        <div className="flex-1 overflow-hidden min-w-0 py-1.5 sm:py-2  rounded-lg shadow-sm">
          <Marquee direction="left" speed={45}  gradient={false}>
            {headLines.map((dt) => (
              <div
                key={dt.id || dt._id}
                className="inline-flex items-center mx-2 sm:mx-4 text-xs sm:text-sm font-medium text-white whitespace-nowrap"
              >
                <span className="mr-1">{dt.categoryIcon}</span>
                <span className="font-semibold text-black">{dt.nameBn}:</span>

                <span className="ml-1 sm:ml-1.5 font-bold text-yellow-300">
                  ৳{dt.today}/{dt.unit}
                </span>

                {dt.change && (
                  <span
                    className={`ml-1.5 sm:ml-2 text-[10px] sm:text-xs font-semibold px-1 py-0.5 rounded ${
                      dt.change.dir === "down"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    ({dt.change.dir === "down" ? "↓" : "↑"} {Math.abs(dt.change.pct)}%)
                  </span>
                )}

                <span className="mx-3 sm:mx-6 text-slate-600">•</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default MarqueeText;