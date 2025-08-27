"use client";
import Login from "@/components/Login";
import Register from "@/components/Register";
import { useState } from "react";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="flex items-center justify-center bg-gray-50 p-6">
      <div className="flex gap-12 bg-white shadow-lg rounded-xl p-10">
        <div className="w-[300px]">
          {showLogin && (
            <Login
              onClose={() => setShowLogin(false)}
              onOpenRegister={() => setShowLogin(false)} // yoki register modal ochish
            />
          )}
        </div>

        <div className="w-[300px] border-l border-gray-200 pl-8">
          <Register />
        </div>
      </div>
    </div>
  );
}
