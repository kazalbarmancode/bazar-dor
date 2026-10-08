import { Suspense } from "react";
import AllProducts from "./components/allProducts/AllProducts";
import HeroBanner from "./components/HeroBanner";

export default function Home() {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <Suspense fallback={<div>Loading..</div>}>
        <AllProducts></AllProducts>
      </Suspense>
    </div>
  );
}
