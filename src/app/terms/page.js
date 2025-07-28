"use client";
import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Foydalanish shartlari</h1>

      <p className="mb-4 text-sm text-gray-600">
        Oxirgi yangilanish: 8-iyul, 2025-yil
      </p>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">1. Umumiy qoidalar</h2>
        <p>
          Ushbu veb-saytdan foydalanish orqali siz quyidagi shartlarga rozilik
          bildirasiz.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">2. Hisob yaratish</h2>
        <p>
          Saytdan xarid qilish uchun foydalanuvchi hisobini yaratishingiz mumkin. Siz
          kiritgan barcha ma'lumotlar to‘g‘ri va yangilangan bo‘lishi kerak.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">3. Buyurtmalar</h2>
        <p>
          Har bir buyurtma siz tasdiqlaganingizdan so‘ng amalga oshiriladi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">4. To‘lov</h2>
        <p>
          To‘lovlar naqd pulda y. To‘lov mahsulot yetkazib berilgandan keyin olinadi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">5. Yetkazib berish</h2>
        <p>
          Yetkazib berish xizmatlari bizning siyosatimiz asosida amalga
          oshiriladi. Yetkazib berish muddati va narxi sizning hududingizga
          bog‘liq.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">6. Maxfiylik</h2>
        <p>
          Foydalanuvchilarning shaxsiy ma'lumotlari maxfiy saqlanadi va
          uchinchi tomonlarga berilmaydi. Batafsil ma’lumot uchun{" "}
          <a href="/privacy" className="text-blue-600 underline">
            Maxfiylik siyosati
          </a>{" "}
          sahifasiga qarang.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">7. O‘zgarishlar</h2>
        <p>
          Biz istalgan vaqtda ushbu shartlarni o‘zgartirish huquqiga egamiz.
          Yangilanishlar ushbu sahifada e’lon qilinadi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">8. Bog‘lanish</h2>
        <p>
          Agar sizda savollar bo‘lsa, biz bilan bog‘laning:{" "}
          <a href="/contact" className="text-blue-600 underline">
            Bog‘lanish sahifasi
          </a>
          .
        </p>
      </section>
    </div>
  );
}
