"use client";

import Login from "@/components/Login";
import Register from "@/components/Register";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Agar callbackUrl bo'lsa, login/register tugagandan keyin o'sha sahifaga qaytamiz
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSuccess = () => {
    router.push(callbackUrl);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 min-h-screen p-4">
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-xl p-6 md:p-10 w-full max-w-4xl">
        
        {/* Login */}
        <div className="flex-1">
         
            <Login
           
              onSuccess={handleSuccess} // muvaffaqiyatli login
            />
      
        </div>

        {/* Divider (faqat md dan yuqori ekranlarda) */}
        <div className="hidden md:block w-px bg-gray-200" />

        {/* Register */}
        <div className="flex-1">
          <Register onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
}
