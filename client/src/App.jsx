import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { CartProvider } from "./context/CartContext";

import Navbar from "./website/Navbar";
import Home from "./website/Home";
import Shop from "./website/Shop";
import About from "./website/About";
import Contact from "./website/Contact";
//import Cart from "./website/Cart";
import Footer from "./website/Footer";
import Login from "./auth/Login";
import Profile from "./profile/Profile";
import Cart from "./cart/Cart";
import Checkout from "./cart/Checkout";
import { CartProvider } from "./context/CartContext";
import PaymentSuccess from "./payment/PaymentSuccess";
import PaymentFailed from "./payment/PaymentFailed";
import Register from "./auth/Register";

export default function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar onCartClick={() => setShowCart(true)} />

        <Routes>
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
        </Routes>

        {showCart && <Cart onClose={() => setShowCart(false)} />}
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}
