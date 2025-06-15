// components/Footer.jsx
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 justify-between">
<div className=" grid grid-cols-2">
<div>
          <h4 className="text-lg font-semibold mb-3">Ixlos Magnit</h4>
          <p className="text-sm text-gray-400">
            Sizning ishonchli oziq ovqat do&#39;koningiz
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Kompaniya</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/about">Biz haqimizda</Link></li>
            <li><Link href="/contact">Aloqa</Link></li>
            <li><Link href="/privacy">Maxfiylik</Link></li>
            <li><Link href="/terms">Foydalanish shartlari</Link></li>
          </ul>
        </div>

</div>
        <div className="ml-auto">
          <h4 className="text-lg font-semibold mb-3">Biz bilan bog&apos;laning</h4>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-400">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#" aria-label="Telegram" className="hover:text-blue-400">
              <i className="fab fa-telegram-plane" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-400">
              <i className="fab fa-instagram" />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-red-500">
              <i className="fab fa-youtube" />
            </a>
          </div>
        </div>
      </div>

      {/* Pastki qism */}
      <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Ixlos Magnit. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}
