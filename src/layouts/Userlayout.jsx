import Header from "../component/Header";
import Footer from "../component/Footer";
import HeroBanner from "../component/HeroBanner";
import { Outlet, useLocation } from "react-router-dom";
import ZaloButton from "../component/ZaloButton";

export default function Userlayout() {

  const location = useLocation();

  // trang KHÔNG cần banner
  const hideBanner =
    location.pathname === "/login";

  return (
    <>
      <Header />

      {!hideBanner && <HeroBanner />}

      <main>
        <Outlet />
      </main>

      <Footer />
      <ZaloButton />
    </>
  );
}