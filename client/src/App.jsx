import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

/* WEBSITE */
import WebsiteLayout from "./website/WebsiteLayout";
import Home from "./website/Home";
import Shop from "./website/Shop";
import About from "./website/About";
import Contact from "./website/Contact";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import Checkout from "./cart/Checkout";
import PaymentSuccess from "./payment/PaymentSuccess";
import PaymentFailed from "./payment/PaymentFailed";
import ProductDetail from "./website/ProductDetail";

/* MLM */
import MlmLayout from "./mlm/MlmLayout";
import MlmDashboard from "./mlm/Dashboard";
import EditProfile from "./mlm/profile/EditProfile";

/* ADMIN */
import AdminLayout from "./admin/AdminLayout";
import AdminRoute from "./AdminRoute";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>

          {/* 🌐 WEBSITE ROUTES */}
          <Route element={<WebsiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Route>

          {/* ✅ MLM ROUTES (LOCKED & CLEAN) */}
          <Route path="/mlm" element={<MlmLayout />}>
            <Route index element={<MlmDashboard />} />
            <Route path="dashboard" element={<MlmDashboard />} />
            <Route path="profile/edit" element={<EditProfile />} />
          </Route>

          {/* 🔐 ADMIN ROUTES */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
