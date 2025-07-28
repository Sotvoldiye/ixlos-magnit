"use client";
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Maxfiylik siyosati</h1>
      <p className="text-sm text-gray-600 mb-8">Oxirgi yangilanish: 8-iyul, 2025-yil</p>

      <p className="mb-4">
        Biz — <strong>Ixlos-Magnit</strong> onlayn do&#39;koni — sizning shaxsiy ma&#39;lumotlaringizni
        himoya qilishga qat&#39;iy rioya qilamiz. Ushbu maxfiylik siyosati orqali biz sizdan qanday
        ma&#39;lumotlarni to&#39;plashimiz, qanday ishlatishimiz va qanday himoya qilishimiz haqida
        sizni xabardor qilamiz.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Qanday ma&#39;lumotlarni to&#39;playmiz?</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Ism va familiya</li>
        <li>Elektron pochta manzili</li>
        <li>Telefon raqami</li>
        <li>Yetkazib berish manzili</li>
        <li>Buyurtmalar tarixi</li>
        <li>Saytdan foydalanish statistikasi (cookies orqali)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Ushbu ma&#39;lumotlar qanday ishlatiladi?</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Buyurtmalarni bajarish va yetkazib berish</li>
        <li>Mijozlarga xizmat ko&#39;rsatish</li>
        <li>Yangiliklar va aksiyalar haqida xabar berish (agar rozilik bergan bo&#39;lsangiz)</li>
        <li>Sayt funksiyalarini yaxshilash</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        3. Ma&#39;lumotlaringizni boshqalar bilan ulashamizmi?
      </h2>
      <p className="mb-2">
        Yo&#39;q. Sizning ma&#39;lumotlaringiz uchinchi tomonlarga sotilmaydi va ijaraga berilmaydi. Ba&#39;zi holatlarda faqat:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Qonuniy talab bo&#39;lsa</li>
        <li>Yetkazib berish xizmatlari bilan ishlashda (masalan, kuryer)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Cookie fayllar</h2>
      <p className="mb-4">
        Biz saytda trafikni tahlil qilish va foydalanuvchi tajribasini yaxshilash uchun cookie
        fayllardan foydalanamiz. Istasangiz, brauzer sozlamalari orqali cookie-larni
        o&#39;chirishingiz mumkin.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Ma&#39;lumotlaringiz xavfsizligi</h2>
      <p className="mb-4">
        Ma&#39;lumotlaringizni xavfsiz serverlar orqali saqlaymiz. Uchinchi shaxslar ruxsatsiz kira olmaydi.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Sizning huquqlaringiz</h2>
      <p className="mb-2">Siz o&#39;zingiz haqingizdagi ma&#39;lumotlarni:</p>
      <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>Ko&#39;rish</li>
        <li>Tahrirlash</li>
        <li>O&#39;chirish</li>
      </ul>
      <p className="mb-4">huquqiga egasiz. Buning uchun biz bilan bog&#39;lanishingiz kifoya.</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Biz bilan bog&#39;lanish</h2>
      <p className="mb-2">Agar sizda ushbu siyosat bo&#39;yicha savollar bo&#39;lsa, quyidagi manzil orqali murojaat qilishingiz mumkin:</p>
      <ul className="pl-5 space-y-1">
        <li><i className="fa-solid fa-envelope"></i> Email: <a href="mailto:sotvoldiyev209@gmail.com" className="text-blue-600 underline">sotvoldiyev209@gmail.com</a></li>
        <li><i className="fa-solid fa-phone"></i> Telefon: +998 305 77 83</li>
        <li><i className="fa-solid fa-location-dot"></i> Manzil: Farg&#39;ona viloyati, Mindonobod</li>
      </ul>
    </div>
  );
}
