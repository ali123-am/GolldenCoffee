// src/Context/ProductsContext.jsx
import React, { createContext } from "react";
import { useFetchGet } from "../Hooks/useFetchGet";
import LazyCoffeeLoader from "../components/LazyCoffeeLoader";
export const ProductsContext = createContext();

export function ProductsProvider({ children }) {

  const { products, loading, error } =  useFetchGet("Products")
  
  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {loading ? (
        <LazyCoffeeLoader />
      ) : error ? (
        <div className="flex justify-center items-center h-screen text-red-600">
          {error === "NetworkError when attempting to fetch resource." || error==="Failed to fetch" ? (
            <p>
              دریافت داده‌ها با خطا مواجه شد. ممکن است به دلیل قطع بودن اینترنت
              یا در دسترس نبودن سرور باشد. لطفاً چند لحظه بعد دوباره تلاش کنید.
            </p>
          ) : (
            <p>
              مشکلی در بارگذاری سایت رخ داده است. لطفاً صفحه را رفرش کنید یا
              بعداً دوباره امتحان نمایید.
            </p>
          )}
        </div>
      ) : (
        children
      )}
    </ProductsContext.Provider>
  );
}
