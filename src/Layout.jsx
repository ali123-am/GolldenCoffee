import { Outlet, useLocation } from "react-router-dom";
import UseNavbar from "./components/Header/UseNavbar";
import Footer from "./components/Footer";

export default function Layout() {
  const location = useLocation();
  const url = location.pathname;

  return (
    <div className="flex flex-col min-h-screen">
      <UseNavbar />

      <main className="flex-1">
        <Outlet /> {/* اینجا صفحات داخلی رندر می‌شن */}
      </main>

      {!url.startsWith("/product/") && <Footer />}
    </div>
  );
}
