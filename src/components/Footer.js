// components/Footer.jsx
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brend va Tavsif */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Ixlos Magnit</h4>
          <p className="text-sm text-gray-400">
            Sizning ishonchli oziq-ovqat do&#39;koningiz
          </p>
        </div>

        {/* Sahifalar */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Kompaniya</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Biz bilan bog&#39;lanish
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition">
                Maxfiylik siyosati
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition">
                Foydalanish shartlari
              </Link>
            </li>
          </ul>
        </div>

        {/* Ijtimoiy tarmoqlar */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Ijtimoiy tarmoqlarda</h4>
          <a
            href="https://t.me/IxlosMagnit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
          >
            <i
              className="fa-brands fa-telegram fa-lg"
              style={{ color: "#74C0FC" }}
            ></i>
            Telegram kanalimiz
          </a>
        </div>
      </div>

      {/* Pastki qism */}
      <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Ixlos Magnit. Barcha huquqlar
        himoyalangan.
      </div>
    </footer>
  );
}
