import { Routes, Route } from "react-router-dom";
import Dashboard from "./admin/pages/Dashboard";
// later:
// import Products from "./pages/Products";
// import Orders from "./pages/Orders";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      {/* <Route path="products" element={<Products />} /> */}
      {/* <Route path="orders" element={<Orders />} /> */}
    </Routes>
  );
}
