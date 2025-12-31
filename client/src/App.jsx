import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import WebsiteLayout from "./website/WebsiteLayout";
import Home from "./website/Home";
import Shop from "./website/Shop";
import About from "./website/About";
import Contact from "./website/Contact";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Profile from "./profile/Profile";
import Cart from "./cart/Cart";
import Checkout from "./cart/Checkout";
import PaymentSuccess from "./payment/PaymentSuccess";
import PaymentFailed from "./payment/PaymentFailed";

import AdminLayout from "./admin/AdminLayout";
import AdminRoutes from "./admin/AdminRoute";

export default function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* 🌐 WEBSITE ROUTES */}
          <Route
            element={<WebsiteLayout onCartClick={() => setShowCart(true)} />}
          >
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
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

        {showCart && <Cart onClose={() => setShowCart(false)} />}
      </BrowserRouter>
    </CartProvider>
  );
}
