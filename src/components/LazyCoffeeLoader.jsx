import { lazy, Suspense } from "react";

const CoffeeLoader = lazy(() => import("./CoffeeLoader"));

export default function LazyCoffeeLoader() {
  return (
    <Suspense fallback={<div></div>}>
      <CoffeeLoader/>
    </Suspense>
  );
}
