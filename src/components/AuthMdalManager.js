"use client";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function AuthModalManager() {
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openRegister = () => {
    setIsLoginOpen(false); // login modal yopiladi
    setIsRegisterOpen(true); // register ochiladi
  };

  const openLogin = () => {
    setIsRegisterOpen(false); // register yopiladi
    setIsLoginOpen(true); // login ochiladi
  };

  return (
    <>
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} onOpenRegister={openRegister} />}
      {isRegisterOpen && <Register onClose={() => setIsRegisterOpen(false)} onOpenLogin={openLogin} />}
    </>
  );
}
