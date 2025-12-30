import Header from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function WebsiteLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
