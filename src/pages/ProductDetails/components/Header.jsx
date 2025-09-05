import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useContextSelector } from "use-context-selector";
import {
  AddToBasketContext,
  BasketContext,
} from "./../../../Context/BasketContext";
import CartQuantityControl from "../../../components/CartQuantityControl";
import { Link } from "react-router-dom";
import LoaderDotsBetter from "../../../components/LoaderDotsBetter";

export default function Header({ product }) {
  const basketData = useContextSelector(BasketContext, (c) => c.basketData);
  // const {mutate:addToBasket,addLoading:} = useContextSelector(AddToBasketContext, (ctx) => ctx);
  const { mutate: addToBasket, loadingProducts: addLoading } =
    useContextSelector(AddToBasketContext, (ctx) => ctx);
  const infoProduct = basketData.find((p) => p.id === product?.id);
  const quantity = infoProduct ? infoProduct.count : null;
  const isLoadingThisProduct = addLoading[product.id];
  return (
    <main className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 p-6">
      {/* Image */}
      <div className="bg-white dark:bg-zinc-700 rounded-2xl shadow-md p-6 flex items-center justify-center">
        <img
          src={product?.img}
          alt={product?.productTitle || "محصول"}
          className="w-80 h-80 object-contain"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product?.productTitle}</h1>

        <span className="text-sm text-zinc-800 dark:text-gray-400">
          (۴۲ نظر)
        </span>

        <p className="text-zinc-800 dark:text-gray-400 leading-relaxed">
          این قهوه ترکیبی متعادل از دانه‌های عربیکا و روبوستا است که طعمی قوی و
          عطری دلپذیر دارد. مناسب برای تهیه اسپرسو در دستگاه‌های خانگی و صنعتی.
        </p>

        {/* Price */}
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-amber-600 dark:text-teal-500">
            {(product?.price - product?.offer).toLocaleString("en-US")} تومان
          </span>
          {product?.offer ? (
            <span className="line-through text-gray-400">
              {product?.price.toLocaleString("en-US")} تومان
            </span>
          ) : null}
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2 font-Dana">
          {product?.count > 0 ? (
            <span className="text-green-600 dark:text-emerald-500 text-lg flex gap-2 items-center">
              <CheckCircleIcon className="w-6 h-6" />
              موجود در انبار | ارسال سریع
            </span>
          ) : (
            <span className="text-red-400 font-semibold text-xl flex gap-2 items-center bg-red-300/20 py-3 px-8 rounded-xl">
              <InformationCircleIcon className="w-6 h-6" />
              فعلاً موجود نیست
            </span>
          )}
        </div>

        {/* Basket controls */}
        {product?.count > 0 &&
          (quantity ? (
            <div className="flex justify-between items-center">
              <CartQuantityControl product={product} />
              <Link
                to={"/Cart"}
                className="bg-amber-600 dark:bg-teal-500 text-white w-40 h-13.5 flex justify-center items-center
               rounded-xl text-lg "
              >
                سبد خرید
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => addToBasket(product?.id)}
                className="flex-1 bg-amber-600 text-white py-3 rounded-xl shadow-md
                 hover:bg-amber-700 cursor-pointer flex justify-center items-center"
              >
                {isLoadingThisProduct ? <LoaderDotsBetter color="white" /> : "افزودن به سبد"}
              </button>
              <button className="flex-1 border border-amber-600 text-amber-600 py-3 rounded-xl hover:bg-amber-50">
                خرید سریع
              </button>
            </div>
          ))}
      </div>
    </main>
  );
}
