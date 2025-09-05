import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
  lazy,
} from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
const Header = lazy(() => import("./components/Header"));
const Specs = lazy(() => import("./components/Specs"));
const Comments = lazy(() => import("./components/Comments"));
const Questions = lazy(() => import("./components/Questions"));
const ReviewModal = lazy(() => import("./components/ReviewModal"));
const StickyTabs = lazy(() => import("./components/StickyTabs"));
import useScrollSpy from "./../../Hooks/useScrollSpy";
import LazyWrapper from "../../components/LazyWrapper";
const Footer = lazy(() => import("../../components/Footer"));
const RelatedProducts = lazy(() => import("./components/RelatedProducts"));

// Utility برای smooth scroll
const smoothScrollToId = (id, offset = 45) => {
  const el = document.getElementById(id);
  if (!el) return;

  // موقعیت عمودی المنت نسبت به صفحه
  const elementPosition = el.getBoundingClientRect().top + window.scrollY;

  // محاسبه موقعیت با offset
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};
export default function ProductDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const tabIds = useMemo(() => ["specs", "comments", "questions"], []);
  const activeTab = useScrollSpy(tabIds);
  // Fetch product + related
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await axios.get(
        `https://67b48d6b392f4aa94fab58e9.mockapi.io/Products/${id}`
      );
      if (cancelled) return;
      setProduct(res.data);
      setComments([]);
      setQuestions([]);
      setRelatedProducts([]);
    })();
    return () => (cancelled = true);
  }, [id]);

  const handleTabClick = useCallback((id) => {
    smoothScrollToId(id);
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  // Handle hash on mount
  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    if (hash && tabIds.includes(hash)) {
      setTimeout(() => smoothScrollToId(hash), 0);
    }
  }, [location.hash, tabIds]);

  if (!product) return <p className="text-center pt-36">Loading…</p>;

  return (
    <div className="max-h-315 min-h-screen mt-24 font-Dana text-zinc-800 dark:text-white">
      <Suspense fallback={<div>Loading header…</div>}>
        <Header product={product} />
      </Suspense>

      <div id="details-section" className="relative">
        <Suspense fallback={<div>Loading tabs…</div>}>
          <StickyTabs active={activeTab} onClick={handleTabClick} />
        </Suspense>

        <section id="specs" className="max-w-7xl mx-auto p-6 scroll-mt-24">
          <Suspense fallback={<div>Loading specs…</div>}>
            <Specs product={product} />
          </Suspense>
        </section>

        <section id="comments" className="max-w-7xl mx-auto p-6 scroll-mt-24">
          <Suspense fallback={<div>Loading comments…</div>}>
            <Comments
              comments={comments}
              setComments={setComments}
              onOpenModal={() => setShowReviewModal(true)}
            />
          </Suspense>
        </section>

        <section id="questions" className="max-w-7xl mx-auto p-6 scroll-mt-24">
          <Suspense fallback={<div>Loading Q&A…</div>}>
            <Questions questions={questions} setQuestions={setQuestions} />
          </Suspense>
        </section>
      </div>

      <Suspense fallback={<div>Loading related products…</div>}>
        <RelatedProducts products={relatedProducts} />
      </Suspense>

      {/* <Suspense fallback={<div>Loading popular products…</div>}>
        <PopularProducts />
      </Suspense>  */}

      <Suspense fallback={null}>
        <ReviewModal
          open={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          onSubmit={(payload) => {
            const newItem = { id: Date.now(), ...payload };
            setComments((s) => [newItem, ...s]);
          }}
        />
      </Suspense>

      <Footer />
    </div>
  );
}
