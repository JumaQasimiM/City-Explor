import { Outlet } from "react-router-dom";

// components
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

// website layout use this
export function MainLayout() {
  return (
    <>
      <Header />
      {/* main layout */}
      <Outlet />
      <Footer />
    </>
  );
}
