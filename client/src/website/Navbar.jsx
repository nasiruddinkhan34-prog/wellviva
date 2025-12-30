import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";


export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const cartCount = cart.reduce((a, c) => a + c.qty, 0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const goDashboard = () => {
    if (user.role === "admin") navigate("/admin");
    else if (user.role === "mlm_user") navigate("/mlm");
    else navigate("/profile");
  };

  return (
    <nav className="bg-white/90 backdrop-blur border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-extrabold text-teal-700">
        <img
    src="/main_logo.jpeg"
    alt="Wellviva Logo"
   className="h-14 md:h-16 w-auto"
  />
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-8 font-medium text-gray-700">
          <Link className="hover:text-teal-600" to="/">Home</Link>
          <Link className="hover:text-teal-600" to="/shop">Shop</Link>
          <Link className="hover:text-teal-600" to="/about">About Us</Link>
          <Link className="hover:text-teal-600" to="/contact">Contact</Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5 relative">
          {/* ✅ FIXED CART BUTTON */}
          <button
            onClick={() => navigate("/cart")}
            className="relative text-xl hover:text-teal-600"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* AUTH */}
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm font-semibold border border-teal-600 text-teal-600 rounded-full hover:bg-teal-50"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-teal-50 px-3 py-2 rounded-full hover:bg-teal-100"
              >
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                  {user.firstName?.charAt(0) || "U"}
                </div>
                <span className="hidden md:block text-sm font-medium">
                  {user.firstName}
                </span>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border overflow-hidden">
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={goDashboard}
                    className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
