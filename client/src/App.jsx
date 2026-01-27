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
import Nominee from "./mlm/profile/Nominee";
import BankDetails from "./mlm/profile/BankDetails";
import KycDetails from "./mlm/profile/KycDetails";
import ChangePassword from "./mlm/profile/ChangePassword";
import ChangeAccountPassword from "./mlm/profile/ChangeAccountPassword";
import IdCard from "./mlm/profile/IdCard";
import WelcomeLetter from "./mlm/documents/WelcomeLetter";
import TaxInvoice from "./mlm/documents/TaxInvoice";
import FileDownloads from "./mlm/documents/FileDownloads";
import MyDirects from "./mlm/genealogy/MyDirects";

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
            <Route path="profile/nominee" element={<Nominee />} />
            <Route path="profile/bank" element={<BankDetails />} />
            <Route path="profile/kyc" element={<KycDetails />} />
            <Route path="profile/change-password" element={<ChangePassword />} />
            <Route path="profile/change-account-password" element={<ChangeAccountPassword />}/>
            <Route path="profile/id-card" element={<IdCard />} />
            <Route path="documents/welcome-letter" element={<WelcomeLetter />} />
            <Route path="documents/tax-invoice" element={<TaxInvoice />}/>
           <Route path="documents/files" element={<FileDownloads />}/>
           <Route path="genealogy/my-directs" element={<MyDirects />} />



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
