export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white">Wellviva</h3>
          <p className="mt-3 text-sm">
            Premium herbal and wellness products for a healthier lifestyle.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>Shop</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">Contact</h4>
          <p className="text-sm">support@wellviva.com</p>
          <p className="text-sm">+91 90000 00000</p>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-4 text-sm">
        © 2025 Wellviva. All rights reserved.
      </div>
    </footer>
  );
}
