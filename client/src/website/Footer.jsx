import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-[#f6f1e9] text-gray-700 mt-24">
      {/* Decorative texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <h3 className="text-2xl font-semibold text-green-800">
              Wellviva Organics
            </h3>
            <p className="italic text-sm text-green-700 mt-1">
              Live Well. Naturally.
            </p>

            <p className="mt-4 text-sm leading-relaxed">
              At Wellviva Organics, we create high-quality herbal, personal care,
              and wellness products inspired by Ayurveda and supported by modern
              science. Our mission is to promote natural living while empowering
              individuals with meaningful business opportunities.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold text-lg text-gray-800 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Home</li>
              <li>About Us</li>
              <li>Products</li>
              <li>Shop</li>
              <li>Become a Partner</li>
              <li>Business Plan</li>
              <li>Blog</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* POLICIES */}
          <div>
            <h4 className="font-semibold text-lg text-gray-800 mb-4">
              Policies
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Refund & Cancellation</li>
              <li>Shipping Policy</li>
              <li>Disclaimer</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold text-lg text-gray-800 mb-4">
              Contact Information
            </h4>

            <div className="space-y-3 text-sm">
              <p className="flex gap-2">
                <FaMapMarkerAlt className="mt-1 text-green-700" />
                Ground Floor, Plot No. 302, JL No. 98, Bhangar, South 24
                Parganas, West Bengal – 743502, India
              </p>

              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-green-700" />
                +91 82508 94500
              </p>

              <p className="flex items-center gap-2">
                <FaEnvelope className="text-green-700" />
                info@wellvivaorganics.com
              </p>
            </div>

            {/* SOCIAL */}
            <div className="mt-5">
              <p className="text-sm mb-2">Connect With Us</p>
              <div className="flex gap-3">
                <span className="icon"><FaFacebookF /></span>
                <span className="icon"><FaInstagram /></span>
                <span className="icon"><FaWhatsapp /></span>
                <span className="icon"><FaYoutube /></span>
              </div>
            </div>
          </div>
        </div>

        {/* PAYMENT ICONS */}
        <div className="mt-14 flex flex-wrap justify-center gap-6 opacity-80">
          <img src="/payments/visa.png" className="h-8" />
          <img src="/payments/mastercard.png" className="h-8" />
          <img src="/payments/amex.png" className="h-8" />
          <img src="/payments/rupay.png" className="h-8" />
          <img src="/payments/upi.png" className="h-8" />
        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 border-t border-gray-300 pt-6 text-center text-sm">
          © 2025 Wellviva Organics. All Rights Reserved. Designed for wellness,
          built on trust.
        </div>
      </div>

      {/* ICON STYLE */}
      <style>{`
        .icon {
          background: #e5efe2;
          color: #2f6b3c;
          padding: 10px;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .icon:hover {
          background: #cfe6d8;
          transform: scale(1.1);
        }
      `}</style>
    </footer>
  );
}
