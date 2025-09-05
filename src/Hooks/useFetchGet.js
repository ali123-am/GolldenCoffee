import React from "react";
import { useLocation } from "react-router-dom";
export function useFetchGet(table) {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const location = useLocation();
  const currentPath = location.pathname;

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://67b48d6b392f4aa94fab58e9.mockapi.io/${table}`,
          { signal }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("درخواست کنسل شد");
        } else {
          console.log(err);
          setError(err.message || "خطا در دریافت اطلاعات");
        }
      } finally {
        setLoading(false);
      }
    };

    console.log(currentPath)
    if(currentPath!=='/Auth'){
      fetchData();
    }
    return () => {
      controller.abort();
    };
  }, [table,currentPath]);

  return { products, loading, error };
}
