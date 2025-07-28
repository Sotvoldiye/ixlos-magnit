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
          kiritgan barcha ma&#39;lumotlar to&#39;g&#39;ri va yangilangan bo&#39;lishi kerak.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">3. Buyurtmalar</h2>
        <p>
          Har bir buyurtma siz tasdiqlaganingizdan so&#39;ng amalga oshiriladi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">4. To&#39;lov</h2>
        <p>
          To&#39;lovlar naqd pulda y. To&#39;lov mahsulot yetkazib berilgandan keyin olinadi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">5. Yetkazib berish</h2>
        <p>
          Yetkazib berish xizmatlari bizning siyosatimiz asosida amalga
          oshiriladi. Yetkazib berish muddati va narxi sizning hududingizga
          bog&#39;liq.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">6. Maxfiylik</h2>
        <p>
          Foydalanuvchilarning shaxsiy ma&#39;lumotlari maxfiy saqlanadi va
          uchinchi tomonlarga berilmaydi. Batafsil ma&#39;lumot uchun{" "}
          <a href="/privacy" className="text-blue-600 underline">
            Maxfiylik siyosati
          </a>{" "}
          sahifasiga qarang.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">7. O&#39;zgarishlar</h2>
        <p>
          Biz istalgan vaqtda ushbu shartlarni o&#39;zgartirish huquqiga egamiz.
          Yangilanishlar ushbu sahifada e&#39;lon qilinadi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">8. Bog&#39;lanish</h2>
        <p>
          Agar sizda savollar bo&#39;lsa, biz bilan bog&#39;laning:{" "}
          <a href="/contact" className="text-blue-600 underline">
            Bog&#39;lanish sahifasi
          </a>
          .
        </p>
      </section>
    </div>
  );
}
