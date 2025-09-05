import { useInView } from "react-intersection-observer";
import { Suspense, lazy } from "react";
import ErrorBoundary from "./ErrorHndlers/ErrorBoundary";

export default function LazyWrapper({ importFunc, fallback = null, children }) {
  const LazyComponent = lazy(importFunc);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <div ref={ref}>
      {inView && (
        <ErrorBoundary>
          <Suspense
            fallback={
              fallback || <div style={{ minHeight: 300 }}>در حال بارگذاری...</div>
            }
          >
            {children ? children(LazyComponent) : <LazyComponent />}
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
}
